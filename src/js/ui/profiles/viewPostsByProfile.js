import api from "../../api/instance.js";

export async function viewPostsByProfile() {
  try {
    const posts = await api.profile.currentProfile.readPosts();

    const list = posts.map((post) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `/post/?id=${post.id}`;
      a.innerText = post.title;
      li.appendChild(a);
      return li;
    });

    document.querySelector("#viewPostsProfile").append(...list);
  } catch (error) {
    console.error(error);
  }
}
