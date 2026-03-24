type Props = {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

export default function AccountActionIconButton({
  children,
  onClick,
  label,
  disabled,
}: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="text-brand-primary hover:text-brand-secondary transition-all duration-300 disabled:cursor-not-allowed disabled:text-text-tertiary"
    >
      {children}
    </button>
  );
}