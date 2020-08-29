document.addEventListener("DOMContentLoaded", () => {
  const queryInput = document.getElementById("searchBar");
  const searchForm = document.getElementById("searchForm");
  const onCurrentTab = document.getElementById("onCurrentTab");
  const localStorage = window.localStorage;

  onCurrentTab.checked = localStorage.getItem("isChecked");

  onCurrentTab.addEventListener("change", (event) => {
    const stringfyChecked = String(onCurrentTab.checked);

    if (stringfyChecked === "false") {
      localStorage.setItem("isChecked", "");
    } else {
      localStorage.setItem("isChecked", stringfyChecked);
    }

    event.preventDefault();
  });

  queryInput.focus();

  function openInCurTab(request) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const curTab = tabs[0];
      chrome.tabs.update(curTab.id, { url: request });
    });
  }

  const YOUTUBE_QUERY_PREFIX = "https://youtube.com/results?search_query=";

  searchForm.addEventListener("submit", (event) => {
    const USER_INPUT = new String(queryInput.value);
    const TRIMMED_INPUT = USER_INPUT.trim();
    const SEARCH_QUERY = TRIMMED_INPUT.replace(/ /g, "+");

    const REQUEST = YOUTUBE_QUERY_PREFIX + SEARCH_QUERY;

    if (onCurrentTab.checked) {
      openInCurTab(REQUEST);
    } else {
      // window.open(REQUEST);
      chrome.tabs.create({ url: REQUEST });
    }

    event.preventDefault();
  });
});
