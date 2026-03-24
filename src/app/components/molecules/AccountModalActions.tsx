type Props = {
  onCancel: () => void;
  isSaving: boolean;
  isEditing?: boolean;
  onDelete?: () => void;
  isDeleting?: boolean;
};

export default function AccountModalActions({
  onCancel,
  isSaving,
  isEditing = false,
  onDelete,
  isDeleting = false,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      {isEditing && onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting || isSaving}
          className="w-full py-2.5 font-M-500 text-brand-primary hover:cursor-pointer transition-colors duration-200 hover:bg-bg-hover disabled:cursor-not-allowed disabled:text-text-tertiary"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      ) : null}

      <button
        type="button"
        onClick={onCancel}
        disabled={isSaving || isDeleting}
        className="w-full py-2.5 font-M-500 text-text-primary ring ring-border-primary transition-colors duration-300 hover:cursor-pointer disabled:cursor-not-allowed disabled:text-text-tertiary"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={isSaving || isDeleting}
        className="w-full py-2.5 font-M-600 text-text-primary ring ring-border-primary transition-colors duration-300 hover:cursor-pointer  hover:bg-brand-secondary bg-brand-primary  disabled:cursor-not-allowed disabled:text-text-tertiary"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
