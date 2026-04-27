"use client";
import { Button } from "../ui/button";
import { Menu, Search, Package, X } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { AccountDropdown } from "./AccountDropdown";
import Link from "next/link";
import NotificationButton from "./NotificationButton";

export function Navbar() {
  const { toggleSidebar, closeSidebar, isOpen } = useSidebar();

  return (
    <nav className="bg-muted border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
          {/* LEFT - Logo & Menu */}
          <div className="flex items-center gap-4">
            {isOpen && (
              <Button
                onClick={closeSidebar}
                size="icon"
                className="lg:hidden"
                aria-label="Toggle sidebar"
              >
                <X size={24} />
              </Button>
            )}
            {!isOpen && (
              <Button
                onClick={toggleSidebar}
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu size={24} />
              </Button>
            )}

            <Link href="/" className="flex items-center gap-2">
              <Package className="text-primary h-7 w-7" />
              <h1 className="text-xl font-black text-foreground hidden sm:block tracking-tighter">
                INVENTORY <span className="text-primary">MASTER</span>
              </h1>
            </Link>
          </div>

          {/* CENTER - Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                placeholder="Lookup SKU, Serial, or Part Name..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
            </div>
          </div>

          {/* RIGHT - Account & System */}
          <div className="flex items-center gap-3">
            <NotificationButton />
            <div className="h-6 w-px bg-border mx-1" />
            <AccountDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
