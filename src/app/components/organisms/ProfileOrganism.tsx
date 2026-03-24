import { EditIcon } from "../../../../public/Icons";
import AccountSectionTitle from "../atoms/AccountSectionTitle";
import AccountActionIconButton from "../atoms/AccountActionIconButton";
import ProfileInfoList from "../molecules/ProfileInfoList";

type Props = {
  profileName: string;
  profileEmail: string;
  onEdit: () => void;
};

export default function ProfileOrganism({
  profileName,
  profileEmail,
  onEdit,
}: Props) {
  return (
    <section className="flex flex-col gap-4">
      <AccountSectionTitle
        title="Profile"
        action={
          <AccountActionIconButton label="Edit profile" onClick={onEdit}>
            <EditIcon className="hover:cursor-pointer hover:text-brand-secondary transition-all duration-300" />
          </AccountActionIconButton>
        }
      />

      <ProfileInfoList name={profileName} email={profileEmail} />
    </section>
  );
}