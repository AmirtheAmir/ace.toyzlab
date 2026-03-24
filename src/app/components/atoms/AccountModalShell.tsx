"use client";

import React from "react";
import { CloseIcon } from "../../../../public/Icons";

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function AccountModalShell({ title, onClose, children }: Props) {
  return (
    <div className="fixed inset-0 z-70 flex items-center  justify-center bg-black/20 backdrop-blur-[2px]">
      <div className="w-full max-w-104 bg-bg-surface flex flex-col gap-4 p-4 ring ring-border-primary">
        <div className="flex items-center justify-between ">
          <h3 className="font-M-600 text-text-primary">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-text-secondary transition-colors duration-300 hover:text-text-primary"
          >
            <CloseIcon className="" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
