import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/updatePost.js";
import api from "../../api/instance.js"

authGuard();

const form = document.forms.editPost;

form.addEventListener("submit", onUpdatePost);

const id = localStorage.getItem("id")
console.log(id);

        if (id) {
            api.post.loadPostData(id, form);
          }
