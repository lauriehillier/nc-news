import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import ncNewsGet from "../api/APIUtils";
import { useParams, useSearchParams } from "react-router-dom";
import Sorting from "./Sorting";

export default function Articles({}) {
  const [order, setOrder] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  const [articlesList, setArticlesList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { topic } = useParams();

  let [searchParams, setSearchParams] = useSearchParams();
  const urlOrder = searchParams.get("order");
  const urlSort = searchParams.get("sort");
  const sortString = {
    created_at: "date",
    comment_count: "comments",
    votes: "votes",
  };
  useEffect(() => {
    if (urlOrder !== order) setOrder(urlOrder);
    if (urlSort !== sort)
      setSort(
        Object.keys(sortString).find((key) => sortString[key] === urlSort)
      );
  }, [urlOrder, urlSort]);
  
  useEffect(() => {
    setIsLoading(true);
    ncNewsGet("/articles", { params: { topic, order: order, sort_by: sort } })
      .then(({ data: { articles } }) => {
        setIsLoading(false);
        setArticlesList(articles);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [topic, order, sort]);

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isError) return <p>Oops... Something went wrong. Please try again.</p>;

  return (
    <div id="articles">
      <Sorting
        setOrder={setOrder}
        order={order}
        sort={sort}
        setSort={setSort}
      />
      {articlesList.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </div>
  );
}
