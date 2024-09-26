import { viewPostsByLoggedinProfile } from "../../ui/posts/viewPostsByLoggedinProfile";
import { authGuard } from "../../utilities/authGuard";
import api from "../../api/instance.js";

authGuard();

viewPostsByLoggedinProfile()




