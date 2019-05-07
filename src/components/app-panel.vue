<template>
    <div :class="' panel ' + (float ? (float==='right'?'pull-right':'pull-left'):'')" :style="'width: ' + (width ? width + 'px' : '100%')">
        <div class="panel-title" v-if="title" :style="'text-align: ' + titleAlign">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { oneOf } from 'iview/src/utils/assist';

    const AppPanel = {
        props: {
            width: {
                required: false,
                type: Number
            },
            title: {
                required: false,
                type: String
            },
            float: {
                required: false,
                type: String,
                validator (value) {
                    return oneOf(value, ['left', 'right']);
                }
            },
            titleAlign: {
                required: false,
                type: String,
                default: 'left',
                validator (value) {
                    return oneOf(value, ['left', 'center', 'right']);
                }
            }
        }
    };

    export default AppPanel;

    Vue.component('AppPanel', AppPanel);
</script>

<style scoped lang="less">
    @import "../../my-theme/custom";

    .panel {
        background: #fff;

        &-title {
            color: #000;
            padding: 10px;
            font-weight: 500;
            font-size: 18px;
            border-bottom: 2px solid @primary-color;
        }
    }
</style>
