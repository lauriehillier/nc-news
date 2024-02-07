import axios from "axios";
const ncNewsApi = axios.create({
  baseURL: "https://lh-nc-news.onrender.com/api",
});

export default function ncNewsGet(url, params) {
  return ncNewsApi.get(url, params);
}
export function ncNewsPatch(url, request) {
  return ncNewsApi.patch(url, request);
}
export function ncNewsPost(url, request) {
  return ncNewsApi.post(url, request);
}
export function ncNewsDelete(url) {
  return ncNewsApi.delete(url);
}