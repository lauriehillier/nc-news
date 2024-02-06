import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

export default function ArticleCard({ article }) {
  return (
    <Card sx={{ maxWidth: 800, width: 1 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={article.article_img_url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          <Link to={"/article/" + article.article_id}>{article.title}</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Posted by <Link to="">{article.author}</Link> in{" "}
          <Link to="">{article.topic}</Link> at{" "}
          {format(parseISO(article.created_at), "HH:ss aaa, eeee do MMM, yyyy")}
        </Typography>
        <Typography variant="overline">
          Rating: {article.votes} // Comments: {article.comment_count}
        </Typography>
      </CardContent>
    </Card>
  );
}
