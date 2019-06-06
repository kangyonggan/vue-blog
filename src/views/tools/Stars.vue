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
    @import "../../../my-theme/custom";

    i {
        color: @primary-color;
        float: right;
        margin-top: 12px;
    }
</style>
