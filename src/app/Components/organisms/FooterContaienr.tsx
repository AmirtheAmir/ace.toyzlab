import React from "react";
import FooterLinks from "../molecules/FooterPolicyLinks";
import FooterPayments from "../molecules/FooterPaymentBadges";

export default function FooterBar() {
  return (
    <footer className="w-full border-t border-border-secondary py-6 mt-6">
      <div className="flex items-center justify-between w-full mx-auto">
        <FooterLinks />
        <FooterPayments />
      </div>
    </footer>
  );
}