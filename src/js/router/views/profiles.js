import { viewProfiles } from "../../ui/profiles/viewProfiles.js";
import api from "../../api/instance.js";

let page = 1;
const limit = 30;

export function updateButtonStates() {
  if (page <= 1) {
    document.getElementById("prevPage").setAttribute("disabled", true);
  } else {
    document.getElementById("prevPage").removeAttribute("disabled");
  }
}

viewProfiles(limit, page);
updateButtonStates();

document.getElementById("nextPage").addEventListener("click", () => {
  const url = new URL(window.location.href);
  page++;
  url.searchParams.set("page", page);
  window.history.pushState({}, "", url);
  viewProfiles(limit, page);
  updateButtonStates();
  console.log("Next page url:" + url);
});
document.getElementById("prevPage").addEventListener("click", () => {
  if (page > 1) {
    const url = new URL(window.location.href);
    page--;
    url.searchParams.set("page", page);
    window.history.pushState({}, "", url);
    viewProfiles(limit, page);
    updateButtonStates();
  }
});
document.getElementById("firstPage").addEventListener("click", () => {
  const url = new URL(window.location.href);
  page = 1;
  url.searchParams.set("page", page);
  window.history.pushState({}, "", url);
  viewProfiles(limit, page);
  updateButtonStates();
});

const pagesPerGroup = 10;

async function displayPagesProfiles() {
  const profilesObject = await api.profiles.readAllProfiles();
  const totalPages = profilesObject.meta.pageCount;
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  let currentPageGroup = Math.floor((page - 1) / pagesPerGroup);

  function renderPageButtons() {
    paginationContainer.innerHTML = "";

    const startPage = currentPageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    if (startPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous 10 pages";
      prevButton.addEventListener("click", () => {
        currentPageGroup--;
        renderPageButtons();
      });
      paginationContainer.appendChild(prevButton);
    }

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      if (i === page) {
        button.setAttribute("disabled", true);
      }
      button.addEventListener("click", () => {
        const url = new URL(window.location.href);
        page = i;
        url.searchParams.set("page", page);
        window.history.pushState({}, "", url);
        viewProfiles(limit, page);
        updateButtonStates();
      });
      paginationContainer.appendChild(button)
    }

    if (endPage < totalPages) {
        const nextButton = document.createElement("button")
        nextButton.textContent = "Next 10 pages"
        nextButton.addEventListener("click", () => {
            currentPageGroup++
            renderPageButtons()
        })
        paginationContainer.appendChild(nextButton)
    }
  }
  renderPageButtons()

  // for (let i = 1; i <= pages; i++) {
  //     const button = document.createElement("button")
  //     button.textContent = i;
  //     button.addEventListener("click", () => {
  //         const url = new URL(window.location.href)
  //         page = i
  //         url.searchParams.set("page", page)
  //         window.history.pushState({}, "", url)
  //         viewProfiles(limit, page)
  //         updateButtonStates()
  //         console.log("Select page url:" + url);

  //     })
  //     paginationContainer.appendChild(button)
  // }
}
displayPagesProfiles();
