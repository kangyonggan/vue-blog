export default {
    respCo: '0000',
    respMsg: '成功',
    data: {
        article: {
            'articleId': 1,
            'title': '前后分离的系统统一加解密',
            'categoryCode': 'java',
            'categoryName': 'Java',
            'createdTime': 1556090343602,
            'content': '\n' +
                '### 实现原理\n' +
                '主要使用transform的rotate属性，将线条组合成Loading图形 (也就是菊花图形)。\n' +
                '\n' +
                'animation实现将线条颜色由浅到深，再由深到浅来回变换的动画，通过animation-delay属性来使颜色的变换产生过渡的效果，从而达到类似于Loading动画的效果。\n' +
                '\n' +
                '### html代码\n' +
                '```\n' +
                '<div class="loading">\n' +
                '    <span class="line1"></span>\n' +
                '    <span class="line2"></span>\n' +
                '    <span class="line3"></span>\n' +
                '    <span class="line4"></span>\n' +
                '    <span class="line5"></span>\n' +
                '    <span class="line6"></span>\n' +
                '    <span class="line7"></span>\n' +
                '    <span class="line8"></span>\n' +
                '</div>\n' +
                '```\n' +
                '\n' +
                '<!-- more -->\n' +
                '\n' +
                '### css代码\n' +
                '```\n' +
                '.loading {\n' +
                '    position: fixed;\n' +
                '    top: 0;\n' +
                '    right: 0;\n' +
                '    bottom: 0;\n' +
                '    left: 0;\n' +
                '    width: 80px;\n' +
                '    height: 80px;\n' +
                '    margin: auto;\n' +
                '    z-index: 9999;\n' +
                '}\n' +
                '\n' +
                '.loading span {\n' +
                '    width: 4px;\n' +
                '    height: 20px;\n' +
                '    background-color: #ccc;\n' +
                '    position: absolute;\n' +
                '    left: 38px;\n' +
                '    -webkit-animation: loading 1s infinite;\n' +
                '}\n' +
                '\n' +
                '.loading .line1 {\n' +
                '    background-color: #000;\n' +
                '    -webkit-transform: rotate(0deg);\n' +
                '    transform: rotate(0deg);\n' +
                '    -webkit-animation-delay: .3s;\n' +
                '}\n' +
                '\n' +
                '.loading .line2 {\n' +
                '    top: 5px;\n' +
                '    left: 52px;\n' +
                '    -webkit-transform: rotate(45deg);\n' +
                '    transform: rotate(45deg);\n' +
                '    -webkit-animation-delay: .4s;\n' +
                '}\n' +
                '\n' +
                '.loading .line3 {\n' +
                '    top: 18px;\n' +
                '    left: 57px;\n' +
                '    -webkit-transform: rotate(90deg);\n' +
                '    transform: rotate(90deg);\n' +
                '    -webkit-animation-delay: .5s;\n' +
                '}\n' +
                '\n' +
                '.loading .line4 {\n' +
                '    top: 31px;\n' +
                '    left: 52px;\n' +
                '    -webkit-transform: rotate(135deg);\n' +
                '    transform: rotate(135deg);\n' +
                '    -webkit-animation-delay: .6s;\n' +
                '}\n' +
                '\n' +
                '.loading .line5 {\n' +
                '    top: 37px;\n' +
                '    -webkit-animation-delay: .7s;\n' +
                '}\n' +
                '\n' +
                '.loading .line6 {\n' +
                '    top: 32px;\n' +
                '    left: 24px;\n' +
                '    -webkit-transform: rotate(-135deg);\n' +
                '    transform: rotate(-135deg);\n' +
                '    -webkit-animation-delay: .8s;\n' +
                '}\n' +
                '\n' +
                '.loading .line7 {\n' +
                '    top: 18px;\n' +
                '    left: 19px;\n' +
                '    -webkit-transform: rotate(-90deg);\n' +
                '    transform: rotate(-90deg);\n' +
                '    -webkit-animation-delay: .9s;\n' +
                '}\n' +
                '\n' +
                '.loading .line8 {\n' +
                '    top: 5px;\n' +
                '    left: 24px;\n' +
                '    -webkit-transform: rotate(-45deg);\n' +
                '    transform: rotate(-45deg);\n' +
                '    -webkit-animation-delay: 1s;\n' +
                '}\n' +
                '\n' +
                '@-webkit-keyframes loading {\n' +
                '    0% {\n' +
                '        background-color: #ccc;\n' +
                '    }\n' +
                '    50% {\n' +
                '        background-color: #000;\n' +
                '    }\n' +
                '    100% {\n' +
                '        background-color: #ccc;\n' +
                '    }\n' +
                '}\n' +
                '```\n' +
                '\n' +
                '### 效果图\n' +
                '\n' +
                '![](https://ws3.sinaimg.cn/large/006tNc79ly1g2w0mk6nkzg306y03mwex.gif)\n'
        }
    }
};
