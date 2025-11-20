import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const DarkMode = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative flex items-center bg-gray-200 dark:bg-zinc-800 
      w-14 h-7 rounded-full transition"
    >
      <span
        className={`absolute inset-y-1 flex items-center justify-center 
        w-5 h-5 rounded-full bg-white dark:bg-black shadow 
        transition-all ${theme === "dark" ? "translate-x-7" : "translate-x-1"}`}
      >
        {theme === "dark" ? (
          <Moon className="size-3 text-yellow-300" />
        ) : (
          <Sun className="size-3 text-orange-400" />
        )}
      </span>
    </button>
  );
};

export default DarkMode;
