import {title} from "@/components/primitives";
import React, {Suspense} from "react";
import {Spinner} from "@nextui-org/spinner";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <h1 className={title({color: "cyan"})}>Search for Travels</h1>
              {children}
      </section>
  );
}
