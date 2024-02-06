import { format, parseISO } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const formattedDate = article.created_at
    ? format(parseISO(article.created_at), "HH:ss aaa, eeee do MMM, yyyy")
    : null;
  const img_height = article.body ? 1 : 140;
  return (
    <Card sx={{ maxWidth: 800, width: 1 }}>
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
          Rating: {article.votes} // Comments: {article.comment_count}
        </Typography>
      </CardContent>
    </Card>
  );
}
