import { LoaderIcon } from "lucide-react";
import React from "react";
import useThemeStore from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
      <div className="flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
        <span className="ml-2 text-lg font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default PageLoader;
