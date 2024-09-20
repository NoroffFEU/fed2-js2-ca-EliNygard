import api from "../../api/instance.js";

export function viewPostsByProfile() {
    try {
        const posts = await api.posts.read()
    }
}