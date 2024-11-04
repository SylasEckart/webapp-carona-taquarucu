"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // const ICON_SIZE = 16;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          {theme === "light" ? (
            // <Sun
            //   key="light"
            //   size={ICON_SIZE}
            //   className={"text-muted-foreground"}
            // />
            <span>Light Icon</span>

          ) : theme === "dark" ? (
            // <Moon
            //   key="dark"
            //   size={ICON_SIZE}
            //   className={"text-muted-foreground"}
            // />
            <span>Dark Icon</span>

          ) : (
            // <Laptop
            //   key="system"
            //   size={ICON_SIZE}
            //   className={"text-muted-foreground"}
            // />
            <span>System Icon</span>

          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            {/* <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "} */}
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            {/* <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "} */}
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            {/* <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "} */}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
