<template>
  <Error 
    v-if="this.errorMessage" 
    :errorMessage="this.errorMessage"
  />
  <NavPrint v-if="!this.errorMessage"  :isLoading="isLoading"/>
  <CustomerReceipt 
    v-if="!this.errorMessage"
    :sampleExperimentPDData="sampleExperimentPDData"
    @loaded="() => {this.isLoading = false}"
  />
</template>

<script>
  import NavPrint from './components/NavPrint.vue';
  import Error from './components/Error.vue';
  import CustomerReceipt from './components/CustomerReceipt/CustomerReceipt.vue';

  export default {
    name: 'App',
    components: {
      Error,
      CustomerReceipt,
      NavPrint,
    },
    data(){
      return {
        sampleExperimentPDData: {},
        errorMessage: '',
        isLoading: true,
      }
    },
    computed: {
      printObjective(){
        const url = new URL(window.location.href);
        const printObjective = url.searchParams.get("print");
        return (printObjective || '');
      },
    },
    methods: {
      getAppUID(){
        const url = new URL(window.location.href);
        const app_uid = url.searchParams.get("app_uid");
        if(!app_uid) this.errorMessage = 'شناسه کار (app_uid) یافت نشد.';
        return (app_uid || '');
      },
      async getSampleExperimentPDData(){
          const response = await fetch(`/api/1.0/workflow/JDS_Applications/GetSampleExperimentsPDData/${this.getAppUID()}`);
          if(response.ok === true) {
            const result = await response.json();
            this.sampleExperimentPDData = result;
          }
      }
    },
    created(){
      this.getSampleExperimentPDData();
    }
  }
</script>

<style>
  * {
    font-family: Nazanin, Vazirmatn, sans-serif;
  }

  .hidden{
    visibility: hidden;
  }

  body .border, body .border-bottom, body .border-top, body .border-start, body .border-end, body .table-bordered, body table{
    border-color: black !important;
  }

  @media print {
    @page {
        /* size: A4 portrait; */
        size: A4 portrait;
        margin: 5mm;
      }

    .position-fixed {
      display: none;
    }

    .print-btn-position, .no-print{
      display: none;
    }
  }
</style>

