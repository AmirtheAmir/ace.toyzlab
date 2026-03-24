"use client";

import React, { FormEvent } from "react";
import AccountModalShell from "../atoms/AccountModalShell";
import ProfileModalFields from "../molecules/ProfileModalFields";
import AccountModalActions from "../molecules/AccountModalActions";

type ProfileDraft = {
  first_name: string;
  last_name: string;
  email: string;
};

type Props = {
  open: boolean;
  value: ProfileDraft;
  onChange: (next: ProfileDraft) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSaving: boolean;
};

export default function ProfileModalOrganism({
  open,
  value,
  onChange,
  onClose,
  onSubmit,
  isSaving,
}: Props) {
  if (!open) return null;

  return (
    <AccountModalShell title="Edit Your Profile" onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <ProfileModalFields value={value} onChange={onChange} />
        <AccountModalActions onCancel={onClose} isSaving={isSaving} />
      </form>
    </AccountModalShell>
  );
}