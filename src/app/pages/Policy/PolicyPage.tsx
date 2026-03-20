"use client";

import React, { useEffect, useState } from "react";
import {
  fetchPolicySections,
  type PolicySection,
  type PolicyType,
} from "@/lib/api/policies";

type Props = {
  pageTitle: string;
  policyType?: PolicyType;
  isComingSoon?: boolean;
};

export default function PolicyPage({
  pageTitle,
  policyType,
  isComingSoon = false,
}: Props) {
  const [sections, setSections] = useState<PolicySection[]>([]);
  const [loading, setLoading] = useState(!isComingSoon);

  useEffect(() => {
    if (!policyType || isComingSoon) return;

    const load = async () => {
      try {
        const data = await fetchPolicySections(policyType);
        setSections(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [policyType, isComingSoon]);

  return (
    <section className="w-full gap-2 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-center py-6 font-XL-600 text-text-primary">
          {pageTitle}
        </h1>
        <div className="flex flex-col gap-4">
          {isComingSoon ? (
            <p className="font-M-500 text-text-primary">Coming soon...</p>
          ) : loading ? (
            <p className="font-M-500 text-text-primary">Loading...</p>
          ) : (
            sections.map((section) => (
              <div key={section.id} className="flex flex-col">
                <h2 className="font-M-600 text-text-primary">
                  {section.title}
                </h2>
                <p className="font-M-500-body text-text-primary">
                  {section.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}