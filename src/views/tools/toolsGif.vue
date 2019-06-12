<template>
    <div>
        <AppBreadcrumb :list="breadcrumbs"/>

        <AppPanel :width="800" float="left" style="text-align: center">
            <Form :model="sizeData" class="size-form">
                GIF宽度：
                <InputNumber :min="100" :max="1000" v-model="sizeData.width"/>
                <span style="margin-left: 30px;">GIF高度：</span>
                <InputNumber :min="100" :max="1000" v-model="sizeData.height"/>

                <AppClear :height="10"/>

                <div class="frame" v-for="(frame, index) in frameList" :key="index">
                    <img v-show="frame.img" :src="frame.img" @click="selectFile($event)"/>
                    <div v-show="!frame.img" class="file-label" @click="selectFile($event)">第{{index + 1}}帧</div>
                    <div v-show="frame.img" :style="{color: frame.color}" class="text black"
                         @click="selectFile($event)">{{frame.text}}
                    </div>
                    <input type="file" class="hidden" @change="imgChange($event, index)"/>
                    <input v-model="frame.text" type="text" class="imgText" :placeholder="'第' + (index + 1) + '帧的字幕'"/>
                    <ColorPicker v-model="frame.color" class="font-color" recommend/>
                </div>

                <div class="more" @click="addFrame">
                    <Icon type="android-add-circle" :size="60"/>
                </div>

                <AppClear :height="20"/>
                <FormItem>
                    <Button type="primary" @click="handleSubmit()">开始制作</Button>
                </FormItem>

                <canvas class="hidden" id="canvas" :width="sizeData.width" :height="sizeData.height"></canvas>

                <img v-show="result" :src="result"
                     :style="{width: sizeData.width + 'px', height: sizeData.height + 'px'}" class="resultImg">

                <AppClear :height="20"/>
            </Form>
        </AppPanel>

        <AppPanel :width="380" float="right" title="全部工具">
            <AllTools/>
        </AppPanel>
    </div>
</template>

<script>
    import AllTools from './AllTools';
    import $ from 'jquery';

    window.jQuery = $;
    import GIF from '../../libs/gif/gif';

    export default {
        components: {AllTools},
        data() {
            return {
                breadcrumbs: [{
                    name: '工具',
                    link: '/tools'
                }, {
                    name: '制作GIF'
                }],
                sizeData: {
                    width: 230,
                    height: 160
                },
                frameList: [{
                    img: '',
                    text: '',
                    color: '#fff'
                }, {
                    img: '',
                    text: '',
                    color: '#fff'
                }],
                result: ''
            };
        },
        methods: {
            handleSubmit: function () {
                for (let i = 0; i < this.frameList.length; i++) {
                    if (!this.frameList[i].img) {
                        this.warning('请选择第' + (i + 1) + '帧的图片');
                        return;
                    }
                }

                let canvas = document.getElementById('canvas');
                let ctx = canvas.getContext('2d');

                let gif = new GIF({
                    workers: this.frameList.length,
                    quality: 30,
                    workerScript: '/static/libs/gif/gif.worker.js'
                });
                let that = this;
                gif.on('finished', function (blob) {
                    let file = new FileReader();
                    file.readAsDataURL(blob);
                    file.onload = function () {
                        that.result = file.result;
                    };
                });

                let count = 0, imgObjList = [];

                for (let i = 0; i < this.frameList.length; i++) {
                    let tmpImg = new Image();
                    tmpImg.src = this.frameList[i].img;
                    imgObjList.push(tmpImg);
                    tmpImg.onload = function () {
                        count++;
                        if (count === that.frameList.length) {
                            that.generateGif(gif, imgObjList, ctx, canvas);
                        }
                    };
                }
            },
            generateGif: function (gif, imgObjList, ctx, canvas) {
                for (let i = 0; i < imgObjList.length; i++) {
                    ctx.save();
                    ctx.drawImage(imgObjList[i], 0, 0, canvas.width, canvas.height);

                    let title = this.frameList[i].text;

                    if (title) {
                        ctx.font = '14px 宋体';
                        ctx.fillStyle = this.frameList[i].color;
                        ctx.textAlign = 'center';
                        ctx.fillText(title, this.sizeData.width / 2, this.sizeData.height - 10);
                    }

                    ctx.restore();
                    gif.addFrame(canvas, {copy: true, delay: 1500});
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                gif.render();
            },
            addFrame: function () {
                this.frameList.push({
                    img: '',
                    text: '',
                    color: '#fff'
                });
            },
            selectFile: function (e) {
                e.preventDefault();
                e.target.parentNode.childNodes[6].click();
                return false;
            },
            imgChange: function (e, index) {
                e.preventDefault();
                let pic = e.target.files[0];
                // 校验
                if (!this.validPic(pic)) {
                    return;
                }

                // 图片预览
                let file = new FileReader();
                file.readAsDataURL(pic);

                let that = this;
                file.onload = function () {
                    that.frameList[index].img = this.result;
                };
                return false;
            },
            validPic: function (pic) {
                if (!pic) {
                    return false;
                }

                // 格式校验
                let ext = pic.name.substring(pic.name.lastIndexOf('.') + 1).toLowerCase();
                if ('jpeg,jpg,png'.indexOf(ext) === -1) {
                    this.warning('请选择 png、jpeg、jpg 格式的图片文件');
                    return false;
                }
                return true;
            }
        }
    };
</script>

<style lang="less" scoped>
    @primary-color: #2d8cf0;

    .size-form {
        margin-top: 20px;
    }

    .hidden {
        display: none;
    }

    .frame {
        margin: 18px;
        float: left;
        width: 230px;
        height: 210px;
        cursor: pointer;
        position: relative;

        input[type=text] {
            display: block;
            width: 166px;
            height: 32px;
            line-height: 32px;
            box-sizing: border-box;
            outline: none;
            font-size: 14px;
            padding: 4px 10px;
            margin-right: 10px;
            margin-top: 3px;
            background: rgba(0, 0, 0, 0.2);
            background: #fff;
            border: 1px solid #aaa;
            color: #333;
        }
    }

    .frame img {
        width: 230px;
        height: 160px;
    }

    .frame .file-label {
        border: 1px dashed #ccc;
        border-radius: 8px;
        width: 230px;
        height: 160px;
        text-align: center;
        line-height: 160px;
        color: #999;
    }

    .frame .font-color {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .frame .file-label:hover {
        color: @primary-color;
        border: 1px dashed @primary-color;
    }

    .frame div.text {
        position: absolute;
        bottom: 60px;
        left: 10px;
        width: 210px;
        overflow: hidden;
        font-size: 14px;
        text-align: center;
    }

    .imgText {
        position: absolute !important;
        bottom: 0;
        left: 0;
    }

    .more {
        margin: 18px;
        float: left;
        width: 230px;
        height: 160px;
        border: 1px dashed #ccc;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
        line-height: 160px;
    }

    .more:hover {
        border: 1px dashed @primary-color;
    }

    .more i {
        margin-top: 50px;
    }

    .resultImg {
        max-width: 100%;
    }
</style>
