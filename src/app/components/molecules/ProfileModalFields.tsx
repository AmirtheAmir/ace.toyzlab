"use client";

import AccountFloatingInput from "../atoms/AccountFloatingInput";

type ProfileDraft = {
  first_name: string;
  last_name: string;
  email: string;
};

type Props = {
  value: ProfileDraft;
  onChange: (next: ProfileDraft) => void;
};

export default function ProfileModalFields({ value, onChange }: Props) {
  return (
    <div className=" flex flex-col gap-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <AccountFloatingInput
          label="First name"
          value={value.first_name}
          autoComplete="given-name"
          onChange={(first_name) => onChange({ ...value, first_name })}
        />

        <AccountFloatingInput
          label="Last name (optional)"
          value={value.last_name}
          autoComplete="family-name"
          onChange={(last_name) => onChange({ ...value, last_name })}
        />
      </div>

      <AccountFloatingInput
        label="Email"
        type="email"
        value={value.email}
        autoComplete="email"
        onChange={(email) => onChange({ ...value, email })}
      />
    </div>
  );
}