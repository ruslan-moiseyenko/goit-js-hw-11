export default function getURL(query, page = 1) {
  const pesonalKey = "25600695-4ceee91aa58c1079792de0ba1";
  return `https://pixabay.com/api/?key=${pesonalKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
}
