"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  RightArrowIcon,
  CloseIcon,
  CheckIcon,
} from "../../../../public/Icons";

type Status = "idle" | "typing" | "duplicate" | "success";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  status?: Status;
  placeholder?: string;
  className?: string;
  message?: string;
  disabled?: boolean;
};

export default function EmailInput({
  value,
  onChange,
  onSubmit,
  status = "idle",
  placeholder = "Email",
  className = "",
  message,
  disabled = false,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const isDuplicate = status === "duplicate";
  const isSuccess = status === "success";
  const active = value.length > 0 || isFocused;

  const resetInput = useCallback(() => {
    onChange("");
    setIsFocused(false);
  }, [onChange]);

  const handleButtonClick = () => {
    if (isDuplicate) {
      resetInput();
      return;
    }

    if (!isSuccess && !disabled) {
      onSubmit();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target as Node)) {
        resetInput();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resetInput]);

  useEffect(() => {
    if (!isSuccess) return;

    const timeout = setTimeout(() => {
      resetInput();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isSuccess, resetInput]);

  return (
    <div ref={wrapperRef} className={["flex flex-col gap-1", className].join(" ")}>
      <div
        className={[
          "flex items-center justify-between w-full sm:w-104 max-w-full hover:bg-bg-surface px-3.5 py-2 border transition-colors",
          isDuplicate ? "border-brand-supplement-secondary" : "border-border-primary",
        ].join(" ")}
      >
        <div className="relative flex-1 min-h-7.5 ">
          <label
            className={[
              "absolute left-0 pointer-events-none text-text-secondary transition-all duration-300",
              active
                ? "-top-1 font-S-500"
                : "top-1/2 -translate-y-1/2 font-M-500",
            ].join(" ")}
          >
            {placeholder}
          </label>

          <input
            type="email"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isSuccess && !disabled) {
                e.preventDefault();
                onSubmit();
              }
            }}
            disabled={disabled || isSuccess}
            className="absolute inset-x-0 bottom-0.5 top-2 w-full bg-transparent outline-none font-M-500 text-text-primary caret-text-primary"
          />
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled || isSuccess}
          className={[
            "shrink-0 transition-colors",
            isDuplicate
              ? "text-brand-supplement-secondary"
              : isSuccess
              ? "text-text-primary"
              : "text-text-secondary hover:text-text-primary",
          ].join(" ")}
        >
          {isDuplicate ? (
            <CloseIcon />
          ) : isSuccess ? (
            <CheckIcon />
          ) : (
            <RightArrowIcon />
          )}
        </button>
      </div>

      {message ? (
        <p
          className={[
            "font-XS-600 select-none",
            isDuplicate
              ? "text-brand-supplement-secondary"
              : isSuccess
              ? "text-text-primary"
              : "text-brand-supplement-secondary",
          ].join(" ")}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

