import api from "../../api/instance.js";

export async function onComment(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    
    try {
        const id  = api.id;
        const comment = await api.posts.commentOnPost(id, data)
    } catch (error) {
        console.error("Error trying to add comment; ", error);
        alert(error)
    } finally {
        localStorage.removeItem("id")
        window.location.href = "/"
    }

}