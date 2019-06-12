<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left">
            <Form ref="form" :model="formItem" class="form">
                <FormItem label="省份" prop="prov">
                    <Select v-model="formItem.prov" placeholder="请选择省份..." clearable filterable>
                        <Option :label="prov.value" v-for="prov in provs" :value="prov.dictCode" :key="prov.dictCode">
                            <span>{{prov.value}}</span>
                            <span style="float:right;color:#ccc">{{prov.dictCode}}</span>
                        </Option>
                    </Select>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit()">生成</Button>
                </FormItem>
            </Form>

            <div class="result" v-if="result.length">
                <table>
                    <thead>
                    <tr>
                        <th colspan="4">
                            身份证生成结果
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="i in Math.floor((result.length - 1) / 4) + 1" :key="i">
                        <td v-for="j in 4" :key="j" v-if="(i - 1) * 4 + j - 1 < result.length">
                            {{result[(i - 1) * 4 + j - 1]}}
                        </td>
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
                    name: '生成身份证'
                }],
                formItem: {
                    idNo: ''
                },
                provs: [],
                result: []
            };
        },
        methods: {
            handleSubmit: function () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.http.post('/tools/idNoGen', this.formItem).then(res => {
                            this.result = res.data.idNos;
                        }).catch(res => {
                            this.error(res.respMsg);
                        });
                    }
                });
            }
        },
        mounted() {
            this.http.post('/api/dict', {dictType: 'PROV'}).then(res => {
                this.provs = res.data.dicts;
            }).catch(res => {
                this.error(res.respMsg);
            });
        }
    };
</script>

<style lang="less" scoped>
    @primary-color: #2d8cf0;

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

    .result {
        width: 700px;
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

    .result table tr th {
        background: #f5f6f8;
        text-align: center;
        line-height: 40px;
    }
</style>
