import { Route, Routes } from "react-router-dom";
import Home from "./Home";

export default function SiteManager() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}
