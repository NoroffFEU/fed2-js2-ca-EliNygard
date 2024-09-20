import api from "../../api/instance.js";

export async function viewProfiles() {
  try {
    const profiles = await api.profiles.allProfiles();

    const list = profiles.map((profile) => {
      const li = document.createElement("li");
      li.innerText = profile.name;
      return li;
    });

    document.getElementById("profilesAll").append(...list);
  } catch (error) {
    console.error(error);
  }
}
