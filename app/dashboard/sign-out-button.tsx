"use client";

import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        
        const { error } = await authClient.signOut();

        if (error) {
            console.error("Sign out error:", error.message);
            setIsLoading(false);
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Signing out..." : "Sign Out"}
        </button>
    );
}
