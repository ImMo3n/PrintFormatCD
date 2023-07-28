<template>
    <div class="background-image position-absolute">
        <img src="http://192.168.0.23/plugin/JDS_Applications/img/sampleExperiment/MainWithoutSubtitle.jpg" alt="">
    </div>
</template>

<script>
    export default {
        name: 'LogoWatermark',
    }
</script>

<style>
    .background-image {
        right: 7%;
        top: 50%;
        transform: translateY(-50%);
        z-index: -1;
    }

    .background-image img {
        opacity: 0.02;
        height: 200%;
        width: 200%;
    }
</style>