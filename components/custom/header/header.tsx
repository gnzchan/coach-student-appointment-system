import { Navbar } from "@/components/custom/header/navbar";
import { MobileNavbar } from "@/components/custom/header/mobile-navbar";

const Header = () => {
  return (
    <header>
      <div className="w-full h-20 flex items-center">
        <div className="hidden lg:flex w-full items-center justify-center">
          <Navbar />
        </div>
        <div className="lg:hidden flex items-center ml-10">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};

export { Header };
