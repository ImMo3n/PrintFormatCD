<template>
  <ReceiptFormat :sampleExperimentPDData="this.sampleExperimentPDData">
      <tr v-for="({SAMPLE_KIND_label, SAMPLE_MODEL_label, SAMPLE_ACCESSORIES_label, SAMPLE_UUID}, index) in samples" :key="SAMPLE_UUID">
        <td :data-sample-index="index" class="border-end-0">{{this.toPersian(index + 1)}}</td>
        <td>{{SAMPLE_KIND_label}}</td>
        <td>{{SAMPLE_MODEL_label}}</td>
        <td class="border-start-0">{{SAMPLE_ACCESSORIES_label}}</td>
      </tr>
  </ReceiptFormat>
</template>

<script>
    import ReceiptFormat from './ReceiptFormat.vue';
    export default {
        name: 'CustomerReciept',
        props: ['sampleExperimentPDData'],
        computed: {
            samples(){
                if(this.sampleExperimentPDData.SAMPLES){
                    return Object.values(this.sampleExperimentPDData.SAMPLES);
                }
            },
        },
        components: {
            ReceiptFormat,
        },
    }
</script>




