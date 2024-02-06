import { format, parseISO } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function CommentCard({ comment }) {
  const formattedDate = comment.created_at
    ? format(parseISO(comment.created_at), "HH:ss aaa, eeee do MMM, yyyy")
    : null;
  return (
    <Card sx={{ maxWidth: 800, width: 1, marginTop: 1  }}>
      <CardContent>
        <Typography variant="body1" color="text.secondary" sx={{ paddingY: 1 }}>
          {comment.body}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Posted by <Link to="">{comment.author}</Link> at {formattedDate}
        </Typography>
        <Typography variant="overline">Rating: {comment.votes}</Typography>
      </CardContent>
    </Card>
  );
}
