import api from "../../api/instance.js"

export async function onUpdatePost(event) {
    event.preventDefault()
    const form = event.target;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    try {
        const post = (await api.post.update(data)).data

        

        window.location.href = `/post/?id=${post.id}`
    }catch(error) {
        console.error(error);
        
    }
}
