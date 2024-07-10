import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import {Logo} from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Travels made&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>simple&nbsp;</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Discover seamless travel routes, tailored just for you. Explore. Connect. Travel with ease.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={"/travel-routes/search"}
        >
          Search for a flight
        </Link>
      </div>
    </section>
  );
}
