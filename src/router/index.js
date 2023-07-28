import { createRouter, createWebHistory } from 'vue-router';

import ExperimentResult from '@/components/ExperimentResult/ExperimentResult.vue';
import CustomerReceipt from '@/components/CustomerReceipt/CustomerReceipt.vue';

const routes = [
    {path: '/receipt', name: 'receipt', component: CustomerReceipt},
    {path: '/result', name: 'result', component: ExperimentResult}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;