import React from "react";
import { Header } from "@/components/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="py-8 px-6">{children}</div>
        </>
    );
}
