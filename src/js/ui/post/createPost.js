import api from "../../api/instance.js"

export async function onCreatePost(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    try {
        const post = (await api.post.create(data)).data;
        
        window.location.href = `/post/?id=${post.id}`
    } catch(error) {
        console.error();
    }
}
