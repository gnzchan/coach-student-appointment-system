import { SwitchUserDropdown } from "@/components/custom/footer/switch-user-dropdown";
import { getActiveUser, getUsers } from "@/lib/firebase-functions";

const Footer = async () => {
  const activeUser = await getActiveUser();
  const allUsers = await getUsers();

  return (
    <footer>
      <div className="h-20 w-full bg-neutral-200 flex items-center justify-center">
        <SwitchUserDropdown activeUser={activeUser} allUsers={allUsers} />
      </div>
    </footer>
  );
};

export { Footer };
