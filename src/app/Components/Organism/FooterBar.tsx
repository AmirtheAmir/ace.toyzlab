import React from "react";
import FooterLinks from "../Molecules/FooterLinks";
import FooterPayments from "../Molecules/FooterPayments";

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