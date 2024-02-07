import { format, parseISO } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { ncNewsDelete } from "../api/APIUtils";

export default function CommentCard({
  comment,
  setCommentList,
  setArticleData,
}) {
  const { user } = useContext(UserContext);
  const [deleteAction, setDeleteAction] = useState(false);
  const [apiErr, setApiErr] = useState(null);
  const formattedDate = comment.created_at
    ? format(parseISO(comment.created_at), "HH:mm aaa, eeee do MMM, yyyy")
    : null;

  const handleDelete = () => {
    setDeleteAction(true);
    setApiErr(null);
    ncNewsDelete(`comments/${comment.comment_id}`)
      .then(() => {
        setArticleData((currentArticle) => {
          return {...currentArticle, comment_count: --currentArticle.comment_count};
        });
        setCommentList((currentCommentList) => {
          const updatedComments = currentCommentList.filter(
            (thisComment) => thisComment.comment_id !== comment.comment_id
          );
          return [...updatedComments];
        });
      })
      .catch(() => {
        setDeleteAction(false);
        setApiErr("Something went wrong, please try deleting again.");
      });
  };

  return (
    <Card sx={{ maxWidth: 800, width: 1, marginTop: 1 }}>
      <CardContent sx={{ padding: "1px" }}>
        <Typography variant="body1" color="text.secondary" sx={{ paddingY: 1 }}>
          {comment.body}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Posted by <Link to="">{comment.author}</Link> at {formattedDate}
        </Typography>
        <Typography variant="overline">Rating: {comment.votes}</Typography>
      </CardContent>
      {comment.author === user.username ? (
        <CardActions sx={{ paddingTop: 0 }}>
          <Button
            variant="contained"
            size="small"
            disabled={deleteAction}
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            onClick={handleDelete}
          >
            {deleteAction ? "Deleting Comment..." : "Delete Comment"}
          </Button>
        </CardActions>
      ) : null}{" "}
      {apiErr ? (
        <Typography
          variant="subtitle2"
          sx={{ lineHeight: 1, paddingBottom: 1 }}
        >
          {apiErr}
        </Typography>
      ) : null}
    </Card>
  );
}