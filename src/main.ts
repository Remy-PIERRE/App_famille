import { createApp } from "vue";
import "./ui/styles/global.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/router";
import { localStoragePlugin } from "./stores/plug-in/localStorage";
import "./registerSW";
import { setupPWA } from "./registerSW";

const app = createApp(App);

const pinia = createPinia();
pinia.use(localStoragePlugin);
app.use(pinia);

setupPWA();

app.use(router);
app.mount("#app");
