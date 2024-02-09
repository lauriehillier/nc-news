import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import ncNewsGet from "../api/APIUtils";
import { useParams, useSearchParams } from "react-router-dom";
import Sorting from "./Sorting";
import ErrorHandling from "./ErrorHandling";
import Typography from "@mui/material/Typography";
import { Paper, Skeleton } from "@mui/material";
import PaginationBar from "./PaginationBar";

export default function Articles({}) {
  const [order, setOrder] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  const [articlesList, setArticlesList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalArticles, setTotalArticles] = useState(null);
  const { topic } = useParams();
  const [page, setPage] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      p: value,
    });
  };
  const urlOrder = searchParams.get("order");
  const urlSort = searchParams.get("sort");
  const urlPage = searchParams.get("p");
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
    if (urlPage !== page) setPage(urlPage);
  }, [urlOrder, urlPage, urlSort]);

  console.log(isLoading);
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    ncNewsGet("/articles", {
      params: { topic, order: order || urlOrder, sort_by: sort, p: page },
    })
      .then(({ data: { articles } }) => {
        setIsLoading(false);
        setArticlesList(articles);
        setTotalArticles(articles[0].total_count);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err);
        console.log(err)
      });
  }, [topic, order, sort, page]);

  if (isError)
    return (
      <ErrorHandling
        code={isError.response.status || null}
        msg={isError.response.data.msg || null}
      />
    );

  if (!articlesList.length && !isLoading)
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
        order={order}
        sort={sort}
        setSort={setSort}
        setPage={setPage}
        setOrder={setOrder}
      />
      {!isLoading ? (
        <>
        <PaginationBar total={Math.ceil(totalArticles / 10)} page={page} setPage={setPage}/>
          {articlesList.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
          <PaginationBar total={Math.ceil(totalArticles / 10)} page={page} setPage={setPage}/>
        </>
      ) : (
        <Paper elevation={1} sx={{ maxWidth: 1280, width: 1, mt: 1, textAlign:"center" }}>
          <Skeleton
            variant="rectangular"
            height={140}
            sx={{width:1}}
          />
          <Skeleton
            variant="text"
            sx={{width: 0.75, fontSize: "3rem", ml: "auto", mr: "auto"}}
          />
          <Skeleton
            variant="text"
            sx={{width: 0.5, ml: "auto", mr: "auto"}}
          />
           <Skeleton
            variant="text"
            sx={{width: 0.3, ml: "auto", mr: "auto"}}
          />
        </Paper>
      )}
    </div>
  );
}
