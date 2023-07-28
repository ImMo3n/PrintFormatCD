<template>
    <div class="alert alert-danger text-center" role="alert">
        <h4>متاسفانه خطایی رخ داده.</h4>
        <p>{{this.errorMessage}}</p>
    </div>
</template>

<script>
export default {
    name: 'Error',
    props: ['errorMessage']
}
</script>