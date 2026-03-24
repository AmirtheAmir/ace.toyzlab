type Props = {
  label: string;
  value: string;
};

export default function AccountInfoRow({ label, value }: Props) {
  return (
    <>
      <span className="font-M-500 text-text-secondary">{label}</span>
      <span className="font-M-500 text-text-primary">{value || "-"}</span>
    </>
  );
}