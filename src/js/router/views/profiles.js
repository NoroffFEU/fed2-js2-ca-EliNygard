import { viewProfile } from "../../ui/profiles/viewProfile.js";
import { viewProfiles } from "../../ui/profiles/viewProfiles.js";


let page = 1
const limit = 10

export function updateButtonStates() {
    if (page <= 1) {
        document.getElementById("prevPage").setAttribute("disabled", true)
    } else {
        document.getElementById("prevPage").removeAttribute("disabled")
    }
}

viewProfiles(limit, page)
updateButtonStates()

document.getElementById("nextPage").addEventListener("click", () => {
    const url = new URL(window.location.href)
    page++
    url.searchParams.set("page", page)
    window.history.pushState({}, "", url)
    viewProfiles(limit, page)
    updateButtonStates()
})
document.getElementById("prevPage").addEventListener("click", () => {
    if (page > 1) {
        const url = new URL(window.location.href)
        page--
        url.searchParams.set("page", page)
        window.history.pushState({}, "", url)
        viewProfiles(limit, page)
        updateButtonStates()
    }
})
document.getElementById("firstPage").addEventListener("click", () => {
    const url = new URL(window.location.href)
    page = 1
    url.searchParams.set("page", page)
    window.history.pushState({}, "", url)
    viewProfiles(limit, page)
    updateButtonStates()
})
