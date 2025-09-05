import Header from "@/components/Header";
import UserContextProvider from "@/contexts/UserContextProvider";
import getUserFromCookies from "@/lib/utils/dal"
import { redirect } from "next/navigation";

export default async function AuthGroupLayout({ children }: { children: React.ReactNode }) {
    const user = await getUserFromCookies();
    if(!user){
        redirect("/login")
    }

    return (
        <UserContextProvider user={user}>
            <Header/>
            {children}
        </UserContextProvider>
    )
}