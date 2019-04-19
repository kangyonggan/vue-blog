<template>
    <div class="divider-container">
        <div class="divider">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    const AppDivider = {};

    export default AppDivider;

    Vue.component('AppDivider', AppDivider);
</script>

<style scoped lang="less">
    .divider-container {
        height: 20px;
        clear: both;
        position: relative;
        text-align: center;
    }

    .divider {
        position: absolute;
        left: 0;
        top: 10px;
        right: 0;
        height: 1px;
        z-index: 0;
        background: #eee;
    }
</style>
