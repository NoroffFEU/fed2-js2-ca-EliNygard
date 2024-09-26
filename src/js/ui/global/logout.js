import api from "../../api/instance.js"

export function setLogoutListener() {
    const buttons = document.querySelectorAll("[data-auth=logout]")
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            api.auth.logout()
        })

    })
}
