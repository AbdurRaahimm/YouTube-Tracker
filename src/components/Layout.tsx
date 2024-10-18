import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster"


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <main>{children}</main>
            <Toaster />
        </>
    )
}
