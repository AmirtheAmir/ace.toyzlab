"use client";

import React, { FormEvent } from "react";
import AccountModalShell from "../atoms/AccountModalShell";
import AddressModalFields from "../molecules/AddressModalFields";
import AccountModalActions from "../molecules/AccountModalActions";

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
  open: boolean;
  editing: boolean;
  value: AddressDraft;
  onChange: (next: AddressDraft) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  isSaving: boolean;
  isDeleting?: boolean;
  getCountryPrefix: (country: CountryValue) => string;
};

export default function AddressModalOrganism({
  open,
  editing,
  value,
  onChange,
  onClose,
  onSubmit,
  onDelete,
  isSaving,
  isDeleting = false,
  getCountryPrefix,
}: Props) {
  if (!open) return null;

  return (
    <AccountModalShell
      title={editing ? "Edit Your Address" : "Add Your Address"}
      onClose={onClose}
    >
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <AddressModalFields
          value={value}
          onChange={onChange}
          getCountryPrefix={getCountryPrefix}
        />

        <AccountModalActions
          onCancel={onClose}
          isSaving={isSaving}
          isEditing={editing}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      </form>
    </AccountModalShell>
  );
}