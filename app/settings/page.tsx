import Sidebar from "@/components/Sidebar";
import "../globals.css"
import SignOutButton from "../dashboard/sign-out-button";
import { AccountView } from "@neondatabase/auth/react";

export default async function page() {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <aside>
                <Sidebar currentPath="/settings" />
            </aside>

            <main className="flex-1 overflow-y-auto">
                <header>
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                                <p className="text-sm text-gray-500">Manage Account Settings</p>
                            </div>
                            <SignOutButton />
                        </div>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto account-container">
                    <AccountView path="settings"/>
                </div>
            </main>
        </div>
    );
}
