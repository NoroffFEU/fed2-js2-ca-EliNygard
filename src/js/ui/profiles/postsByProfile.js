import api from "../../api/instance.js";

export async function viewPostsByProfile() {
    try {
        const parameterString = window.location.search
        const searchParameters = new URLSearchParams(parameterString)
        const profileName = searchParameters.get("name")

        const postsObject = await api.profiles.readPostsByProfile(profileName)
        const posts = postsObject.data

        if (posts) {
            const list = posts.map((post) => {
                const li = document.createElement("li")
    
                const title = document.createElement("h3")
                title.textContent = post.title
    
                li.appendChild(title)
                return li;
            })
            document.querySelector("body").append(...list);

        } else {
            console.log("no posts");
            
        }

        
        
    } catch (error) {
        console.error("Error fetching posts: ", error);
        alert(error)
    } finally {
        // end loader
    }
}