<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left">
            <div class="toolbar">
                <Icon type="code-working" :size="28" color="#ddd" @click="formatSQL"/>
            </div>
            <textarea class="sqlEditor" v-model="sql" placeholder="请粘贴待格式化的SQL语句"></textarea>
        </AppPanel>

        <AppPanel :width="380" float="right" title="全部工具">
            <AllTools/>
        </AppPanel>
    </div>
</template>

<script>
    import AllTools from './AllTools';
    import sqlFormatter from "sql-formatter";

    export default {
        components: {AllTools},
        data() {
            return {
                breadcrumbs: [{
                    name: '工具',
                    link: '/tools'
                }, {
                    name: 'SQL格式化'
                }],
                sql: ''
            };
        },
        methods: {
            formatSQL: function () {
                this.sql = sqlFormatter.format(this.sql);
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

    .sqlEditor {
        width: 800px;
        height: 465px;
        border: 1px solid @primary-color;
        resize: none;
        outline: none;
        padding: 5px;
        color: #595959;

    }
</style>
