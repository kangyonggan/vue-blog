<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left">
            <div class="toolbar">
                <Icon type="code-working" :size="28" color="#ddd" @click="formatXml"/>
            </div>
            <textarea class="xmlEditor" v-model="xml" placeholder="请粘贴待格式化的XML"></textarea>
        </AppPanel>

        <AppPanel :width="380" float="right" title="全部工具">
            <AllTools/>
        </AppPanel>
    </div>
</template>

<script>
    import AllTools from './AllTools';

    export default {
        components: {AllTools},
        data() {
            return {
                breadcrumbs: [{
                    name: '工具',
                    link: '/tools'
                }, {
                    name: 'XML格式化'
                }],
                xml: ''
            };
        },
        methods: {
            formatXml: function () {
                let format = require('xml-formatter');
                this.xml = format(this.xml);
            }
        }
    };
</script>

<style lang="less">
    @import "../../../my-theme/custom";

    .toolbar {
        height: 35px;
        background: @primary-color;
        padding: 5px 10px;

        i {
            cursor: pointer;
        }
    }

    .xmlEditor {
        width: 800px;
        height: 465px;
        border: 1px solid @primary-color;
        resize: none;
        outline: none;
        padding: 5px;
        color: #595959;

    }
</style>
