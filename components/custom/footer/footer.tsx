import { SwitchUserDropdown } from "@/components/custom/footer/switch-user-dropdown";
import { getActiveUser } from "@/lib/firebase-functions";

const Footer = async () => {
  const activeUser = await getActiveUser();
  return (
    <footer>
      <div className="h-20 w-full bg-neutral-200 flex items-center justify-center">
        <SwitchUserDropdown activeUser={activeUser} />
      </div>
    </footer>
  );
};

export { Footer };
