import api from "../../api/instance.js"

export async function viewPost() {
    try {
        const parameterString = window.location.search;
        const searchParameters = new URLSearchParams(parameterString)
        const id = searchParameters.get("id")

        const post = await api.post.read(id)
        console.log(post);
    } catch(error) {
        console.error(error);
        
    }
}