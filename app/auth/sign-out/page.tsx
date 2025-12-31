"use client";

import { useEffect } from "react";
import { signOut } from "./action";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
    const router = useRouter();

    useEffect(() => {
        const handleSignOut = async () => {
            await signOut();
        };

        handleSignOut();
    }, [router]);

    return (
        <div className="flex flex-col gap-5 min-h-screen items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <h1 className="text-2xl font-bold text-white">Signing out...</h1>
                <p className="text-gray-400">Please wait while we sign you out</p>
            </div>
        </div>
    );
}
