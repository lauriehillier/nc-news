import { format, parseISO } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ncNewsPatch } from "../api/APIUtils";

export default function ArticleCard({ article }) {
  const { user } = useContext(UserContext);
  const [votes, setVotes] = useState(article.votes);
  const [err, setErr] = useState(null);
  const [userVote, setUserVote] = useState(null);

  const onClickVote = (vote) => {
    setUserVote(!userVote ? vote : null);
    setErr(null);
    setVotes((currentVotes) => currentVotes + vote);
    ncNewsPatch(`/articles/${article.article_id}`, { inc_votes: vote }).catch(
      () => {
        setVotes((currentVotes) => currentVotes - vote);
        setErr("Something went wrong, please try voting again.");
        setUserVote(null);
      }
    );
  };
  console.log(userVote, "log it");
  const formattedDate = article.created_at
    ? format(parseISO(article.created_at), "HH:mm aaa, eeee do MMM, yyyy")
    : null;
  const img_height = article.body ? 400 : 140;

  return (
    <Card sx={{ maxWidth: 800, width: 1, marginTop: 1, maxHeight: 1 }}>
      <CardMedia
        sx={{ height: img_height }}
        image={article.article_img_url}
        title="article image"
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          <Link to={article.topic + "/" + article.article_id}>
            {article.title}
          </Link>
        </Typography>
        {article.body ? (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ paddingY: 1 }}
          >
            {article.body}
          </Typography>
        ) : null}
        <Typography variant="body2" color="text.secondary">
          Posted by <Link to="">{article.author}</Link> in{" "}
          <Link to="">{article.topic}</Link> at {formattedDate}
        </Typography>
        <Typography variant="overline">
          Rating:
          {user ? (
            <>
              <IconButton
                aria-label={userVote === 1 ? "remove vote up" : "vote up"}
                color="primary"
                size="small"
                disabled={userVote === -1 ? true : false}
                onClick={() => onClickVote(userVote ? -1 : 1)}
              >
                {userVote === 1 ? (
                  <ThumbUpIcon fontSize="inherit" />
                ) : (
                  <ThumbUpOutlinedIcon fontSize="inherit" />
                )}
              </IconButton>
              {votes}
              <IconButton
                aria-label={userVote === -1 ? "remove vote down" : "vote down"}
                color="primary"
                size="small"
                disabled={userVote === 1 ? true : false}
                onClick={() => onClickVote(userVote ? 1 : -1)}
              >
                {userVote === -1 ? (
                  <ThumbDownIcon fontSize="inherit" />
                ) : (
                  <ThumbDownOutlinedIcon fontSize="inherit" />
                )}
              </IconButton>
            </>
          ) : (
            " " + article.votes
          )}
          {article.body ? null : ` // Comments: ${article.comment_count}`}
        </Typography>
        {err ? (
          <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
            {err}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}
