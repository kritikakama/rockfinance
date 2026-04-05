import { useApp } from "../../context/AppContext";
import type { Role } from "../../types";

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
      {(["viewer", "admin"] as Role[]).map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`
            px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
            ${
              role === r
                ? "bg-white dark:bg-gray-700 text-brand-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }
          `}
        >
          {r === "admin" ? " Admin" : " Viewer"}
        </button>
      ))}
    </div>
  );
};

export default RoleSwitcher;
