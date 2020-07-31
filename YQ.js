document.addEventListener("DOMContentLoaded", () => {
  const queryInput = document.getElementById("searchBar");
  const searchForm = document.getElementById("searchForm");
  queryInput.focus();

  const YOUTUBE_QUERY_PREFIX = "https://youtube.com/results?search_query=";

  searchForm.addEventListener("submit", (event) => {
    const USER_INPUT = new String(queryInput.value);
    const TRIMMED_INPUT = USER_INPUT.trim();
    const SEARCH_QUERY = TRIMMED_INPUT.replace(/ /g, "+");

    const REQUEST = YOUTUBE_QUERY_PREFIX + SEARCH_QUERY;
    window.open(REQUEST);
    event.preventDefault();
  });
});
