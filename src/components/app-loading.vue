<template>
    <div v-if="loading" class="loading" :style="'height:' + height + 'px'">
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
            },
            height: {
                type: Number,
                default: 260
            }
        }
    };

    export default AppLoading;

    Vue.component('AppLoading', AppLoading);
</script>

<style scoped lang="less">
    .loading {
        position: relative;
    }
</style>
