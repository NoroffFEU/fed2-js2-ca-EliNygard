import api from "../../api/instance.js";
import { onFollowProfile } from "./followProfile.js";
import { onUnfollowProfile } from "./unfollowProfile.js";

export async function viewProfiles() {
  try {
    const profiles = await api.profiles.readAllProfiles();

    const list = profiles.map((profile) => {
            
      const li = document.createElement("li");
      
      const a = document.createElement("a")
      a.href = `/profile?profile=${profile.name}`
      a.innerText = profile.name;
      
      const btnFollow = document.createElement("button")
      btnFollow.textContent = "Follow"
      btnFollow.addEventListener("click", () => onFollowProfile(profile))

      const btnUnfollow = document.createElement("button")
      btnUnfollow.textContent = "Unfollow"
      btnUnfollow.addEventListener("click", () => onUnfollowProfile(profile))

      const btnPosts = document.createElement("button")
      btnPosts.textContent = "View posts"

      li.append(a, btnFollow, btnUnfollow, btnPosts)
      
      return li;
    });

    document.getElementById("profilesAll").append(...list);
  } catch (error) {
    console.error(error);
  }
}
