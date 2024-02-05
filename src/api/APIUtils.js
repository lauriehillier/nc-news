import axios from "axios";
const ncNewsApi = axios.create({
	baseURL: "https://lh-nc-news.onrender.com/api",
});

export default function ncNewsGet(url) {
	return ncNewsApi.get(url);
}
