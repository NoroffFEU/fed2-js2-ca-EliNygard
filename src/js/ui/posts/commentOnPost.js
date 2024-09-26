import api from "../../api/instance.js";

export async function onComment(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    
    try {
        // show loader
        const id  = api.id;
        const comment = await api.posts.commentOnPost(id, data)
        console.log(comment);
        
        alert("Comment added.")
        
        // optionally append the comment to the post dynamically here
        // document.querySelector('#comments-section').innerHTML += `<p>${comment.content}</p>`; 
        // OR:
        // await api.posts.commentOnPost(id, data); // Just await without assigning it to a variable
    } catch (error) {
        console.error("Error trying to add comment: ", error);
        alert(error)
    } finally {
        form.reset()
        localStorage.removeItem("id")
        window.location.href = "/"
        // hide loader
    }
}