<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left">
            <Form ref="form" :model="formItem" class="form" :rules="ruleValidate">
                <FormItem label="姓名（2~4个汉字）" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入您的姓名..." :clearable="true"></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit()">查询</Button>
                </FormItem>
            </Form>

            <div class="result" v-if="result.length">
                <dl v-for="item in result" :key="item[0]">
                    <dd>
                        <img :src="baseUrl + '/' + item[0]"/>
                    </dd>
                    <dt>{{item[1]}}</dt>
                </dl>
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
                    name: '电子印章'
                }],
                formItem: {
                    name: ''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'},
                        {validator: this.validateName, trigger: 'blur'}
                    ]
                },
                result: []
            };
        },
        methods: {
            validateName: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                let regExp = /^[\u4e00-\u9fa5]{2,4}$/;
                if (regExp.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入2~4个汉字'));
                }
            },
            handleSubmit: function () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.result = [];
                        this.http.post('/tools/seal', this.formItem).then(res => {
                            console.log(res);
                            this.result = res.data.result;
                        }).catch(res => {
                            this.error(res.respMsg);
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../my-theme/custom";

    .warning {
        font-size: 12px;
        margin-top: 5px;
        color: @primary-color;
        text-align: center;
        line-height: 50px;
    }

    .form {
        width: 500px;
        margin: 20px auto;
    }

    .result dl {
        float: left;
        width: 106px;
        text-align: center;
        padding: 0;
        margin: 25px 80px 0 80px;
    }

    .result dl dt, .result dl dd {
        padding: 0;
        margin: 0;
        font-size: 13px;
        color: #777;
        text-align: center;
    }

    .result img {
        width: 100px;
        height: 100px;
        margin: 3px;
    }
</style>
