"use client";

import React, { useCallback, useState } from "react";
import EmailInput from "../atoms/EmailInput";
import SocialIconButton from "../atoms/SocialIconButton";

type SubmitStatus = "idle" | "typing" | "duplicate" | "success";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    const cleaned = email.trim();

    if (!cleaned) {
      setStatus("idle");
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleaned }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatus("success");
        setMessage(data.message);
        return;
      }

      if (data.status === "duplicate") {
        setStatus("duplicate");
        setMessage(data.message);
        return;
      }

      setStatus("idle");
      setMessage(data.message || "Something went wrong.");
    } catch {
      setStatus("idle");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email]);

  const handleChange = useCallback((value: string) => {
    setEmail(value);

    if (!value.trim()) {
      setStatus("idle");
      setMessage("");
      return;
    }

    setStatus((prev) => (prev === "success" ? prev : "typing"));
    setMessage("");
  }, []);

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="mx-auto flex items-start flex-col gap-4">
        <div className="flex flex-col">
          <h3 className="font-L-500 text-text-primary">
            Subscribe to our Newsletter
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-between w-full">
          <EmailInput
            value={email}
            onChange={handleChange}
            onSubmit={handleSubmit}
            status={status}
            message={message}
            disabled={loading}
          />

          <SocialIconButton className="self-start" />
        </div>
      </div>
    </section>
  );
}

