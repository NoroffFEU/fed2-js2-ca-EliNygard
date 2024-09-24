import { loadFirstPage, loadNextPage, loadPreviousPage } from "../../ui/global/pagination.js";
import { viewProfiles } from "../../ui/profiles/viewProfiles.js";
import { currentPage } from "../../utilities/paginationStates.js";

const limit = 10

document.getElementById("prevPage").addEventListener("click", () => loadPreviousPage(limit))
document.getElementById("nextPage").addEventListener("click", () => loadNextPage(limit))
document.getElementById("firstPage").addEventListener("click", () => loadFirstPage())

viewProfiles(limit, currentPage)


