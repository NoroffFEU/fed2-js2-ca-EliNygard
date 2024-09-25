import { viewPostsByLoggedinProfile } from "../../ui/posts/viewPostsByLoggedinProfile";
import { authGuard } from "../../utilities/authGuard";

authGuard();

viewPostsByLoggedinProfile()
