import api from "../../api/instance.js";

export async function onComment(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    
    try {
        const id  = api.id;
        console.log(id);
        
        const comment = await api.posts.commentOnPost(id, data)
        console.log(comment);
    } catch (error) {
        console.error("Error trying to add comment; ", error);
        alert(error)
    } finally {
        localStorage.removeItem("id")
        window.location.href = "/"
    }

}