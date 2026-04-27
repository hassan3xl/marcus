"use client";
import React, { useEffect, useRef } from "react";
import {
  Home,
  Package,
  ShoppingBag,
  TrendingUp,
  Settings,
  HelpCircle,
  X,
  Tag,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { useGetInventoryStats } from "@/lib/hooks/product.hook";
import { formatNaira } from "@/lib/utils";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);
  const { data: stats } = useGetInventoryStats();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeSidebar();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeSidebar]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed lg:sticky top-0 lg:top-16 left-0 
          h-screen lg:h-[calc(100vh-4rem)]
          bg-card/80 border-r border-border/50 shadow-lg lg:shadow-none
          transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-64 flex flex-col
        `}
      >
        <div className="flex-1 overflow-y-auto pt-8 px-4 space-y-8 scrollbar-hide">
          {/* Control Center */}
          <div>
            <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">
              Control Center
            </p>
            <div className="space-y-1">
              <Link
                href="/"
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                  isActive("/")
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "hover:bg-accent/50 text-foreground"
                }`}
              >
                <Home size={18} />
                <span className="font-bold text-sm tracking-tight">
                  Dashboard
                </span>
              </Link>

              <Link
                href="/products"
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                  isActive("/products")
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "hover:bg-accent/50 text-foreground"
                }`}
              >
                <Package size={18} />
                <span className="font-bold text-sm tracking-tight">
                  Products
                </span>
                <span
                  className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isActive("/products")
                      ? "bg-white/20"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {stats?.product_count || 0}
                </span>
              </Link>

              <Link
                href="/categories"
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                  isActive("/categories")
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "hover:bg-accent/50 text-foreground"
                }`}
              >
                <TrendingUp size={18} />
                <span className="font-bold text-sm tracking-tight">
                  Categories
                </span>
              </Link>
            </div>
          </div>

          {/* Stock Operations */}
          <div>
            <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">
              Stock Operations
            </p>
            <div className="space-y-1">
              <Link
                href="/products?filter=low-stock"
                onClick={closeSidebar}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-amber-500/10 text-foreground transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Tag size={14} />
                </div>
                <span className="font-bold text-sm tracking-tight">
                  Critical Stock
                </span>
              </Link>

              <Link
                href="/products?filter=expiring"
                onClick={closeSidebar}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500/10 text-foreground transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                  <Star size={14} />
                </div>
                <span className="font-bold text-sm tracking-tight">
                  Expiring Lots
                </span>
              </Link>
            </div>
          </div>

          {/* System Navigation */}
          <div className="pt-4 border-t border-border/50">
            <div className="space-y-1">
              <Link
                href="/inventory/account/store"
                onClick={closeSidebar}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-accent/50 text-muted-foreground transition-all duration-300"
              >
                <Settings size={18} />
                <span className="font-bold text-sm tracking-tight">
                  System Settings
                </span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
