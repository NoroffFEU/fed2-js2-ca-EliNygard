import api from "../../api/instance.js";

export async function onUpdateProfile(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  //   const data = Object.fromEntries(formData.entries());

  const data = {
    bio: formData.get("bio"),
    avatar: {
      url: formData.get("avatar"),
      alt: "Your avatar image",
    },
    banner: {
      url: formData.get("banner"),
      alt: "Your banner image",
    },
  };

  const profileName = api.user.name;

  try {
    await api.profiles.update(profileName, data);
    window.location.reload();
  } catch (error) {
    console.error("Error updating profile: ", error);
    // alert(error)
  } finally {
    // hide loader
  }
}
