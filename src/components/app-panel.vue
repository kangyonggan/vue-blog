<template>
    <div :class="'panel ' + (float ? (float==='right'?'pull-right':'pull-left'):'')" :style="'width: ' + (width ? width + 'px' : '100%')">
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
            float: {
                required: false,
                type: String,
                validator (value) {
                    return oneOf(value, ['left', 'right']);
                }
            }
        }
    };

    export default AppPanel;

    Vue.component('AppPanel', AppPanel);
</script>

<style scoped lang="less">
    .panel {
        background: #fff;
        padding: 30px;
    }
</style>
