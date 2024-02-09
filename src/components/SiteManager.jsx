import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import SingleArticle from "./SingleArticle";
import Topic from "./Topic";
import ErrorHandling from "./ErrorHandling";
import Login from "./Login";

export default function SiteManager() {
  return (
    <main>
      <Routes>
        <Route path="*" element={<ErrorHandling code={404}/>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topic/:topic" element={<Topic />} />
        <Route path="/:topic/:id" element={<SingleArticle />} />
      </Routes>
    </main>
  );
}
