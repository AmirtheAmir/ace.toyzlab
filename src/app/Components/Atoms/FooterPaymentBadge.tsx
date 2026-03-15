import React from "react";

type Props = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  alt: string;
  className?: string;
};

export default function PaymentCard({ Icon, alt, className = "" }: Props) {
  return (
    <div className={["w-auto", className].join(" ")}>
      <Icon
        role="img"
        aria-label={alt}
        className="h-7 w-11 object-contain"
      />
    </div>
  );
}
