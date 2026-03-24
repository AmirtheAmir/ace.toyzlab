"use client";

import { RadioCheckedIcon, RadioUncheckedIcon } from "../../../../public/Icons";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export default function AccountCheckbox({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="mt-2 flex items-center hover:cursor-pointer gap-1 text-left"
    >
      <span className="shrink-0 text-text-primary">
        {checked ? (
          <RadioCheckedIcon className="" />
        ) : (
          <RadioUncheckedIcon className="" />
        )}
      </span>

      <span className="font-S-500 text-text-primary">{label}</span>
    </button>
  );
}