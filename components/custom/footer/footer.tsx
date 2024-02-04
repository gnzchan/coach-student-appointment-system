import { SwitchUserDropdown } from "@/components/custom/footer/switch-user-dropdown";

const Footer = () => {
  return (
    <footer>
      <div className="h-20 w-full bg-neutral-200 flex items-center justify-center">
        <SwitchUserDropdown />
      </div>
    </footer>
  );
};

export { Footer };
