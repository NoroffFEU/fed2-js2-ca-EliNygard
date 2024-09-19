import api from "../../api/instance.js"

export function setLogoutListener() {
    const button = document.getElementById("logout-btn")
    button.addEventListener("click", () => {
        api.auth.logout()
    })
}
