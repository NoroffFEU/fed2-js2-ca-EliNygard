import api from "../../api/instance.js"

export async function viewPost() {
    try {
        const posts = await api.posts.read()

        const list = posts.map((post) => {
            const li = document.createElement("li")
            const a = document.createElement("a")
            a.href = `/post/?id=${post.id}`
            a.innerText = post.title
            li.append(a)
            return li
        })

        document.querySelector("ul").append(...list)
    } catch (error) {
        alert(error)
        console.error(error);
        
    }
}