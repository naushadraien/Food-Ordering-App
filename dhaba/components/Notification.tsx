"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

import { Input } from "@/components/ui/input";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Notification = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { setTheme } = useTheme();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };
  return (
    <div className="h-16 bg-red-500 text-white flex justify-center items-center px-4 text-center text-sm md:text-base">
      <form onSubmit={handleSearch} className="flex items-center m-4">
        <BsSearch
          size={20}
          className=" absolute mx-1 block text-gray-500 dark:text-gray-200"
        />
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="text-gray-500 dark:text-gray-200 text-center focus-visible:ring-0 focus-visible:border-none dark:placeholder:text-gray-200"
        />
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="text-gray-500 dark:text-gray-200 focus-visible:ring-0 focus-visible:border-none"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
