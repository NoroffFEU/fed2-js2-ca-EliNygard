import { onLogout } from "../../ui/auth/logout";
import { viewPostsFollowing } from "../../ui/posts/viewPostsFollowing";
import { authGuard } from "../../utilities/authGuard";

authGuard();
viewPostsFollowing()


