import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import ncNewsGet from "../api/APIUtils";

export default function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ncNewsGet("/articles")
      .then(({ data: { articles } }) => {
        setIsLoading(false);
        setArticlesList(articles);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Oops... Something went wrong. Please try again.</p>;

  return (
    <div id="articles">
      {articlesList.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </div>
  );
}
