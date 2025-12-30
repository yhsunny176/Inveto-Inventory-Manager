import { authServer } from "./auth/server";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
    const user = await authServer.getSession();

    if (!user) {
        redirect("/auth/sign-in");
    }

    return user
}
