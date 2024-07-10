import {title} from "@/components/primitives";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <h1 className={title({color: "cyan"})}>Bookings</h1>
          <div className="inline-block max-w-lg text-center justify-center">
              {children}
          </div>
      </section>
  );
}
