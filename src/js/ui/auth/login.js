import api from "../../api/instance.js"

export async function onLogin(event) {
    event.preventDefault()
    const form = event.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    let loginSuccessful = false

    //show loader

    try {
        await api.auth.login(data)
        loginSuccessful(true)
    } catch (error) {
        console.error(error);
        alert(error)
        window.location.href = "/auth/login/"
    } finally {
        if (loginSuccessful) {
            window.location.href= "/"
        }
    }
}
