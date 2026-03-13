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
          "flex items-center select-none justify-between w-104 hover:bg-bg-surface p-3.5 border transition-colors",
          isDuplicate ? "border-brand-supplementary" : "border-border-primary",
        ].join(" ")}
      >
        <div className="relative flex-1 h-full flex items-end">
          <label
            className={[
              "absolute left-0 pointer-events-none text-text-secondary transition-all duration-300",
              active
                ? "-top-1.5 font-S-500"
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
            className="absolute left-0 right-0 bottom-1.5 top-1.5 h-full w-full bg-transparent outline-none font-M-500 text-text-primary caret-text-primary"
          />
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled || isSuccess}
          className={[
            "shrink-0 transition-colors",
            isDuplicate
              ? "text-brand-supplementary"
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
              ? "text-brand-supplementary"
              : isSuccess
              ? "text-text-primary"
              : "text-brand-supplementary",
          ].join(" ")}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
