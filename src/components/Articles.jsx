import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import ncNewsGet from "../api/APIUtils";
import { useParams } from "react-router-dom";

export default function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { topic } = useParams();
  
  useEffect(() => {
    setIsLoading(true);
    ncNewsGet("/articles", {params: {topic}})
      .then(({ data: { articles } }) => {
        setIsLoading(false);
        setArticlesList(articles);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [topic]);

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
