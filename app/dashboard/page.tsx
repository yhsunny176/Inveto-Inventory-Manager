import { authServer } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import SignOutButton from "./sign-out-button";

export default async function DashboardPage() {
    const user = await authServer.getSession();
    
    if (!user) {
        redirect("/auth/sign-in");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <SignOutButton />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600">Welcome to your dashboard!</p>
                </div>
            </div>
        </div>
    );
}
