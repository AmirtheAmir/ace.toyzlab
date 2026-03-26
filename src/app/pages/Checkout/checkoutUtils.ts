export type CheckoutCountry = "Finland" | "Australia";

export type ShippingDetails = {
  country: CheckoutCountry;
  carrier: string;
  businessDays: string;
  price: number;
  currencyCode: "EUR" | "AUD";
  currencySymbol: "\u20AC" | "A$";
};

export type AddressDraft = {
  country: CheckoutCountry;
  first_name: string;
  last_name: string;
  address_line_1: string;
  apartment: string;
  city: string;
  province: string;
  postal_code: string;
  phone_local: string;
  is_default: boolean;
};

export const ESTIMATED_TAX_RATE = 0.029433;

export function normalizeCountry(value: string | null | undefined): CheckoutCountry {
  return value === "Australia" ? "Australia" : "Finland";
}

export function getCountryPrefix(country: CheckoutCountry) {
  return country === "Australia" ? "+61" : "+358";
}

export function getShippingDetails(country: CheckoutCountry): ShippingDetails {
  if (country === "Australia") {
    return {
      country,
      carrier: "FedEx Post",
      businessDays: "7 Business Days",
      price: 55.23,
      currencyCode: "AUD",
      currencySymbol: "A$",
    };
  }

  return {
    country,
    carrier: "FedEx Post",
    businessDays: "2 Business Days",
    price: 13.53,
    currencyCode: "EUR",
    currencySymbol: "\u20AC",
  };
}

export function formatMoney(value: number, fractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatMoneyAuto(value: number) {
  const isWhole = Number.isInteger(value);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: isWhole ? 0 : 2,
  }).format(value);
}

export function inferFirstName(email: string) {
  const base = email.split("@")[0]?.trim();
  if (!base) return "";

  const cleaned = base.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return "";

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export function getLocalPhone(
  country: CheckoutCountry,
  phoneNumber: string | null | undefined,
) {
  const phone = (phoneNumber ?? "").trim();
  if (!phone) return "";

  const prefix = getCountryPrefix(country);
  if (!phone.startsWith(prefix)) return phone;

  return phone.slice(prefix.length).trimStart();
}

export function buildPhoneNumber(country: CheckoutCountry, phoneLocal: string) {
  const prefix = getCountryPrefix(country);
  const normalized = phoneLocal.trim();
  return normalized ? `${prefix} ${normalized}` : prefix;
}

export function createEmptyAddressDraft(
  country: CheckoutCountry = "Finland",
): AddressDraft {
  return {
    country,
    first_name: "",
    last_name: "",
    address_line_1: "",
    apartment: "",
    city: "",
    province: "",
    postal_code: "",
    phone_local: "",
    is_default: false,
  };
}

export function isAddressDraftComplete(draft: AddressDraft) {
  return (
    !!draft.first_name.trim() &&
    !!draft.last_name.trim() &&
    !!draft.address_line_1.trim() &&
    !!draft.city.trim() &&
    !!draft.province.trim() &&
    !!draft.postal_code.trim() &&
    !!draft.phone_local.trim()
  );
}

