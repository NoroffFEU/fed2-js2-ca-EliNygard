import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/updatePost.js";
import api from "../../api/instance.js";

authGuard();

const form = document.forms.editPost;
console.log(form);


const id = api.idUrl;
console.log(id);


if (id) {
  try {
    api.post.loadPostData(id, form);
  } catch (error) {
    console.error("Error loading post data:", error);
    alert(error);
  }
}

form.addEventListener("submit", onUpdatePost);
