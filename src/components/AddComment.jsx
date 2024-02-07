import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ncNewsPost } from "../api/APIUtils";

export default function AddComment({ setCommentList, article_id }) {
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
    ncNewsPost(`/articles/${article_id}/comments`, {
      username: user.username,
      body: newComment,
    })
      .then(() => {
        setSubmitted(false);
        setNewComment("");
      })
      .catch((err) => {
        setSubmitted(false);
        setCommentList((currentCommentList) => {
          currentCommentList.shift();
          return [...currentCommentList];
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
      <Box component="div">
        <Typography variant="h5">Add a Comment</Typography>
      </Box>
      <Card sx={{ maxWidth: 800, width: 1, padding: 1 }}>
        <Box component="form">
          <TextField
            required
            multiline
            minRows={2}
            fullWidth
            label="What would you like to say?"
            id="comment"
            disabled={submitted}
            error={formError ? true : false}
            helperText={formError ? "You must write a comment" : null}
            onChange={(event) => handleInput(event.target.value)}
            value={newComment}
          />
          <CardActions>
            <Button
              variant="contained"
              disabled={submitted}
              sx={{ marginLeft: "auto", marginRight: "auto" }}
              onClick={handleSubmit}
            >
              Add Comment
            </Button>
          </CardActions>
          {apiErr ? (
            <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
              {apiErr}
            </Typography>
          ) : null}
        </Box>
      </Card>
    </>
  );
}
