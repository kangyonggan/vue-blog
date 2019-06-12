<template>
    <span>
       <Icon type="ios-star" :size="size" v-for="i in length" :key="i"/>
    </span>
</template>

<script>
    export default {
        props: {
            length: {
                type: Number,
                required: true
            },
            size: {
                type: Number,
                default: 18
            }
        }
    };
</script>

<style scoped lang="less">
    @primary-color: #2d8cf0;

    i {
        color: @primary-color;
        float: right;
        margin-top: 12px;
    }
</style>
