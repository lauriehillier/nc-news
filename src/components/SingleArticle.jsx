import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ncNewsGet from "../api/APIUtils";
import ArticleCard from "./ArticleCard";
import CommentCard from "./CommentCard";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import { UserContext } from "../contexts/UserContext";
import AddComment from "./AddComment";
import { LocationContext } from "../contexts/LocationContext";
import ErrorHandling from "./ErrorHandling";

export default function SingleArticle() {
  const { user } = useContext(UserContext);
  const { setLocation } = useContext(LocationContext);
  const [articleData, setArticleData] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id, topic } = useParams();

  useEffect(() => {
    setLocation(topic);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      ncNewsGet(`/articles/${id}`),
      ncNewsGet(`/articles/${id}/comments`),
    ])
      .then((response) => {
        setIsLoading(false);
        setArticleData(response[0].data.article);
        setCommentList(response[1].data.comments);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <ErrorHandling
        code={isError.response.status}
        msg={isError.response.data.msg}
      />
    );

  return (
    <>
      <div id="article">
        <ArticleCard article={articleData} />
        {user ? (
          <AddComment
            setCommentList={setCommentList}
            article_id={articleData.article_id}
            setArticleData={setArticleData}
          />
        ) : null}
      </div>
      <div id="comments">
        <Box component="div" sx={{ maxWidth: 1280, width: 1 }}>
          <Typography variant="h5">
            Comments{" "}
            {articleData.comment_count
              ? `(${articleData.comment_count})`
              : null}
          </Typography>
        </Box>
        {commentList.length ? (
          commentList.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                setCommentList={setCommentList}
                setArticleData={setArticleData}
              />
            );
          })
        ) : (
          <Card
            sx={{ maxWidth: 1280, minWidth: 300, marginTop: 1, padding: 1 }}
          >
            <Typography variant="body1" color="text.secondary">
              No comments yet...
            </Typography>
          </Card>
        )}
      </div>
    </>
  );
}
