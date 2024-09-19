import "./css/style.css";

import router from "./js/router/index.js";
// import api from "./js/api/instance.js";

await router(window.location.pathname);

// Test logging in with a test user:
// const user = {
//     name: "fakeuserr",
//     email: "fakee@stud.noroff.no",
//     password: "fakee1234"
//  }
// await api.auth.login({ email: user.email, password: user.password})
