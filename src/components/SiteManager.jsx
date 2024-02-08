import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SingleArticle from "./SingleArticle";
import Topic from "./Topic";
import ErrorHandling from "./ErrorHandling";

export default function SiteManager() {
  return (
    <main>
      <Routes>
        <Route path="*" element={<ErrorHandling code={404}/>} />
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topic/" element={<Topic />} />
        <Route path="/:topic/:id" element={<SingleArticle />} />
      </Routes>
    </main>
  );
}
