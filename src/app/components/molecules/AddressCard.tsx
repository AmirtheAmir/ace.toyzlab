import { EditAddressIcon, AustraliaIcon, FinlandIcon } from "../../../../public/Icons";
import AccountActionIconButton from "../atoms/AccountActionIconButton";

type CountryValue = "Finland" | "Australia";

type AddressRow = {
  id: string;
  user_id: string;
  country: string;
  first_name: string;
  last_name: string;
  address_line_1: string;
  apartment: string | null;
  city: string;
  province: string;
  postal_code: string;
  phone_number: string;
  is_default: boolean;
};

function normalizeCountry(value: string | null | undefined): CountryValue {
  return value === "Australia" ? "Australia" : "Finland";
}

function CountryIcon({ country }: { country: CountryValue }) {
  const Icon = country === "Australia" ? AustraliaIcon : FinlandIcon;

  return <Icon className="" />;
}

type Props = {
  address: AddressRow;
  onEdit: () => void;
};

export default function AddressCard({ address, onEdit }: Props) {
  const country = normalizeCountry(address.country);

  return (
    <article className="bg-bg-surface p-4 ring ring-border-primary ">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex flex-col gap-4">
          <div className="flex items-center">
            {address.is_default ? (
              <span className="font-M-500 uppercase text-text-secondary">
                Default Address
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-M-500 text-text-primary">
              {address.first_name} {address.last_name}
            </p>

            <p className="font-M-500 text-text-primary">
              {address.address_line_1}
            </p>

            {address.apartment ? (
              <p className="font-M-500 text-text-primary">{address.apartment}</p>
            ) : null}

            <div className="flex flex-row items-center gap-2">
              <CountryIcon country={country} />
              <p className="font-M-500 text-text-primary">
                {address.city}, {address.province} {address.postal_code}
              </p>
            </div>

            <p className="font-M-500 text-text-primary">{address.phone_number}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AccountActionIconButton label="Edit address" onClick={onEdit}>
            <EditAddressIcon className="" />
          </AccountActionIconButton>
        </div>
      </div>
    </article>
  );
}