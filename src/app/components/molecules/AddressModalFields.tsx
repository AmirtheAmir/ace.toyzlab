"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AustraliaIcon,
  DropDownIcon,
  FinlandIcon,
} from "../../../../public/Icons";
import AccountFloatingInput from "../atoms/AccountFloatingInput";
import AccountCheckbox from "../atoms/AccountCheckbox";

type CountryValue = "Finland" | "Australia";

type AddressDraft = {
  country: CountryValue;
  first_name: string;
  last_name: string;
  address_line_1: string;
  apartment: string;
  city: string;
  province: string;
  postal_code: string;
  phone_local: string;
  is_default: boolean;
};

type Props = {
  value: AddressDraft;
  onChange: (next: AddressDraft) => void;
  getCountryPrefix: (country: CountryValue) => string;
  showDefaultToggle?: boolean;
  showPhoneCountryDropdown?: boolean;
};

function CountryFlagIcon({ country }: { country: CountryValue }) {
  const Icon = country === "Australia" ? AustraliaIcon : FinlandIcon;
  return <Icon />;
}

const COUNTRY_OPTIONS: CountryValue[] = ["Finland", "Australia"];

export default function AddressModalFields({
  value,
  onChange,
  getCountryPrefix,
  showDefaultToggle = true,
}: Props) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!countryRef.current) return;

      if (!countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelectCountry = (country: CountryValue) => {
    onChange({ ...value, country });
    setIsCountryOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div ref={countryRef} className="relative">
        <button
          type="button"
          onClick={() => setIsCountryOpen((prev) => !prev)}
          className="flex w-full items-center justify-between border border-border-primary bg-bg-surface p-3.5 text-left font-M-500 text-text-primary outline-none transition-colors duration-300 hover:bg-bg-hover"
        >
          <span>{value.country}</span>

          <DropDownIcon
            className={[
              " text-text-primary transition-transform duration-300",
              isCountryOpen ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>

        {isCountryOpen ? (
          <div className="absolute left-0 top-[calc(100%-1px)] z-50 flex w-full flex-col border border-border-primary bg-bg-scroll">
            {COUNTRY_OPTIONS.map((country) => {
              const isActive = value.country === country;

              return (
                <button
                  key={country}
                  type="button"
                  onClick={() => handleSelectCountry(country)}
                  className={[
                    "p-3.5  text-left font-M-500 transition-colors duration-300",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
                  ].join(" ")}
                >
                  {country}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <AccountFloatingInput
          label="First name"
          value={value.first_name}
          autoComplete="shipping given-name"
          onChange={(first_name) => onChange({ ...value, first_name })}
        />

        <AccountFloatingInput
          label="Last name"
          value={value.last_name}
          autoComplete="shipping family-name"
          onChange={(last_name) => onChange({ ...value, last_name })}
        />
      </div>

      <AccountFloatingInput
        label="Address"
        value={value.address_line_1}
        autoComplete="shipping address-line1"
        onChange={(address_line_1) => onChange({ ...value, address_line_1 })}
      />

      <AccountFloatingInput
        label="Apartment, Suite, etc"
        value={value.apartment}
        autoComplete="shipping address-line2"
        onChange={(apartment) => onChange({ ...value, apartment })}
      />

      <div className="grid gap-2 sm:grid-cols-3">
        <AccountFloatingInput
          label="City"
          value={value.city}
          autoComplete="shipping address-level2"
          onChange={(city) => onChange({ ...value, city })}
        />

        <AccountFloatingInput
          label="Province"
          value={value.province}
          autoComplete="shipping address-level1"
          onChange={(province) => onChange({ ...value, province })}
        />

        <AccountFloatingInput
          label="Postal Code"
          value={value.postal_code}
          autoComplete="shipping postal-code"
          onChange={(postal_code) => onChange({ ...value, postal_code })}
        />
      </div>

      <div className="flex items-center border border-border-primary bg-bg-surface px-3 transition-colors duration-300 hover:bg-bg-hover">
        <span className="pr-3 font-M-500 text-text-tertiary">
          {getCountryPrefix(value.country)}
        </span>

        <div className="min-w-0 flex-1">
          <AccountFloatingInput
            label="Phone number"
            value={value.phone_local}
            autoComplete="shipping tel"
            onChange={(phone_local) => onChange({ ...value, phone_local })}
            className="border-0 px-0 pb-2.5 pt-2 hover:bg-transparent"
          />
        </div>

        <div className="flex shrink-0 items-center text-text-primary">
          <CountryFlagIcon country={value.country} />
        </div>
      </div>

      {showDefaultToggle ? (
        <AccountCheckbox
          checked={value.is_default}
          onChange={(is_default) => onChange({ ...value, is_default })}
          label="This is my default address"
        />
      ) : null}
    </div>
  );
}
