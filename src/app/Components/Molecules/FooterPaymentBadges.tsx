import React from "react";
import PaymentCard from "../atoms/FooterPaymentBadge";
import {
  AmericanIcon,
  AppleIcon,
  DiscoverIcon,
  GoogleIcon,
  MastercardIcon,
  PaypalIcon,
  ShopIcon,
  VisaIcon,
} from "../../../../public/Icons";

const payments = [
  { Icon: AppleIcon, alt: "Apple Pay" },
  { Icon: MastercardIcon, alt: "Mastercard" },
  { Icon: AmericanIcon, alt: "Amex" },
  { Icon: ShopIcon, alt: "OPay" },
  { Icon: PaypalIcon, alt: "PayPal" },
  { Icon: VisaIcon, alt: "Visa" },
  { Icon: GoogleIcon, alt: "Google Pay" },
  { Icon: DiscoverIcon, alt: "Discover" },
];

export default function FooterPayments() {
  return (
    <div className="flex items-center gap-4">
      {payments.map((card) => (
        <PaymentCard key={card.alt} Icon={card.Icon} alt={card.alt} />
      ))}
    </div>
  );
}
