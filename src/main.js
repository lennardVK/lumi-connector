import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMqtt from 'vue-mqtt';

Vue.use(VueMqtt, 'ws://iot.eclipse.org/ws', options);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");