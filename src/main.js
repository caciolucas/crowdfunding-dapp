import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";

import "primevue/resources/themes/arya-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";

// import "@fortawesome/fontawesome-free"
// import "@fortawesome/fontawesome-svg-core"
// import "@fortawesome/vue-fontawesome"

import "@fortawesome/fontawesome-free/css/all.css";

import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Divider from "primevue/divider";
import ProgressBar from "primevue/progressbar";
import TextArea from "primevue/textarea";
import Tag from "primevue/tag";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService); //

app.component("Card", Card);
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("Toast", Toast);
app.component("Divider", Divider);
app.component("ProgressBar", ProgressBar);
app.component("TextArea", TextArea);
app.component("Tag", Tag);

app.mount("#app");
