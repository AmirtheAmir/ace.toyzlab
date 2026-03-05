

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Overlay({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <button
      type="button"
      aria-label="Close overlay"
      onClick={onClose}
      className="fixed inset-0 z-40 cursor-default"
    />
  );
}