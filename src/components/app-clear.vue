<template>
    <div :style="'clear: both;height:' + height + 'px;'">

    </div>
</template>

<script>
    import Vue from 'vue';

    const AppClear = {
        props: {
            height: {
                required: false,
                type: Number,
                default: 1
            }
        }
    };

    export default AppClear;

    Vue.component('AppClear', AppClear);
</script>

<style scoped lang="less">
</style>
