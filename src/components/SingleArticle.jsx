import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ncNewsGet from "../api/APIUtils";
import ArticleCard from "./ArticleCard";

export default function SingleArticle() {
  const [articleData, setArticleData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    ncNewsGet(`/articles/${id}`)
      .then(({ data: { article } }) => {
        setIsLoading(false);
        setArticleData(article);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Oops... Something went wrong. Please try again.</p>;

  console.log(articleData);
  return <ArticleCard article={articleData}/>;
}
