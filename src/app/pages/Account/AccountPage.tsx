"use client";

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

import OrdersOrganism from "@/app/components/organisms/OrdersOrganism";
import ProfileOrganism from "@/app/components/organisms/ProfileOrganism";
import AddressesOrganism from "@/app/components/organisms/AddressesOrganism";
import ProfileModalOrganism from "@/app/components/organisms/ProfileModalOrganism";
import AddressModalOrganism from "@/app/components/organisms/AddressModalOrganism";

type AccountTab = "profile" | "orders";
type CountryValue = "Finland" | "Australia";

type ProfileRow = {
  id: string;
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

type ProfileDraft = {
  first_name: string;
  last_name: string;
  email: string;
};

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

const MAX_ADDRESSES = 4;
const PROFILE_SELECT = "id, first_name, last_name, email";
const ADDRESS_SELECT =
  "id, user_id, country, first_name, last_name, address_line_1, apartment, city, province, postal_code, phone_number, is_default";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function inferFirstName(email: string) {
  const base = email.split("@")[0]?.trim();
  if (!base) return "";

  const cleaned = base.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return "";

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function normalizeCountry(value: string | null | undefined): CountryValue {
  return value === "Australia" ? "Australia" : "Finland";
}

function getCountryPrefix(country: CountryValue) {
  return country === "Australia" ? "+61" : "+358";
}

function getLocalPhone(
  country: CountryValue,
  phoneNumber: string | null | undefined,
) {
  const phone = (phoneNumber ?? "").trim();
  if (!phone) return "";

  const prefix = getCountryPrefix(country);
  if (!phone.startsWith(prefix)) return phone;

  return phone.slice(prefix.length).trimStart();
}

function buildPhoneNumber(country: CountryValue, phoneLocal: string) {
  const prefix = getCountryPrefix(country);
  const normalized = phoneLocal.trim();

  return normalized ? `${prefix} ${normalized}` : prefix;
}

function emptyAddressDraft(isDefault: boolean): AddressDraft {
  return {
    country: "Finland",
    first_name: "",
    last_name: "",
    address_line_1: "",
    apartment: "",
    city: "",
    province: "",
    postal_code: "",
    phone_local: "",
    is_default: isDefault,
  };
}

function getProfileName(profile: ProfileRow | null) {
  if (!profile) return "";
  return [profile.first_name ?? "", profile.last_name ?? ""].join(" ").trim();
}

async function ensureProfileRow(supabase: SupabaseClient, user: User) {
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profiles")
    .select(PROFILE_SELECT)
    .eq("id", user.id)
    .maybeSingle();

  if (fetchError) throw fetchError;

  const userEmail = user.email ?? null;

  if (!existingProfile) {
    const metadataFirstName =
      typeof user.user_metadata?.first_name === "string"
        ? user.user_metadata.first_name
        : "";

    const firstName = metadataFirstName || inferFirstName(userEmail ?? "");

    const { data: insertedProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        first_name: firstName || null,
        last_name: null,
        email: userEmail,
      })
      .select(PROFILE_SELECT)
      .single();

    if (insertError) throw insertError;
    return insertedProfile as ProfileRow;
  }

  const updates: Partial<ProfileRow> = {};

  if (!existingProfile.first_name) {
    const metadataFirstName =
      typeof user.user_metadata?.first_name === "string"
        ? user.user_metadata.first_name
        : "";

    const fallbackName = metadataFirstName || inferFirstName(userEmail ?? "");
    if (fallbackName) updates.first_name = fallbackName;
  }

  if (!existingProfile.email && userEmail) {
    updates.email = userEmail;
  }

  if (Object.keys(updates).length === 0) {
    return existingProfile as ProfileRow;
  }

  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select(PROFILE_SELECT)
    .single();

  if (updateError) throw updateError;

  return updatedProfile as ProfileRow;
}

async function fetchAddresses(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("addresses")
    .select(ADDRESS_SELECT)
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []) as AddressRow[];
}

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab: AccountTab =
    searchParams.get("tab") === "orders" ? "orders" : "profile";

  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [addresses, setAddresses] = useState<AddressRow[]>([]);
  const [, setErrorMessage] = useState<string | null>(null);
  const [, setSuccessMessage] = useState<string | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState<ProfileDraft>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressRow | null>(null);
  const [addressDraft, setAddressDraft] = useState<AddressDraft>(
    emptyAddressDraft(true),
  );
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(null);

  const loadAccountData = useCallback(async () => {
    const supabase = getSupabase();

    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      setIsBootstrapping(false);
      return;
    }

    setIsBootstrapping(true);
    setErrorMessage(null);

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      const session = sessionData.session;
      if (!session) {
        router.replace("/auth");
        return;
      }

      setUser(session.user);

      const ensuredProfile = await ensureProfileRow(supabase, session.user);
      const loadedAddresses = await fetchAddresses(supabase, session.user.id);

      setProfile(ensuredProfile);
      setAddresses(loadedAddresses);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load your account.";
      setErrorMessage(message);
    } finally {
      setIsBootstrapping(false);
    }
  }, [router]);

  useEffect(() => {
    void loadAccountData();
  }, [loadAccountData]);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const profileName = useMemo(() => {
    const name = getProfileName(profile);
    if (name) return name;
    return user?.email ? inferFirstName(user.email) : "";
  }, [profile, user]);

  const profileEmail = profile?.email ?? user?.email ?? "";

  const openProfileEditor = () => {
    if (!profile && !user) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    setProfileDraft({
      first_name: profile?.first_name ?? profileName,
      last_name: profile?.last_name ?? "",
      email: profileEmail,
    });

    setIsProfileModalOpen(true);
  };

  const openAddAddressModal = () => {
    if (addresses.length >= MAX_ADDRESSES) {
      setErrorMessage("You can save up to 4 addresses.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setEditingAddress(null);
    setAddressDraft(emptyAddressDraft(addresses.length === 0));
    setIsAddressModalOpen(true);
  };

  const openEditAddressModal = (address: AddressRow) => {
    const country = normalizeCountry(address.country);

    setErrorMessage(null);
    setSuccessMessage(null);
    setEditingAddress(address);

    setAddressDraft({
      country,
      first_name: address.first_name ?? "",
      last_name: address.last_name ?? "",
      address_line_1: address.address_line_1 ?? "",
      apartment: address.apartment ?? "",
      city: address.city ?? "",
      province: address.province ?? "",
      postal_code: address.postal_code ?? "",
      phone_local: getLocalPhone(country, address.phone_number),
      is_default: address.is_default,
    });

    setIsAddressModalOpen(true);
  };

  const closeProfileModal = () => setIsProfileModalOpen(false);

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  const onSaveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setErrorMessage("User session not found.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    const firstName = profileDraft.first_name.trim();
    const lastName = profileDraft.last_name.trim();
    const email = normalizeEmail(profileDraft.email);

    if (!firstName) {
      setErrorMessage("First name is required.");
      return;
    }

    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }

    setIsSavingProfile(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const currentUserEmail = normalizeEmail(user.email ?? "");
      const isEmailChanged = currentUserEmail !== email;

      if (isEmailChanged) {
        const { error: updateAuthError } = await supabase.auth.updateUser({ email });
        if (updateAuthError) throw updateAuthError;
      }

      const { data: updatedProfile, error: updateProfileError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName || null,
          email,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select(PROFILE_SELECT)
        .single();

      if (updateProfileError) throw updateProfileError;

      setProfile(updatedProfile as ProfileRow);
      setIsProfileModalOpen(false);
      setSuccessMessage(
        isEmailChanged
          ? "Profile saved. Confirm your new email if Supabase asks for confirmation."
          : "Profile saved.",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save profile.";
      setErrorMessage(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const onSaveAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setErrorMessage("User session not found.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    if (!editingAddress && addresses.length >= MAX_ADDRESSES) {
      setErrorMessage("You can save up to 4 addresses.");
      return;
    }

    const firstName = addressDraft.first_name.trim();
    const lastName = addressDraft.last_name.trim();
    const addressLine1 = addressDraft.address_line_1.trim();
    const apartment = addressDraft.apartment.trim();
    const city = addressDraft.city.trim();
    const province = addressDraft.province.trim();
    const postalCode = addressDraft.postal_code.trim();
    const phoneLocal = addressDraft.phone_local.trim();

    if (
      !firstName ||
      !lastName ||
      !addressLine1 ||
      !city ||
      !province ||
      !postalCode ||
      !phoneLocal
    ) {
      setErrorMessage("Please fill in all required address fields.");
      return;
    }

    setIsSavingAddress(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (addressDraft.is_default) {
        let resetQuery = supabase
          .from("addresses")
          .update({
            is_default: false,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id);

        if (editingAddress) {
          resetQuery = resetQuery.neq("id", editingAddress.id);
        }

        const { error: resetDefaultError } = await resetQuery;
        if (resetDefaultError) throw resetDefaultError;
      }

      const payload = {
        country: addressDraft.country,
        first_name: firstName,
        last_name: lastName,
        address_line_1: addressLine1,
        apartment: apartment || null,
        city,
        province,
        postal_code: postalCode,
        phone_number: buildPhoneNumber(addressDraft.country, phoneLocal),
        is_default: addressDraft.is_default,
      };

      if (editingAddress) {
        const { error: updateAddressError } = await supabase
          .from("addresses")
          .update({
            ...payload,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingAddress.id)
          .eq("user_id", user.id);

        if (updateAddressError) throw updateAddressError;
      } else {
        const { error: insertAddressError } = await supabase
          .from("addresses")
          .insert({
            id: crypto.randomUUID(),
            user_id: user.id,
            ...payload,
          });

        if (insertAddressError) throw insertAddressError;
      }

      const refreshedAddresses = await fetchAddresses(supabase, user.id);
      setAddresses(refreshedAddresses);
      setIsAddressModalOpen(false);
      setEditingAddress(null);
      setSuccessMessage(editingAddress ? "Address updated." : "Address added.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save address.";
      setErrorMessage(message);
    } finally {
      setIsSavingAddress(false);
    }
  };

  const onDeleteAddress = async (address: AddressRow) => {
    if (!user) {
      setErrorMessage("User session not found.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    setDeletingAddressId(address.id);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error: deleteAddressError } = await supabase
        .from("addresses")
        .delete()
        .eq("id", address.id)
        .eq("user_id", user.id);

      if (deleteAddressError) throw deleteAddressError;

      let refreshedAddresses = await fetchAddresses(supabase, user.id);

      if (
        refreshedAddresses.length > 0 &&
        !refreshedAddresses.some((item) => item.is_default)
      ) {
        const fallbackAddress = refreshedAddresses[0];

        const { error: fallbackDefaultError } = await supabase
          .from("addresses")
          .update({
            is_default: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", fallbackAddress.id)
          .eq("user_id", user.id);

        if (fallbackDefaultError) throw fallbackDefaultError;

        refreshedAddresses = await fetchAddresses(supabase, user.id);
      }

      setAddresses(refreshedAddresses);
      setSuccessMessage("Address deleted.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete address.";
      setErrorMessage(message);
    } finally {
      setDeletingAddressId(null);
    }
  };

  if (isBootstrapping) {
    return (
      <main>
        <p className="font-M-500 text-text-secondary">Loading your account...</p>
      </main>
    );
  }

  return (
    <>
      <main className="py-6 ">
        <section className="min-h-[40vh] py-4">

          {activeTab === "orders" ? (
            <OrdersOrganism />
          ) : (
            <div className="grid  w-full gap-4 lg:grid-cols-2">
              <ProfileOrganism
                profileName={profileName}
                profileEmail={profileEmail}
                onEdit={openProfileEditor}
              />

              <AddressesOrganism
                addresses={addresses}
                maxReached={addresses.length >= MAX_ADDRESSES}
                onAdd={openAddAddressModal}
                onEdit={openEditAddressModal}
              />
            </div>
          )}
        </section>
      </main>

      <ProfileModalOrganism
        open={isProfileModalOpen}
        value={profileDraft}
        onChange={setProfileDraft}
        onClose={closeProfileModal}
        onSubmit={onSaveProfile}
        isSaving={isSavingProfile}
      />

      <AddressModalOrganism
        open={isAddressModalOpen}
        editing={!!editingAddress}
        value={addressDraft}
        onChange={setAddressDraft}
        onClose={closeAddressModal}
        onSubmit={onSaveAddress}
        onDelete={
          editingAddress
            ? () => {
                void onDeleteAddress(editingAddress);
                closeAddressModal();
              }
            : undefined
        }
        isSaving={isSavingAddress}
        isDeleting={!!editingAddress && deletingAddressId === editingAddress.id}
        getCountryPrefix={getCountryPrefix}
      />
    </>
  );
}
