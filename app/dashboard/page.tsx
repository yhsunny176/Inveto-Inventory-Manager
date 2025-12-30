import { redirect } from "next/navigation";
import SignOutButton from "./sign-out-button";
import Sidebar from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
    const session = await getCurrentUser();
    const userId = session.data?.user.id;

    if (!session) {
        redirect("/auth/sign-in");
    }

    const totalProducts = await prisma.product.count({ where: { userId } });
    console.log(totalProducts);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside>
                <Sidebar currentPath="/dashboard" />
            </aside>

            <main className="flex-1 overflow-auto">
                <header>
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                                <p className="text-sm text-gray-500">Welcome Back!</p>
                            </div>
                            <SignOutButton />
                        </div>
                    </div>
                </header>
            </main>
        </div>
    );
}
