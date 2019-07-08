<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left">
            <Form ref="form" :model="formItem" class="form" :rules="ruleValidate">
                <FormItem prop="isLunar">
                    <RadioGroup v-model="formItem.isLunar">
                        <Radio label="阳历"></Radio>
                        <Radio label="阴历"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="出生日期" prop="birthday">
                    <DatePicker v-model="formItem.birthday" type="date" placeholder="请选择出生日期"
                                style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="出生时辰" prop="hour">
                    <Select v-model="formItem.hour" placeholder="请选择出生时辰..." :clearable="true">
                        <Option :label="(hour-1) + '点~' + (hour%23) + '点（不包含' + (hour%23) + '点）'" v-for="hour in 24"
                                :value="hour-1" :key="hour">
                            <span>{{hour-1}}点~{{hour%24}}点（不包含{{hour%24}}点）</span>
                        </Option>
                    </Select>
                </FormItem>

                <FormItem>
                    <Button type="primary" @click="handleSubmit()">计算</Button>
                </FormItem>
            </Form>

            <div class="result" v-show="result.baZi">
                <table>
                    <tbody>
                    <tr>
                        <td class="first">阳历出生日期</td>
                        <td>{{result.birthday}}</td>
                    </tr>
                    <tr>
                        <td class="first">八　　字</td>
                        <td>{{result.baZi}}</td>
                    </tr>
                    <tr>
                        <td class="first">五　　行</td>
                        <td>{{result.wuXing}}</td>
                    </tr>
                    <tr>
                        <td class="first">生　　肖</td>
                        <td>{{result.shengXiao}}</td>
                    </tr>
                    <tr>
                        <td class="first">星　　座</td>
                        <td>{{result.xingZuo}}</td>
                    </tr>
                    <tr>
                        <td class="first">五行强弱</td>
                        <td>{{result.que}}</td>
                    </tr>
                    <tr>
                        <td class="first">喜　　忌</td>
                        <td>{{result.yuShi}}</td>
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
                    name: '五行、八字'
                }],
                formItem: {
                    isLunar: '阳历',
                    birthday: '',
                    hour: ''
                },
                ruleValidate: {
                    birthday: [
                        {required: true, message: '出生日期不能为空'}
                    ],
                    hour: [
                        {required: true, message: '出生时辰不能为空'}
                    ]
                },
                result: {}
            };
        },
        methods: {
            handleSubmit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    let date = this.dateFormat(this.formItem.birthday.getTime(), 'yyyy-MM-dd');
                    let arr = date.split('-');
                    this.http.post('/tools/bazi', {
                        year: arr[0],
                        month: arr[1],
                        day: arr[2],
                        hour: this.formItem.hour,
                        isLunar: this.formItem.isLunar === '阴历'
                    }).then(res => {
                        this.result = res.data;
                    }).catch(res => {
                        this.error(res.respMsg);
                    });
                });
            }
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
