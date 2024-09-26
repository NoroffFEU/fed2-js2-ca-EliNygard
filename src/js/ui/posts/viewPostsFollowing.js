import api from "../../api/instance.js";
import { onComment } from "./commentOnPost.js";
import { onDeleteComment } from "./deleteComment.js";

export async function viewPostsFollowing() {
  try {
    const posts = await api.posts.readFollowing();
    const loggedinProfile = api.user.name

    const list = posts.map((post) => {
      const li = document.createElement("li");

      const h3 = document.createElement("h3");
      h3.textContent = post.title;

      const aAuthor = document.createElement("a");
      aAuthor.textContent = `Author: ${post.author.name}`;
      aAuthor.href = `../profiles/posts/?name=${post.author.name}`;

      const img = document.createElement("img");
      img.src =
        post.media && post.media.url
          ? post.media.url
          : "https://picsum.photos/id/14/200/300";

      img.onerror = function () {
        img.alt = post.media.alt;
      };

      const xComments = document.createElement("p");
      xComments.textContent = `Comments: ${post._count.comments}`;

      const sectionComment = document.createElement("section");

      const form = document.createElement("form");
      form.setAttribute("name", "commentOnPost");

      const label = document.createElement("label");
      label.setAttribute("for", "body");
      label.textContent = "Write your comment";

      const textarea = document.createElement("textarea");
      textarea.setAttribute("name", "body");
      textarea.setAttribute("id", "body");

      const button = document.createElement("button");
      button.textContent = "Comment";
      button.setAttribute("type", "submit");

      form.append(label, textarea, button);
      sectionComment.appendChild(form);

      form.addEventListener("submit", (event) => {
        const id = post.id;
        localStorage.setItem("id", id);
        onComment(event);
      });

      const commentsArray = post.comments;
      const commentsList = commentsArray.map((comment) => {
        const postId = comment.postId
        const commentId = comment.id
        
        const li = document.createElement("li");

        const aAuthor = document.createElement("a")
        aAuthor.textContent = `Comment by: ${comment.author.name}`
        aAuthor.href = `/profiles/profile/?name=${comment.author.name}`

        const body = document.createElement("p");
        body.textContent = comment.body;

        const btnContainer = document.createElement("div")

        const btnDelete = document.createElement("button")
        btnDelete.textContent = "Delete comment"
        btnDelete.addEventListener("click", () => onDeleteComment(postId, commentId))

        const author = comment.author.name
        
        if (author === loggedinProfile) {
          btnContainer.appendChild(btnDelete)
        }

        li.append(aAuthor, body, btnContainer);
        return li;
      });

      li.append(img, h3, aAuthor, xComments, sectionComment, ...commentsList);
      return li;
    });
    document.getElementById("postsFollowing").append(...list);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    alert(error);
  } finally {
    //loader
  }
}
