import api from "../../api/instance.js";

export async function viewPostsFollowing() {
    try {
        const posts = await api.posts.readFollowing()

        const list = posts.map((post) => {
            const li = document.createElement("li")
            
            const h3 = document.createElement("h3")
            h3.textContent = post.title

            const img = document.createElement("img")
            img.src = post.media && post.media.url ? post.media.url : "https://picsum.photos/id/14/200/300"

            img.onerror = function() {
                img.alt = post.media.alt
            }

            li.append(img, h3)
            return li
        })
        document.getElementById("postsFollowing").append(...list)
    } catch (error) {
        console.error(error)
        alert(error);
        
    } finally {
        //loader
    }
}