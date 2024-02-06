import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SingleArticle from "./SingleArticle";

export default function SiteManager() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:topic/:id" element={<SingleArticle />} />
      </Routes>
    </main>
  );
}
