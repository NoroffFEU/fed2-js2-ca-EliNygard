import "./css/style.css";

import router from "./js/router/index.js";
import SocialAPI from "./js/api/index.js"

await router(window.location.pathname);

const api = new SocialAPI()


const user = {
    name: "fakeuserr",
    email: "fakee@stud.noroff.no",
    password: "fakee1234"
}

// await api.auth.register(user)

await api.auth.login({ email: user.email, password: user.password})


// after creating social/post in class - test create, update, read, delete 

