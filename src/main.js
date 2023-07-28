import { createApp } from 'vue'
import App from './App.vue'
import commonFunctions from './mixins/commonFunctions';
// import router from './router';

const app = createApp(App);
// .use(router);
app.mixin(commonFunctions);

app.mount('#app');
