import { Menu, Sun, Moon } from "lucide-react";
import { useApp } from "../../context/AppContext";
import RoleSwitcher from "./RoleSwitcher";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { darkMode, toggleDarkMode, role } = useApp();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "☀️ Good morning";
    if (h < 17) return "🌤️ Good afternoon";
    return "🌙 Good evening";
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Menu size={22} />
        </button>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {greeting()}
          </p>
          <p className="text-base font-semibold leading-tight">
            {role === "admin" ? " Admin — full access" : "Viewer — read only"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <RoleSwitcher />
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 active:scale-95 transition-transform"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
