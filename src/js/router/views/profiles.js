import { viewProfiles } from "../../ui/profiles/viewProfiles.js";


let page = 1
const limit = 10
viewProfiles(limit, page)

document.getElementById("nextPage").addEventListener("click", () => {
    const url = new URL(window.location.href)
    page++
    url.searchParams.set("page", page)
    window.history.pushState({}, "", url)
    viewProfiles(limit, page)
})
document.getElementById("prevPage").addEventListener("click", () => {
    const url = new URL(window.location.href)
    page--
    url.searchParams.set("page", page)
    window.history.pushState({}, "", url)
    viewProfiles(limit, page)
})
document.getElementById("firstPage").addEventListener("click", () => {
    const url = new URL(window.location.href)
    page = 1
    url.searchParams.set("page", page)
    window.history.pushState({}, "", url)
    viewProfiles(limit, page)
})


// const limit = 10

// document.getElementById("prevPage").addEventListener("click", () => loadPreviousPage(limit))
// document.getElementById("nextPage").addEventListener("click", () => loadNextPage(limit))
// document.getElementById("firstPage").addEventListener("click", () => loadFirstPage())



// viewProfiles(limit, currentPage)

// document.addEventListener("DOMContentLoaded", () => {
//     const url = new URL(window.location.href);
//     const limit = url.searchParams.get("limit") || 10;  // Default to 10 if not present
//     const page = url.searchParams.get("page") || 1;     // Default to page 1 if not present
  
//     viewProfiles(limit, page);  // Load profiles based on the URL
//   });
  

