import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ncNewsPost } from "../api/APIUtils";
import { Paper } from "@mui/material";

export default function AddComment({
  setCommentList,
  article_id,
  setArticleData,
}) {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [formError, setFormError] = useState(false);
  const [apiErr, setApiErr] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!newComment) {
      setFormError(true);
      return;
    }
    setSubmitted(true);
    setApiErr(null);
    const nowDate = new Date();
    const commentObj = {
      comment_id: nowDate.toISOString(),
      body: newComment,
      votes: 0,
      author: user.username,
      created_at: nowDate.toISOString(),
    };
    setCommentList((currentCommentList) => {
      return [commentObj, ...currentCommentList];
    });
    setArticleData((currentArticle) => {
      return {
        ...currentArticle,
        comment_count: ++currentArticle.comment_count,
      };
    });
    ncNewsPost(`/articles/${article_id}/comments`, {
      username: user.username,
      body: newComment,
    })
      .then(({ data: { comment } }) => {
        setSubmitted(false);
        setNewComment("");
        setCommentList((currentCommentList) => {
          const updatedComments = [...currentCommentList];
          updatedComments[0].comment_id = comment.comment_id;
          return [...updatedComments];
        });
      })
      .catch((err) => {
        setSubmitted(false);
        setCommentList((currentCommentList) => {
          currentCommentList.shift();
          return [...currentCommentList];
        });
        setArticleData((currentArticle) => {
          return {
            ...currentArticle,
            comment_count: --currentArticle.comment_count,
          };
        });
        setApiErr("Something went wrong, please try commenting again.");
      });
  };
  const handleInput = (input) => {
    setFormError(false);
    setNewComment(input);
  };
  return (
    <>
      <Box component="div" sx={{ maxWidth: 1280, width: 1}}>
        <Typography variant="h5"  sx={{padding: 1}}>Add a Comment</Typography>
      </Box>
      <Paper elevation={1} sx={{ maxWidth: 1280, width: 1 }}>
        <Box component="form" sx={{ padding: 1 }}>
          <TextField
            required
            multiline
            minRows={2}
            fullWidth
            label={`Hi, ${user.username}! What would you like to say?`}
            id="comment"
            disabled={submitted}
            error={formError ? true : false}
            helperText={formError ? "You must write a comment" : null}
            onChange={(event) => handleInput(event.target.value)}
            value={newComment}
          />
          <Button
            variant="contained"
            disabled={submitted}
            sx={{ mt: 1, marginLeft: "auto", marginRight: "auto" }}
            onClick={handleSubmit}
          >
            Add Comment
          </Button>
          {apiErr ? (
            <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
              {apiErr}
            </Typography>
          ) : null}
        </Box>
      </Paper>
    </>
  );
}
