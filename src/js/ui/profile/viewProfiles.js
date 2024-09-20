import api from "../../api/instance.js";

export async function viewProfiles() {
  try {
    const profiles = await api.profiles.readProfiles();

    const list = profiles.map((profile) => {
      const li = document.createElement("li");
      const a = document.createElement("a")
      a.href = `/profile?profile=${profile.name}`
      a.innerText = profile.name;
      li.appendChild(a)
      return li;
    });

    document.getElementById("profilesAll").append(...list);
  } catch (error) {
    console.error(error);
  }
}
