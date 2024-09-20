import api from "../../api/instance.js"

export async function viewPost() {
    try {
        const parameterString = window.location.search;
        const searchParameters = new URLSearchParams(parameterString)
        const id = searchParameters.get("id")

        const post = await api.post.read(id)
        console.log(post);

        const section = document.createElement("section")
        
        const h2 = document.createElement("h2")
        h2.textContent = post.title

        const p = document.createElement("p")
        p.textContent = post.body;

        const btnEdit = document.createElement("button")
        btnEdit.textContent = "Edit"

        const btnDelete = document.createElement("button")
        btnDelete.textContent = "Delete"

        section.append(h2, p, btnEdit, btnDelete)

        document.querySelector("body").appendChild(section)


    } catch(error) {
        console.error(error);
        
    }
}