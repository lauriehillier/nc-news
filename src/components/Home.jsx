import { useContext, useEffect } from "react";
import Articles from "./Articles";
import { LocationContext } from "../contexts/LocationContext";

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
