"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

type AuthMode = "signup" | "signin";
type AuthStep = "request" | "verify";

type ProfileRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
};

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

async function ensureProfileRow(
  supabase: SupabaseClient,
  user: User,
  preferredFirstName: string,
) {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, email")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  const userEmail = user.email ?? null;
  const firstName = preferredFirstName || inferFirstName(userEmail ?? "");

  if (!profile) {
    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      first_name: firstName || null,
      last_name: null,
      email: userEmail,
    });

    if (insertError) {
      throw insertError;
    }

    return;
  }

  const updates: Partial<ProfileRow> = {};
  if (!profile.first_name && firstName) {
    updates.first_name = firstName;
  }

  if (!profile.email && userEmail) {
    updates.email = userEmail;
  }

  if (Object.keys(updates).length === 0) {
    return;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (updateError) {
    throw updateError;
  }
}

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<AuthMode>("signup");
  const [step, setStep] = useState<AuthStep>("request");
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingFirstName, setPendingFirstName] = useState("");
  const [pendingMode, setPendingMode] = useState<AuthMode>("signup");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      const supabase = getSupabase();
      if (!supabase) {
        if (!isMounted) return;

        setErrorMessage("Supabase client is not configured.");
        setIsCheckingSession(false);
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (!isMounted) return;

      if (error) {
        setErrorMessage(error.message);
        setIsCheckingSession(false);
        return;
      }

      if (data.session) {
        router.replace("/account");
        return;
      }

      setIsCheckingSession(false);
    }

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setStep("request");
    setOtpCode("");
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const onRequestCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedFirstName = firstName.trim();

    if (!normalizedEmail) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (mode === "signup" && !normalizedFirstName) {
      setErrorMessage("Please enter your name.");
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSendingCode(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        shouldCreateUser: mode === "signup",
        data:
          mode === "signup" ? { first_name: normalizedFirstName } : undefined,
      },
    });

    setIsSendingCode(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setPendingEmail(normalizedEmail);
    setPendingFirstName(normalizedFirstName);
    setPendingMode(mode);
    setOtpCode("");
    setStep("verify");
    setSuccessMessage("A 6-digit code has been sent to your email.");
  };

  const onVerifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMessage("Supabase client is not configured.");
      return;
    }

    const token = otpCode.replace(/\D/g, "");
    if (token.length !== 8) {
      setErrorMessage("Please enter the 6-digit code.");
      return;
    }

    setIsVerifyingCode(true);
    setErrorMessage(null);

    const { data, error } = await supabase.auth.verifyOtp({
      email: pendingEmail,
      token,
      type: "email",
    });

    if (error) {
      setIsVerifyingCode(false);
      setErrorMessage(error.message);
      return;
    }

    const signedInUser = data.user ?? data.session?.user ?? null;

    if (!signedInUser) {
      setIsVerifyingCode(false);
      setErrorMessage("Unable to complete sign in. Please try again.");
      return;
    }

    try {
      const metadataFirstName =
        typeof signedInUser.user_metadata?.first_name === "string"
          ? signedInUser.user_metadata.first_name
          : "";

      const firstNameToUse =
        pendingMode === "signup" ? pendingFirstName : metadataFirstName;

      await ensureProfileRow(supabase, signedInUser, firstNameToUse);
      router.replace("/account");
    } catch (profileError) {
      const message =
        profileError instanceof Error
          ? profileError.message
          : "Failed to initialize your profile.";

      setErrorMessage(message);
      setIsVerifyingCode(false);
    }
  };

  if (isCheckingSession) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <p className="font-M-500 text-text-secondary">Checking session...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center  ">
      <section className="w-full max-w-104 bg-bg-surface ring p-4 gap-6 flex flex-col ring-border-primary">
        <div className="flex justify-center text-text-primary">
          <p className="font-ace">ACE</p>
        </div>

        {step === "request" ? (
          <>
            <div className="p-1 border border-border-secondary">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className={[
                    "py-3 transition-colors duration-300",
                    mode === "signup"
                      ? "text-brand-primary font-S-600 ring ring-brand-primaryy"
                      : "text-text-secondary font-S-500 hover:text-text-primary",
                  ].join(" ")}
                >
                  Sign Up
                </button>

                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className={[
                    "py-3  transition-colors duration-300",
                    mode === "signin"
                      ? "text-brand-primary font-S-600 ring ring-brand-primary "
                      : "text-text-secondary font-S-500 hover:text-text-primary",
                  ].join(" ")}
                >
                  Sign In
                </button>
              </div>
            </div>

            <form onSubmit={onRequestCode} className="flex flex-col gap-4">
              <p className="font-S-500 text-text-primary">
                {mode === "signup"
                  ? "Create an account"
                  : "Sign in with your email"}
              </p>
              <div className="flex flex-col gap-2">
                {mode === "signup" ? (
                  <input
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="Name"
                    className="w-full p-3.5 font-M-500 text-text-primary placeholder:text-text-secondary ring ring-border-primary focus:outline-none"
                  />
                ) : null}

                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  className="w-full p-3.5 font-M-500 text-text-primary placeholder:text-text-secondary ring ring-border-primary focus:outline-none"
                />
              </div>

              {errorMessage ? (
                <p className="font-S-600 text-brand-primary">{errorMessage}</p>
              ) : null}

              {successMessage ? (
                <p className="font-S-600 text-text-secondary">
                  {successMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSendingCode}
                className="w-full bg-brand-primary p-3.5 font-M-600 text-text-primary transition-colors duration-300 hover:bg-brand-secondary disabled:cursor-not-allowed disabled:bg-brand-tertiary hover:cursor-pointer"
              >
                {isSendingCode ? "Sending..." : "Continue"}
              </button>
            </form>
          </>
        ) : (
          <form
            onSubmit={onVerifyCode}
            className="flex flex-col gap-3 px-3 pb-3 pt-2"
          >
            <h1 className="font-L-600 text-text-primary">Enter The Code</h1>
            <p className="font-M-500 text-text-secondary">
              Sent to {pendingEmail}
            </p>

            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otpCode}
              onChange={(event) => {
                const numeric = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 8);
                setOtpCode(numeric);
              }}
              placeholder="6 digit code"
              className="w-full p-3.5 font-M-500 text-text-primary placeholder:text-text-secondary ring ring-border-primary focus:outline-none"
            />

            {errorMessage ? (
              <p className="font-S-600 text-brand-primary">{errorMessage}</p>
            ) : null}

            <button
              type="submit"
              disabled={isVerifyingCode}
              className="w-full bg-brand-primary p-3.5 font-M-600 text-text-primary transition-colors duration-300 hover:bg-brand-secondary disabled:cursor-not-allowed disabled:bg-brand-tertiary hover:cursor-pointer"
            >
              {isVerifyingCode ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("request");
                setOtpCode("");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="font-M-500 text-brand-primary transition-opacity duration-300 hover:opacity-80"
            >
              Sign in with a different email
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
