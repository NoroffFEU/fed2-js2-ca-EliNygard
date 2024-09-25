import api from "../../api/instance.js";

export async function onUpdatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const id = api.id;

  try {
    const post = (await api.post.update(id, data)).data;

    window.location.href = `/post/?id=${post.id}`;
    // window.location.href = `/profile/`;
  } catch (error) {
    console.error("Error updating post: ",error);
    alert(error)
  } finally {
    // hide loader
  }
}
