<template>
    <nav 
        class="navbar navbar-expand-lg navbar-light bg-light no-print"
    >
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="p-0 navbar-nav">
                <li class="nav-item">
                    <a 
                        :href="`/sysworkflow/fa/modern/JDS_Applications/public_html/pages/sampleExperimentPDSample.php?app_uid=${this.getAppUID()}`" 
                        class="btn">
                        دریافت و خروج نمونه
                    </a>
                </li>
                <li class="nav-item">
                    <a 
                        :href="`/sysworkflow/fa/modern/JDS_Applications/public_html/pages/sampleExperimentPDReceipt.php?app_uid=${this.getAppUID()}`"  
                        class="btn active">
                        رسید مشتری
                    </a>
                </li>
                <li class="nav-item">
                    <a 
                        :href="`/sysworkflow/fa/modern/JDS_Applications/public_html/pages/sampleExperimentPDResult.php?app_uid=${this.getAppUID()}`"  
                        class="btn">
                        نتیجه
                    </a>
                </li>
            </ul>
            <button @click="this.print" class="btn btn-info " v-if="!isLoading">
            <span >پرینت</span>
                </button>
                <div v-else class="spinner-border spinner-border-sm" role="status">
                    <span class="sr-only"></span>
                </div>
        </div>
        
    </nav>
</template>

<script>
    export default {
        name: 'NavPrint',
        props: ['isLoading'],
        methods: {
            print(){
                window.print();
            },
            getAppUID(){
            const url = new URL(window.location.href);
            const app_uid = url.searchParams.get("app_uid");
            return (app_uid || '');
            }
        },
    };
</script>

<style scoped>
    .active{
        border-radius: 0;
        border-bottom: 1px solid black;
    }
</style>
