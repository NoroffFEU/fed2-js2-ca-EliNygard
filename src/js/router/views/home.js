import { onLogout } from "../../ui/auth/logout";
import { viewPostsAll } from "../../ui/posts/viewPostsAll";
import { viewProfiles } from "../../ui/profile/viewProfiles";
import { authGuard } from "../../utilities/authGuard";

authGuard();
onLogout()
viewPostsAll()
viewProfiles()
