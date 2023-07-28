<template>
<header class="pb-3 position-relative">
  <div class="position-absolute px-2 pb-1 border rounded header-watermark">معتبر</div>
  <div class="d-flex justify-content-between border">
    <div class="col-1">
      <img class="p-1" src="http://192.168.0.23/plugin/JDS_Applications/img/sampleExperiment/MainWithoutSubtitle.jpg" alt="لوگو بارگذاری نشد.">
    </div>
    <div class="col d-flex justify-content-center align-items-center">
      <h1 class="fw-bold text-center m-0">رسید مشتری</h1>
    </div>
    <div class="col-2">
      <div class="row">
        <div class="col">
          <span>کد سند: </span>
          <span>SESF-704-01</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span>تاریخ انتشار: </span>
          <span>{{this.padDate(this.getPersianDate())}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span>شماره بازنگری: </span>
          <span>۰۸</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span>صفحه: </span>
          <span><span data-page-number></span> از <span data-page-number-all></span></span>
        </div>
      </div>
    </div>
  </div>
</header>
</template>

<script>
    export default {
        name: 'ReceiptHeader',
    }
</script>

<style scoped>
  img {
    width: 100px;
  }

  span {
    font-size: 13px;
  }

  .header-watermark{
    left: 200px;
    top: 20px;
    rotate: 354deg;
  }
</style>