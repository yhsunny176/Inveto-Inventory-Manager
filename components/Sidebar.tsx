"use client";
import { authClient } from "@/lib/auth/client";
import { NeonAuthUIProvider, UserButton } from "@neondatabase/auth/react";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ currentPath = "/dashboard" }: { currentPath: string }) {
    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "Inventory", href: "/inventory", icon: Package },
        { name: "Add Product", href: "/add-product", icon: Plus },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="bg-gray-900 text-white w-64 min-h-screen p-6 shrink-0 relative">
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-12">
                    <div>
                        <p className="font-bold text-2xl">Inveto</p>
                    </div>
                </div>
                {/* Navbar */}
                <nav className="space-y-1">
                    <div className="text-xs font-semibold text-gray-400 mb-2">Inventory</div>
                    {navigation.map((item, key) => {
                        const IconComponent = item.icon;
                        const isActive = currentPath === item.href;
                        return (
                            <Link
                                href={item.href}
                                key={key}
                                className={`flex items-center space-x-3 px-2 py-2 rounded-lg ${isActive ? "bg-purple-100 text-gray-800" : "text-gray-300 hover:bg-gray-800"}`}>
                                <IconComponent className="w-5 h-5" />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                    <NeonAuthUIProvider authClient={authClient}>
                        <UserButton size="icon" />
                    </NeonAuthUIProvider>
                </div>
            </div>
        </div>
    );
}
