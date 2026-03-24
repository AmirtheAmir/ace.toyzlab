type Props = {
  title: string;
  subtitle: string;
};

export default function OrdersEmptyState({ title, subtitle }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-L-600 text-text-primary">{title}</h2>
      <p className="font-S-500 text-text-secondary">{subtitle}</p>
    </div>
  );
}