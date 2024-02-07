import { Route, Routes, useParams } from "react-router-dom";
import Home from "./Home";
import SingleArticle from "./SingleArticle";
import Topic from "./Topic";

export default function SiteManager() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:topic/:id" element={<SingleArticle />} />
        <Route path="/:topic/" element={<Topic />} />
      </Routes>
    </main>
  );
}
