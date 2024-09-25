import { viewProfiles } from "../../ui/profiles/viewProfiles.js";
import api from "../../api/instance.js";

let page = 1
const limit = 30

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
    console.log("Next page url:" + url);
    
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


async function displayPagesProfiles() {
    const profilesObject = await api.profiles.readAllProfiles()
    const pages = profilesObject.meta.pageCount
    
    const paginationContainer = document.getElementById("paginationContainer")
    paginationContainer.innerHTML = ""

    for (let i = 1; i <= pages; i++) {
        const button = document.createElement("button")
        button.textContent = i;
        button.addEventListener("click", () => {
            const url = new URL(window.location.href)
            page = i
            url.searchParams.set("page", page)
            window.history.pushState({}, "", url)
            viewProfiles(limit, page)
            updateButtonStates()
            console.log("Select page url:" + url);
            
        })
        paginationContainer.appendChild(button)
    }
}
displayPagesProfiles()
