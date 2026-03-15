import NavButton from "../atoms/NavigationLink";

type Props = {
  onSignOut?: () => void;
  onBackToDefault?: () => void;
};

export default function AccountNavLeft({
  onSignOut,
  onBackToDefault,
}: Props) {
  return (
    <div className="flex ring ring-border-primary">
      <NavButton label="Orders" onClick={onBackToDefault} />
      <NavButton label="Profile" onClick={onBackToDefault} />
      <NavButton label="Sign Out" onClick={onSignOut} />
    </div>
  );
}