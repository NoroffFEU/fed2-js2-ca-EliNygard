import api from "../../api/instance.js";

export async function viewPostsFollowing() {
  try {
    const posts = await api.posts.readFollowing();

    const list = posts.map((post) => {
      const li = document.createElement("li");

      const h3 = document.createElement("h3");
      h3.textContent = post.title;

      const aAuthor = document.createElement("a");
      aAuthor.textContent = `Author: ${post.author.name}`;
      aAuthor.href = `../profiles/posts/?name=${post.author.name}`

      const img = document.createElement("img");
      img.src =
        post.media && post.media.url
          ? post.media.url
          : "https://picsum.photos/id/14/200/300";

      img.onerror = function () {
        img.alt = post.media.alt;
      };

      const btnComment = document.createElement("button");
      btnComment.textContent = "Comment";

      const xComments = document.createElement("p");
      xComments.textContent = `Comments: ${post._count.comments}`;

      li.append(img, xComments, btnComment, h3, aAuthor);
      return li;
    });
    document.getElementById("postsFollowing").append(...list);
  } catch (error) {
    console.error("Error fetching posts: ",error);
    alert(error);
  } finally {
    //loader
  }
}
