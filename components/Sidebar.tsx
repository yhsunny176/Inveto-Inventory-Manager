"use client";

import { UserButton } from "@neondatabase/auth/react";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ currentPath = "/dashboard" }: { currentPath: string }) {
    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "Inventory", href: "/inventory", icon: Package },
        { name: "Add Product", href: "/add-product", icon: Plus },
        { name: "Settings", href: "/account/settings", icon: Settings },
    ];

    return (
        <div className="bg-gray-900 text-white w-64 h-screen p-6 shrink-0 flex flex-col overflow-hidden sticky top-0">
            <div className="flex-1 overflow-y-auto">
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
            <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="flex items-center justify-between">
                    <UserButton size="icon" />
                </div>
            </div>
        </div>
    );
}
