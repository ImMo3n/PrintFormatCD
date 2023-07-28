<template>
    <span 
        class="display-if-input-not-empty"
        :class="{'no-print': this.data.length === 0}"
        >&#160;{{InputLabel}}&#160;</span>
    <span class="no-print">&#160;
        <input v-if="type === 'text'" type="text" v-model="data"/>
        <textarea v-if="type === 'textarea'" cols="20" rows="3" v-model="data"/> 
        &#160;
    </span>
    <span class="display-only-print">&#160;{{data}}&#160;</span>
</template>

<script>
    export default {
        name: 'OptionalInput',
        props: {
            InputLabel: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: 'text',
            }
        },
        data(){
            return {
                data: '',
            }
        }
    }
</script>

<style scoped>
    span{
        font-size: 14px;
    }

    .display-only-print{
        display: none;
    }

    /* @media print {
        .no-print {
            display: none;
        }

        .display-only-print{
            display: initial;
        }
    } */
</style>