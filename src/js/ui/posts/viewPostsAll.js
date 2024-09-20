import api from "../../api/instance.js";

export async function viewPostsAll() {
  try {
    const posts = await api.posts.read();

    const li = posts.map((post) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `/post/?id=${post.id}`;
      a.innerText = post.title;
      li.append(a);
      return li;
    });

    document.getElementById("postsAll").append(...li)
  } catch (error) {
    console.error(error);
  }
}
