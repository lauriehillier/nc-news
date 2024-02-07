import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LocationContext } from "../contexts/LocationContext";
import Articles from "./Articles";

export default function Topic() {
  const { topic } = useParams();
  const { setLocation } = useContext(LocationContext);
  useEffect(() => {
    setLocation(topic);
  }, [topic]);
  return <Articles />;
}
