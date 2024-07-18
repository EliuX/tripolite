"use client";

import { useEffect } from "react";
import {useRouter} from "next/navigation";
import {Link} from "@nextui-org/link";
import {Divider} from "@nextui-org/divider";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
   const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
       <p>Our team is working on it!</p>
      <Divider />
      <section className={"flex-col flex-row gap-4"}>
          <Link
              onPress={
                  () => reset()
              }
          >
              Try again
          </Link>
          <Link
              onPress={router.back}
          >
              Go back
          </Link>
      </section>
    </div>
  );
}
