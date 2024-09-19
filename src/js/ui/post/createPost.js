import api from "../../api/instance.js"

export async function onCreatePost(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    

    //tags

    try {
        const post = await api.post.create(data)
        console.log(post);
        
        window.location.href = `/post/?id=${post.id}`
    } catch(error) {
        console.error();
        // alert(error)
    }
}
