import { viewProfiles } from "../../ui/profiles/viewProfiles";

let currentPage = 1
const limit = 40

function loadNextPage() {
    currentPage++
    viewProfiles(limit, currentPage);
}

function loadPreviousPage() {
    currentPage--
    viewProfiles(limit, currentPage)
}

document.getElementById("prevPage").addEventListener("click", loadPreviousPage)
document.getElementById("nextPage").addEventListener("click", loadNextPage)

viewProfiles(limit, currentPage)


