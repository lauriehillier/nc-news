import { Pagination, Paper, Stack } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";

export default function PaginationBar({ total, page, setPage }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      p: value,
    });
  };
  return (
    <Paper elevation={1} sx={{ maxWidth: 1280, width: 1, mt: 1 }}>
      <Stack alignItems="center">
        <Pagination
          count={total}
          page={+page || 1}
          onChange={handlePageChange}
        />
      </Stack>
    </Paper>
  );
}
