import { useContext, useEffect, useState } from "react";
import Articles from "./Articles";
import { LocationContext } from "../contexts/LocationContext";
import Sorting from "./Sorting";

export default function Home() {
  const { setLocation } = useContext(LocationContext);
  useEffect(() => {
    setLocation("home");
  }, []);
 

  return (
    <>
      <Articles />
    </>
  );
}
