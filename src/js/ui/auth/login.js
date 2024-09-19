import api from "../../api/instance.js"

export async function onLogin(event) {
    event.preventDefault()
    const form = event.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    //show loader

    try {
        await api.auth.login(data)
    } catch (error) {
        console.error(error.messages);
        alert(error)
    } finally {
        window.location.href= "/"
    }
}
