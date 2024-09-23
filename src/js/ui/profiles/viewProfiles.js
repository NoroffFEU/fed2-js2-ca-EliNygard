import api from "../../api/instance.js";
import { onFollowProfile } from "./followProfile.js";

export async function viewProfiles() {
  try {
    const profiles = await api.profiles.readProfiles();

    const list = profiles.map((profile) => {
      // localStorage.setItem("currentProfile", profile.name)
      // console.log(localStorage.getItem("currentProfile"));
      
      const li = document.createElement("li");
      
      const a = document.createElement("a")
      a.href = `/profile?profile=${profile.name}`
      a.innerText = profile.name;
      
      const btnFollow = document.createElement("button")
      btnFollow.textContent = "Follow"
      btnFollow.addEventListener("click", () => onFollowProfile())


      const btnPosts = document.createElement("button")
      btnPosts.textContent = "View posts"

      li.append(a, btnFollow, btnPosts)
      
      return li;
    });

    document.getElementById("profilesAll").append(...list);
  } catch (error) {
    console.error(error);
  }
}
