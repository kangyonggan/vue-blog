<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left">
            <div id="jsonEditor" style="width: 800px; height: 500px;"></div>
        </AppPanel>

        <AppPanel :width="380" float="right" title="全部工具">
            <AllTools/>
        </AppPanel>
    </div>
</template>

<script>
    import AllTools from './AllTools';
    import JsonEditor from 'jsoneditor';
    import 'jsoneditor/dist/jsoneditor.css';

    export default {
        components: {AllTools},
        data() {
            return {
                breadcrumbs: [{
                    name: '工具',
                    link: '/tools'
                }, {
                    name: 'JSON格式化'
                }]
            };
        },
        mounted() {
            let container = document.getElementById('jsonEditor');
            let options = {
                mode: 'code',
                onError: function (err) {
                    this.error(err.toString());
                }
            };
            let codeEditor = new JsonEditor(container, options);
            let json = {
                'Array': [1, 2, 3],
                'Boolean': true,
                'Null': null,
                'Number': 123,
                'Object': {'a': 'b', 'c': 'd'},
                'String': 'Hello World'
            };

            codeEditor.set(json);
        }
    };
</script>

