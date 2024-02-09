import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import ncNewsGet from "../api/APIUtils";
import { useParams, useSearchParams } from "react-router-dom";
import Sorting from "./Sorting";
import ErrorHandling from "./ErrorHandling";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

export default function Articles({}) {
  const [order, setOrder] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  const [articlesList, setArticlesList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { topic } = useParams();

  let [searchParams] = useSearchParams();
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
        Object.keys(sortString).find((key) => sortString[key] === urlSort) ||
          urlSort
      );
  }, [urlOrder, urlSort]);
  console.log(sort);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    ncNewsGet("/articles", { params: { topic, order: order, sort_by: sort } })
      .then(({ data: { articles } }) => {
        setIsLoading(false);
        setArticlesList(articles);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err);
      });
  }, [topic, order, sort]);

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <ErrorHandling
        code={isError.response.status}
        msg={isError.response.data.msg}
      />
    );

  if (!articlesList.length)
    return (
      <Paper elevation={1} sx={{ maxWidth: 1280, width: 1, mt: 1 }}>
        <Typography sx={{ padding: 1 }} variant="body1" color="text.secondary">
          No articles yet...
        </Typography>
      </Paper>
    );

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
