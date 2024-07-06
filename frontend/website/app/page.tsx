import Image from "next/image";
import styles from "./page.module.css";
import TravelRoute from "@tripolite/common/model/travel-route";

export default function Home() {
  const example = {
    originCity: "New York",
    destinationCity: "Los Angeles",
    transportation: "American Airlines",
    type: "Plane",
    price: 500,
    schedule: "MTWTFSS"
  } as TravelRoute;

  return (
    <>
      Welcome to my websites
    </>
  );
}
