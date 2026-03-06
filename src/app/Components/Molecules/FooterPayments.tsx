import React from "react";
import PaymentCard from "../Atoms/PaymentCard";

const payments = [
  { src: "/Images/Apple.svg", alt: "Apple Pay" },
  { src: "/Images/Master.svg", alt: "Mastercard" },
  { src: "/Images/American.svg", alt: "Amex" },
  { src: "/Images/Shop.svg", alt: "OPay" },
  { src: "/Images/Paypal.svg", alt: "PayPal" },
  { src: "/Images/Paypal.svg", alt: "Visa" },
  { src: "/Images/Google.svg", alt: "Google Pay" },
  { src: "/Images/Discover.svg", alt: "Discover" },
];

export default function FooterPayments() {
  return (
    <div className="flex items-center gap-4">
      {payments.map((card) => (
        <PaymentCard key={card.alt} src={card.src} alt={card.alt} />
      ))}
    </div>
  );
}