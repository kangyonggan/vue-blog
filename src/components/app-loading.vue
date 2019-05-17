<template>
    <div v-if="loading" class="loading">
        <Spin size="large" fix></Spin>
    </div>
</template>

<script>
    import Vue from 'vue';

    const AppLoading = {
        props: {
            loading: {
                required: true,
                type: Boolean
            }
        }
    };

    export default AppLoading;

    Vue.component('AppLoading', AppLoading);
</script>

<style scoped lang="less">
    .loading {
        height: 260px;
        position: relative;
    }
</style>
