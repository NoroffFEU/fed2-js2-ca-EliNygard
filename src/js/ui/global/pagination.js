import { currentPage, decrementPage, incrementPage } from "../../utilities/paginationStates";
import { viewProfiles } from "../profiles/viewProfiles";

export function loadNextPage(limit) {
    incrementPage()
    viewProfiles(limit, currentPage);
}

export function loadPreviousPage(limit) {
    decrementPage()
    viewProfiles(limit, currentPage)
}

export function loadFirstPage() {
    viewProfiles()
}