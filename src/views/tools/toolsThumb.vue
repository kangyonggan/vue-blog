<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left" style="text-align: center">
            <Form :model="sizeData" class="size-form">
                宽度：<InputNumber :min="1" v-model="sizeData.width"/>
                高度：<InputNumber :min="1" v-model="sizeData.height"/>
            </Form>
            <Upload
                :before-upload="handleBeforeUpload"
                type="drag"
                action=""
                style="margin: 30px auto;width: 400px;">
                <div style="padding: 50px 0;">
                    <Icon type="ios-cloud-upload" size="52" class="upload-icon"></Icon>
                    <p>点击此处或拖拽上传</p>
                </div>
            </Upload>

            <img :src="thumb" v-if="thumb" class="bigAvatar">
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
                    name: '生成缩略图'
                }],
                thumb: '',
                sizeData: {
                    width: 400,
                    height: 300
                }
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
                formData.append('width', this.sizeData.width || '400');
                formData.append('height', this.sizeData.height || '300');
                this.http.postUpload('/tools/thumb', formData).then(res => {
                    this.thumb = this.baseUrl + '/' + res.data.thumb;
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

    .size-form {
        width: 500px;
        margin: 0 auto;
        margin-top: 20px;
    }
</style>
