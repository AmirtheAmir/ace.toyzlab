"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { DropDownIcon, PersonIcon } from "../../../../public/Icons";
import { getSupabase } from "@/lib/supabase";
import AccountCheckbox from "@/app/components/atoms/AccountCheckbox";
import AccountFloatingInput from "@/app/components/atoms/AccountFloatingInput";
import AddressModalFields from "@/app/components/molecules/AddressModalFields";
import {
  createEmptyAddressDraft,
  formatMoney,
  getLocalPhone,
  getShippingDetails,
  inferFirstName,
  isAddressDraftComplete,
  normalizeCountry,
  type AddressDraft,
  type CheckoutCountry,
} from "@/app/pages/Checkout/checkoutUtils";

type ProfileRow = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
};

type AddressRow = {
  id: string;
  user_id: string;
  country: string;
  first_name: string;
  last_name: string;
  address_line_1: string;
  apartment: string | null;
  city: string;
  province: string;
  postal_code: string;
  phone_number: string;
  is_default: boolean;
};

type ShippingContext = {
  country: CheckoutCountry;
  hasCompleteAddress: boolean;
};

type PaymentMethod = "card" | "paypal";

type Props = {
  onShippingContextChange: (context: ShippingContext) => void;
};

const PROFILE_SELECT = "first_name, last_name, email";
const ADDRESS_SELECT =
  "id, user_id, country, first_name, last_name, address_line_1, apartment, city, province, postal_code, phone_number, is_default";

function getPersonName(profile: ProfileRow | null, user: User | null) {
  const fullName = [profile?.first_name ?? "", profile?.last_name ?? ""]
    .join(" ")
    .trim();

  if (fullName) return fullName;
  if (profile?.first_name?.trim()) return profile.first_name.trim();
  if (user?.email) return inferFirstName(user.email);
  return "personName";
}

function formatAddress(address: AddressRow) {
  const name = [address.first_name, address.last_name].join(" ").trim();
  const cityLine = [address.city, address.province, address.postal_code]
    .filter((part) => !!part?.trim())
    .join(" ");

  return [
    name,
    address.address_line_1,
    address.apartment ?? "",
    address.country,
    cityLine,
    address.phone_number,
  ]
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(", ");
}

function mapAddressToDraft(address: AddressRow): AddressDraft {
  const country = normalizeCountry(address.country);
  return {
    country,
    first_name: address.first_name ?? "",
    last_name: address.last_name ?? "",
    address_line_1: address.address_line_1 ?? "",
    apartment: address.apartment ?? "",
    city: address.city ?? "",
    province: address.province ?? "",
    postal_code: address.postal_code ?? "",
    phone_local: getLocalPhone(country, address.phone_number),
    is_default: false,
  };
}

function normalizeExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutInfoDetail({ onShippingContextChange }: Props) {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [personName, setPersonName] = useState("Person Name");
  const [savedAddresses, setSavedAddresses] = useState<AddressRow[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const addressDropdownRef = useRef<HTMLDivElement | null>(null);

  const [shippingDraft, setShippingDraft] = useState<AddressDraft>(
    createEmptyAddressDraft(),
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
  const [billingDraft, setBillingDraft] = useState<AddressDraft>(
    createEmptyAddressDraft(),
  );

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      const supabase = getSupabase();
      if (!supabase) {
        if (!isMounted) return;
        setIsBootstrapping(false);
        return;
      }

      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const session = sessionData.session;
        if (!session) {
          if (!isMounted) return;
          setIsLoggedIn(false);
          setPersonName("Person Name");
          return;
        }

        const [profileResult, addressesResult] = await Promise.all([
          supabase
            .from("profiles")
            .select(PROFILE_SELECT)
            .eq("id", session.user.id)
            .maybeSingle(),
          supabase
            .from("addresses")
            .select(ADDRESS_SELECT)
            .eq("user_id", session.user.id)
            .order("is_default", { ascending: false })
            .order("created_at", { ascending: true }),
        ]);

        if (!isMounted) return;

        setIsLoggedIn(true);

        const profile = (profileResult.data ?? null) as ProfileRow | null;
        setPersonName(getPersonName(profile, session.user));

        const addresses = (addressesResult.data ?? []) as AddressRow[];
        setSavedAddresses(addresses);

        if (addresses.length > 0) {
          const defaultAddress =
            addresses.find((address) => address.is_default) ?? addresses[0];
          setSelectedAddressId(defaultAddress.id);
          setShippingDraft(mapAddressToDraft(defaultAddress));
        }
      } catch {
        if (!isMounted) return;
        setIsLoggedIn(false);
        setPersonName("Person Name");
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function onOutsideClick(event: MouseEvent) {
      if (!addressDropdownRef.current) return;
      if (!addressDropdownRef.current.contains(event.target as Node)) {
        setIsAddressDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", onOutsideClick);

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, []);

  const selectedAddress = useMemo(() => {
    if (savedAddresses.length === 0) return null;

    return (
      savedAddresses.find((address) => address.id === selectedAddressId) ??
      savedAddresses[0]
    );
  }, [savedAddresses, selectedAddressId]);

  const hasSavedAddresses = savedAddresses.length > 0;
  const shippingCountry = selectedAddress
    ? normalizeCountry(selectedAddress.country)
    : shippingDraft.country;
  const hasCompleteShippingAddress = selectedAddress
    ? true
    : isAddressDraftComplete(shippingDraft);
  const shippingDetails = getShippingDetails(shippingCountry);

  useEffect(() => {
    onShippingContextChange({
      country: shippingCountry,
      hasCompleteAddress: hasCompleteShippingAddress,
    });
  }, [hasCompleteShippingAddress, onShippingContextChange, shippingCountry]);

  return (
    <section className="flex w-full flex-col gap-4">
      <article className="flex flex-col gap-6 ring ring-border-primary bg-bg-surface p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between ">
            <p className="font-M-600 text-text-primary">
              {isBootstrapping ? "Loading..." : personName}
            </p>
            <Link href="/account" aria-label="Go to account page">
              <PersonIcon className="text-brand-primary transition-opacity duration-300 hover:opacity-80" />
            </Link>
          </div>

          {!hasSavedAddresses ? (
            <p className="font-S-500 text-text-primary">
              {isLoggedIn
                ? "You can add your address in your personal profile by clicking on the right upper side icon or Enter it below"
                : "Enter your shipping details below"}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-M-600 text-text-primary">Delivery To</h2>

          {hasSavedAddresses && selectedAddress ? (
            <div ref={addressDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  if (savedAddresses.length > 1) {
                    setIsAddressDropdownOpen((prev) => !prev);
                  }
                }}
                className="flex w-full items-start justify-between gap-3 ring ring-border-primary bg-bg-surface p-3 text-left"
              >
                <div className="min-w-0">
                  <p className="font-S-500 text-text-secondary">Ship to</p>
                  <p className="font-M-500 text-text-primary">
                    {formatAddress(selectedAddress)}
                  </p>
                </div>

                {savedAddresses.length > 1 ? (
                  <DropDownIcon
                    className={[
                      "mt-1 shrink-0 text-brand-primary transition-transform duration-300",
                      isAddressDropdownOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                ) : null}
              </button>

              {isAddressDropdownOpen && savedAddresses.length > 1 ? (
                <div className="absolute left-0 top-[calc(100%-1px)] z-30 flex w-full flex-col ring ring-border-primary bg-bg-surface">
                  {savedAddresses.map((address) => {
                    const isActive = selectedAddress.id === address.id;

                    return (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => {
                          setSelectedAddressId(address.id);
                          setIsAddressDropdownOpen(false);
                        }}
                        className={[
                          "p-3 text-left transition-colors duration-300",
                          isActive
                            ? "bg-bg-hover font-S-600 text-text-primary"
                            : "font-S-500 text-text-secondary hover:bg-bg-hover hover:text-text-primary",
                        ].join(" ")}
                      >
                        {formatAddress(address)}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : (
            <AddressModalFields
              value={shippingDraft}
              onChange={setShippingDraft}
              getCountryPrefix={(country) =>
                country === "Australia" ? "+61" : "+358"
              }
              showDefaultToggle={false}
              showPhoneCountryDropdown
            />
          )}
        </div>

        <div className="ring ring-border-primary bg-bg-surface flex flex-col gap-2 p-3.5">
          <p className="font-S-500 text-text-secondary">Shipping Method</p>

          {hasCompleteShippingAddress ? (
            <div className=" flex flex-col gap-4">
              <p className="font-M-500 text-text-primary">
                {shippingDetails.country} {shippingDetails.carrier}
              </p>

              <div className="flex items-center justify-between gap-2">
                <p className="font-M-500 text-text-secondary">
                  {shippingDetails.businessDays}
                </p>

                <p className="font-M-600 text-text-primary">
                  {shippingDetails.currencySymbol}
                  {formatMoney(shippingDetails.price)}
                </p>
              </div>
            </div>
          ) : (
            <p className="font-M-500 text-text-secondary">-</p>
          )}
        </div>
      </article>

      <article className="flex flex-col gap-6 ring ring-border-primary bg-bg-surface p-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-M-600 text-text-primary">Payment Method</h2>

          <div className="grid grid-cols-2 border border-border-secondary p-1">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={[
                "py-3  transition-colors duration-300 hover:cursor-pointer",
                paymentMethod === "card"
                  ? "text-brand-primary font-S-600 ring ring-brand-primary"
                  : "text-text-secondary font-S-500 hover:text-text-primary",
              ].join(" ")}
            >
              Credit Card
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={[
                "py-3  transition-colors duration-300 hover:cursor-pointer",
                paymentMethod === "paypal"
                  ? "text-brand-primary font-S-600 ring ring-brand-primary"
                  : "text-text-secondary font-S-500 hover:text-text-primary",
              ].join(" ")}
            >
              Paypal
            </button>
          </div>
        </div>

        {paymentMethod === "card" ? (
          <div className="flex flex-col gap-2">
            <AccountFloatingInput
              label="Card Number"
              value={cardNumber}
              autoComplete="cc-number"
              onChange={(next) =>
                setCardNumber(next.replace(/\D/g, "").slice(0, 19))
              }
            />

            <div className="grid grid-cols-2 gap-2">
              <AccountFloatingInput
                label="Expiration (MM/YY)"
                value={expirationDate}
                autoComplete="cc-exp"
                onChange={(next) => setExpirationDate(normalizeExpiry(next))}
              />

              <AccountFloatingInput
                label="Security Code"
                value={securityCode}
                autoComplete="cc-csc"
                onChange={(next) =>
                  setSecurityCode(next.replace(/\D/g, "").slice(0, 4))
                }
              />
            </div>

            <AccountFloatingInput
              label="Name on The Card"
              value={nameOnCard}
              autoComplete="cc-name"
              onChange={setNameOnCard}
            />
          </div>
        ) : (
          <p className="px-2 text-center font-L-500 text-text-primary">
            You will be redirected to <span className="font-L-600">PayPal</span>{" "}
            to complete your purchase afterwards.
          </p>
        )}

        <AccountCheckbox
          checked={useShippingAsBilling}
          onChange={setUseShippingAsBilling}
          label="Use shipping address as billing address"
        />

        {!useShippingAsBilling ? (
          <div className="flex flex-col gap-2">
            <h3 className="font-M-600 text-text-primary">Billing Address</h3>

            <AddressModalFields
              value={billingDraft}
              onChange={setBillingDraft}
              getCountryPrefix={(country) =>
                country === "Australia" ? "+61" : "+358"
              }
              showDefaultToggle={false}
              showPhoneCountryDropdown
            />
          </div>
        ) : null}
      </article>

      <button
        type="button"
        className="w-full bg-brand-primary py-3.5 font-M-600 text-text-primary transition-colors duration-300 hover:bg-brand-secondary hover:cursor-pointer"
      >
        Pay Now
      </button>
    </section>
  );
}
