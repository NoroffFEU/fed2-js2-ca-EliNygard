import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/updatePost.js";
import api from "../../api/instance.js";

authGuard();

const form = document.forms.editPost;

const id = api.id;

if (id) {
  api.post.loadPostData(id, form);
}

form.addEventListener("submit", onUpdatePost);
