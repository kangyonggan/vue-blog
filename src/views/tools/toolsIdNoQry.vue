<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left">
            <Form ref="form" :model="formItem" class="form" :rules="ruleValidate">
                <FormItem label="身份证号码（支持15位或18位身份证号码查询）" prop="idNo">
                    <Input v-model="formItem.idNo" placeholder="请输入身份证号码..."></Input>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit()">查询</Button>
                </FormItem>
            </Form>

            <div class="result">
                <table>
                    <tbody>
                    <tr>
                        <td class="first">身份证号码（18位）</td>
                        <td>{{result.idNo}}</td>
                    </tr>
                    <tr>
                        <td class="first">原户籍地</td>
                        <td>{{result.address}}</td>
                    </tr>
                    <tr>
                        <td class="first">出生年月</td>
                        <td>{{result.birthday}}</td>
                    </tr>
                    <tr>
                        <td class="first">性　　别</td>
                        <td>{{result.gender === 1 ? '女' : (result.gender === 0 ? '男' : '')}}</td>
                    </tr>
                    <tr>
                        <td class="first">生　　肖</td>
                        <td>{{result.shengXiao}}</td>
                    </tr>
                    <tr>
                        <td class="first">星　　座</td>
                        <td>{{result.xingZuo}}</td>
                    </tr>
                    </tbody>
                </table>
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
                    name: '身份证查询'
                }],
                formItem: {
                    idNo: ''
                },
                ruleValidate: {
                    idNo: [
                        {required: true, message: '身份证号码不能为空', trigger: 'blur'},
                        {validator: this.validateIdNo, trigger: 'blur'}
                    ]
                },
                result: {}
            };
        },
        methods: {
            validateIdNo: function (rule, value, callback) {
                if (!value) {
                    callback();
                    return;
                }

                this.http.post('/validate/idNo', {idNo: value}).then(() => {
                    callback();
                }).catch(res => {
                    callback(new Error(res.respMsg));
                });
            },
            handleSubmit: function () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.result = {};
                        this.http.post('/tools/idNoQry', this.formItem).then(res => {
                            this.result = res.data;
                        }).catch(res => {
                            this.error(res.respMsg);
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less">
    @import "../../../my-theme/custom";

    .form {
        width: 500px;
        margin: 20px auto;
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
</style>
