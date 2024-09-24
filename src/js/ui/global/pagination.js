import { currentPage, decrementPage, incrementPage } from "../../utilities/paginationStates";
import { viewProfiles } from "../profiles/viewProfiles";

export function loadNextPage(limit) {
    incrementPage()
    updateURL(limit, currentPage)
    viewProfiles(limit, currentPage);
}

export function loadPreviousPage(limit) {
    decrementPage()
    updateURL(limit, currentPage)
    viewProfiles(limit, currentPage)
}

export function loadFirstPage() {
    updateURL(limit, currentPage)
    viewProfiles()
}

function updateURL(limit = 10, page = 1) {
    const url = new URL(window.location.href)

    url.searchParams.set("limit", limit)
    url.searchParams.set("page", page)

    window.history.pushState({}, "", url)
}