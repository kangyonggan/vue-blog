<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left" style="text-align: center">
            <Upload
                :before-upload="handleBeforeUpload"
                type="drag"
                action=""
                style="margin: 30px auto;width: 400px;">
                <div style="padding: 50px 0;">
                    <Icon type="ios-cloud-upload" size="52" class="upload-icon"></Icon>
                    <p>点击此处或拖拽到此处解析</p>
                </div>
            </Upload>
            <div class="result">
                <table>
                    <tbody>
                    <tr>
                        <td class="first">图片宽度</td>
                        <td>
                            <span v-show="result.width">
                                {{result.width}}px
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="first">图片高度</td>
                        <td>
                            <span v-show="result.height">
                                {{result.height}}px
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="first">图片名称</td>
                        <td>{{result.name}}</td>
                    </tr>
                    <tr>
                        <td class="first">图片大小</td>
                        <td>
                            <span v-show="result.size">
                                {{(result.size / 1000).toFixed(2)}}KB
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="first">设　　备</td>
                        <td>{{result.make}}</td>
                    </tr>
                    <tr>
                        <td class="first">型　　号</td>
                        <td>{{result.model}}</td>
                    </tr>
                    <tr>
                        <td class="first">版　　本</td>
                        <td>{{result.version}}</td>
                    </tr>
                    <tr>
                        <td class="first">经　　度</td>
                        <td>{{result.longitude}}</td>
                    </tr>
                    <tr>
                        <td class="first">维　　度</td>
                        <td>{{result.latitude}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="warning">仅供学习使用，违法自负！</div>
            </div>
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
                    name: '图片解析'
                }],
                result: {}
            };
        },
        methods: {
            checkFile: function (file) {
                if (!file) {
                    this.warning('请选择文件');
                    return false;
                }

                const index = file.name.lastIndexOf('.');
                const extErr = '文件类型错误，请选择jpg、jpeg或者png的图片';
                if (index < 0) {
                    this.warning(extErr);
                    return false;
                }
                const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLocaleLowerCase();
                const allowExts = 'jpg,jpeg,png';
                if (allowExts.indexOf(ext) < 0) {
                    this.warning(extErr);
                    return false;
                }

                if (file.size > 1024 * 1024 * 2) {
                    this.warning('文件太大, 请不要超过2M');
                    return false;
                }

                return true;
            },
            handleBeforeUpload: function (file) {
                if (!this.checkFile(file)) {
                    return false;
                }
                let formData = new FormData();
                formData.append('file', file);
                this.result = {};
                this.http.postUpload('/tools/parseImg', formData).then(res => {
                    this.result = res.data.resultMap;
                    console.log(this.result);
                }).catch(res => {
                    this.error(res.respMsg);
                });
                return false;
            }
        }
    };
</script>

<style lang="less" scoped>
    @primary-color: #2d8cf0;

    .upload-icon {
        color: @primary-color;
    }

    .result {
        width: 600px;
        margin: 20px auto;
    }

    .result table {
        width: 100%;
        color: #333333;
        border-collapse: collapse;
        border: 1px solid #ccc;
    }

    .result table tr td {
        border: 1px solid #d5d5d5;
        padding: 8px;
        font-size: 14px;
    }

    .result table tr td.first {
        background: #f5f6f8;
        text-align: center;
        width: 170px;
    }

    .warning {
        font-size: 12px;
        margin-top: 5px;
        color: @primary-color;
        text-align: center;
        line-height: 50px;
    }

</style>
