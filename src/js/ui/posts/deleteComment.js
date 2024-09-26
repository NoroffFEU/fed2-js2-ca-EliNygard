import api from "../../api/instance.js";

export async function onDeleteComment(postId, commentId) {
    try {
        await api.posts.deleteComment(postId, commentId)
        alert(`Comment #${commentId} has been deleted.`)
        window.location.href = "/"
    } catch (error) {
        console.error("Error: ", error);
        alert(error)
    }
}