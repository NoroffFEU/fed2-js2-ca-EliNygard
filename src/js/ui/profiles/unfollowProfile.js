import api from "../../api/instance.js";

export async function onUnfollowProfile(profile) {
    const unfollow = profile.name

    try {
        const profile = await api.profiles.unfollow(unfollow)

        alert(`You are not following ${unfollow} anymore.`)
        return profile
    } catch (error) {
        alert(error)
    } finally {
        // loader
    }
}