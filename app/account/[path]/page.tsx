import SignOutButton from "@/app/dashboard/sign-out-button";
import Sidebar from "@/components/Sidebar";
import { AccountView } from "@neondatabase/auth/react";

export const dynamicParams = false;

export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params;

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <aside>
                <Sidebar currentPath="/account/settings" />
            </aside>

            <main className="flex-1 overflow-y-auto mx-20">
                <header>
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
                                <p className="text-sm text-gray-500">Add a new product in inventory</p>
                            </div>
                            <SignOutButton />
                        </div>
                    </div>
                </header>

                <div className="account-container">
                    <AccountView path={path} />
                </div>
            </main>
        </div>
    );
}
