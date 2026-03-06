import React from "react";
import FooterLink from "../Atoms/FooterLink";

const links = [
  "Return Policy",
  "Privacy Policy",
  "Shipping Policy",
  "Terms of Services",
  "Cookie Preferences",
  "Contact Information",
];

export default function FooterLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <FooterLink key={link} label={link} />
      ))}
    </div>
  );
}