<template>
  <view>
    <view class="weui-cells__title">{{weatherData.queryName}}30天天气</view>
    <view class="weui-cells weui-cells_after-title">
        <view  class="weui-cell" v-for="(item,index) in weatherData.weatherItems" :key="index" >
            <view class="weui-cell__hd">
                {{item.date}} {{item.dayKind}}
            </view>
            <view class="weui-cell__bd">
                <image :src="weatherimg(item.weatherImg)" style="margin-left:48rpx;margin-right:5px;vertical-align: middle;width:20px;height:20px;" />
                <span :style="[(item.weather.length>5)?{'font-size':'28rpx'}:(item.weather.length>6)?{'font-size':'24rpx'}:'']">{{item.weather}}</span>
            </view>
            <view class="weui-cell__ft">{{item.minTemperature}}~{{item.maxTemperature}} ℃ </view>
        </view>
    </view>
    <view  class="weui-footer" style='padding-top:5px;padding-bottom:5px'>
        <view class="weui-footer__text">数据来自天气网</view>
    </view>
    </view>
</template>
<script>
import b0 from '../../../src/image/b0.png'
import b1 from '../../../src/image/b1.png'
import b2 from '../../../src/image/b2.png'
import b3 from '../../../src/image/b3.png'
import b4 from '../../../src/image/b4.png'
// import b5 from '../../../src/image/b5.png'
import b6 from '../../../src/image/b6.png'
import b7 from '../../../src/image/b7.png'
import b8 from '../../../src/image/b8.png'
import b9 from '../../../src/image/b9.png'
import b10 from '../../../src/image/b10.png'
import b14 from '../../../src/image/b14.png'
import b15 from '../../../src/image/b15.png'
import b19 from '../../../src/image/b19.png'
import b20 from '../../../src/image/b20.png'
import b30 from '../../../src/image/b30.png'
import b32 from '../../../src/image/b32.png'
export default {
  data(){
      return {
        latitude: 39.92,
        longitude: 116.46,
        weatherData:{},
        weatherUrl:'',
        imgBase:'../../../static/images/',
        B0:b0,
        B1:b1,
        B2:b2,
        B3:b3,
        B4:b4,
        B6:b6,
        B7:b7,
        B8:b8,
        B9:b9,
        B10:b10,
        B14:b14,
        B15:b15,
        B19:b19,
        B20:b20,
        B30:b30,
        B32:b32,
      }
  },
  mounted(){
      let _this = this;
      let Url = '';
      console.log(getCurrentPages()[1].options.localtionName)
      if(getCurrentPages()[1].options.localtionName){
          Url = 'https://weather.mindawei.cn/weather/'+getCurrentPages()[1].options.localtionName
          console.log(Url,'1212121')
      }else{
          wx.getLocation({
            type: 'gcj02',
            success: function(res) {
                _this.latitude = res.latitude;
                _this.longitude = res.longitude;
                var speed = res.speed
                var accuracy = res.accuracy  
                Url = 'https://weather.mindawei.cn/weather/'+ "?latitude=" + _this.latitude + "&longitude=" + _this.longitude;
                
            }
        });
      }
      _this.init(Url);
  },
  methods:{
      init(url){
        let _this = this;
        _this.weatherUrl = url
        _this.weatherData = {}
        wx.request({
          url: url,
          success: (res) => {
           _this.weatherData = res.data
            // console.log(res.data);
          },
          fail: (res) => { },
          complete: () => { }
        })
      },
    weatherimg(imgName){
        let _this = this;
        if(imgName){
            switch(imgName+''){
                case 'b0.png':
                    return _this.B0;
                    break;
                case 'b1.png':
                    return _this.B1;
                    break;
                case 'b2.png':
                    return _this.B2;
                    break;
                case 'b3.png':
                    return _this.B3;
                    break;
                case 'b4.png':
                    return _this.B4;
                    break;
                // case 'b5.png':
                //     return b5;
                //     break;
                case 'b6.png':
                    return _this.B6;
                    break;
                case 'b7.png':
                    return _this.B7;
                    break;
                case 'b8.png':
                    return _this.B8;
                    break;
                case 'b9.png':
                    return _this.B9;
                    break;
                case 'b10.png':
                    return _this.B10;
                    break;
                case 'b14.png':
                    return _this.B14;
                    break;
                case 'b15.png':
                    return _this.B15;
                    break;
                case 'b19.png':
                    return _this.B19;
                    break;
                case 'b20.png':
                    return _this.B20;
                    break;
                case 'b30.png':
                    return _this.B30;
                    break;
                case 'b32.png':
                    return _this.B32;
                    break;
                default:
                    return ''

            }
        }
    }
  },
  onPullDownRefresh(){
    const _this = this;
    wx.stopPullDownRefresh();
    _this.init(_this.weatherUrl);
  },
}
</script>
<style scope>
/**app.wxss**/
/*!
 * WeUI v1.1.1 (https://github.com/weui/weui-wxss)
 * Copyright 2017 Tencent, Inc.
 * Licensed under the MIT license
 */
page{line-height:1.6;font-family:-apple-system-font,Helvetica Neue,sans-serif}icon{vertical-align:middle}.weui-cells{position:relative;margin-top:1.17647059em;background-color:#fff;line-height:1.41176471;font-size:17px}.weui-cells:before{top:0;border-top:1rpx solid #d9d9d9}.weui-cells:after,.weui-cells:before{content:" ";position:absolute;left:0;right:0;height:1px;color:#d9d9d9}.weui-cells:after{bottom:0;border-bottom:1rpx solid #d9d9d9}.weui-cells__title{margin-top:.77em;margin-bottom:.3em;padding-left:15px;padding-right:15px;color:#999;font-size:14px}.weui-cells_after-title{margin-top:0}.weui-cells__tips{margin-top:.3em;color:#999;padding-left:15px;padding-right:15px;font-size:14px}.weui-cell{padding:10px 15px;position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-cell:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1rpx solid #d9d9d9;color:#d9d9d9;left:15px}.weui-cell:first-child:before{display:none}.weui-cell_active{background-color:#ececec}.weui-cell_primary{-webkit-box-align:start;-webkit-align-items:flex-start;align-items:flex-start}.weui-cell__bd{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-cell__ft{text-align:right;color:#999}.weui-cell_access{color:inherit}.weui-cell__ft_in-access{padding-right:13px;position:relative}.weui-cell__ft_in-access:after{content:" ";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;margin-top:-4px;right:2px}.weui-cell_link{color:#586c94;font-size:14px}.weui-cell_link:active{background-color:#ececec}.weui-cell_link:first-child:before{display:block}.weui-icon-radio{margin-left:3.2px;margin-right:3.2px}.weui-icon-checkbox_circle,.weui-icon-checkbox_success{margin-left:4.6px;margin-right:4.6px}.weui-check__label:active{background-color:#ececec}.weui-check{position:absolute;left:-9999px}.weui-check__hd_in-checkbox{padding-right:.35em}.weui-cell__ft_in-radio{padding-left:.35em}.weui-cell_input{padding-top:0;padding-bottom:0}.weui-label{width:105px;word-wrap:break-word;word-break:break-all}.weui-input{height:2.58823529em;min-height:2.58823529em;line-height:2.58823529em}.weui-toptips{position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);top:0;left:0;right:0;padding:5px;font-size:14px;text-align:center;color:#fff;z-index:5000;word-wrap:break-word;word-break:break-all}.weui-toptips_warn{background-color:#e64340}.weui-textarea{display:block;width:100%}.weui-textarea-counter{color:#b2b2b2;text-align:right}.weui-cell_warn,.weui-textarea-counter_warn{color:#e64340}.weui-form-preview{position:relative;background-color:#fff}.weui-form-preview:before{top:0;border-top:1rpx solid #d9d9d9}.weui-form-preview:after,.weui-form-preview:before{content:" ";position:absolute;left:0;right:0;height:1px;color:#d9d9d9}.weui-form-preview:after{bottom:0;border-bottom:1rpx solid #d9d9d9}.weui-form-preview__value{font-size:14px}.weui-form-preview__value_in-hd{font-size:26px}.weui-form-preview__hd{position:relative;padding:10px 15px;text-align:right;line-height:2.5em}.weui-form-preview__hd:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1rpx solid #d9d9d9;color:#d9d9d9;left:15px}.weui-form-preview__bd{padding:10px 15px;font-size:.9em;text-align:right;color:#999;line-height:2}.weui-form-preview__ft{position:relative;line-height:50px;display:-webkit-box;display:-webkit-flex;display:flex}.weui-form-preview__ft:after{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1rpx solid #d5d5d6;color:#d5d5d6}.weui-form-preview__item{overflow:hidden}.weui-form-preview__label{float:left;margin-right:1em;min-width:4em;color:#999;text-align:justify;text-align-last:justify}.weui-form-preview__value{display:block;overflow:hidden;word-break:normal;word-wrap:break-word}.weui-form-preview__btn{position:relative;display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#3cc51f;text-align:center}.weui-form-preview__btn:after{content:" ";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1rpx solid #d5d5d6;color:#d5d5d6}.weui-form-preview__btn:first-child:after{display:none}.weui-form-preview__btn_active{background-color:#eee}.weui-form-preview__btn_default{color:#999}.weui-form-preview__btn_primary{color:#0bb20c}.weui-cell_select{padding:0}.weui-select{position:relative;padding-left:15px;padding-right:30px;height:2.58823529em;min-height:2.58823529em;line-height:2.58823529em;border-right:1rpx solid #d9d9d9}.weui-select:before{content:" ";display:inline-block;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);position:relative;top:-2px;position:absolute;top:50%;right:15px;margin-top:-4px}.weui-select_in-select-after{padding-left:0}.weui-cell__bd_in-select-before,.weui-cell__hd_in-select-after{padding-left:15px}.weui-cell_vcode{padding-right:0}.weui-vcode-btn,.weui-vcode-img{margin-left:5px;height:2.58823529em;vertical-align:middle}.weui-vcode-btn{display:inline-block;padding:0 .6em 0 .7em;border-left:1px solid #e5e5e5;line-height:2.58823529em;font-size:17px;color:#3cc51f;white-space:nowrap}.weui-vcode-btn:active{color:#52a341}.weui-cell_switch{padding-top:6px;padding-bottom:6px}.weui-uploader__hd{display:-webkit-box;display:-webkit-flex;display:flex;padding-bottom:10px;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-uploader__title{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-uploader__info{color:#b2b2b2}.weui-uploader__bd{margin-bottom:-4px;margin-right:-9px;overflow:hidden}.weui-uploader__file{float:left;margin-right:9px;margin-bottom:9px}.weui-uploader__img{display:block;width:79px;height:79px}.weui-uploader__file_status{position:relative}.weui-uploader__file_status:before{content:" ";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.5)}.weui-uploader__file-content{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#fff}.weui-uploader__input-box{float:left;position:relative;margin-right:9px;margin-bottom:9px;width:77px;height:77px;border:1px solid #d9d9d9}.weui-uploader__input-box:after,.weui-uploader__input-box:before{content:" ";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#d9d9d9}.weui-uploader__input-box:before{width:2px;height:39.5px}.weui-uploader__input-box:after{width:39.5px;height:2px}.weui-uploader__input-box:active{border-color:#999}.weui-uploader__input-box:active:after,.weui-uploader__input-box:active:before{background-color:#999}.weui-uploader__input{position:absolute;z-index:1;top:0;left:0;width:100%;height:100%;opacity:0}.weui-article{padding:20px 15px;font-size:15px}.weui-article__section{margin-bottom:1.5em}.weui-article__h1{font-size:18px;font-weight:400;margin-bottom:.9em}.weui-article__h2{font-size:16px;font-weight:400;margin-bottom:.34em}.weui-article__h3{font-weight:400;font-size:15px;margin-bottom:.34em}.weui-article__p{margin:0 0 .8em}.weui-msg{padding-top:36px;text-align:center}.weui-msg__link{display:inline;color:#586c94}.weui-msg__icon-area{margin-bottom:30px}.weui-msg__text-area{margin-bottom:25px;padding:0 20px}.weui-msg__title{margin-bottom:5px;font-weight:400;font-size:20px}.weui-msg__desc{font-size:14px;color:#999}.weui-msg__opr-area{margin-bottom:25px}.weui-msg__extra-area{margin-bottom:15px;font-size:14px;color:#999}@media screen and (min-height:438px){.weui-msg__extra-area{position:fixed;left:0;bottom:0;width:100%;text-align:center}}.weui-flex{display:-webkit-box;display:-webkit-flex;display:flex}.weui-flex__item{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-btn{margin-top:15px}.weui-btn:first-child{margin-top:0}.weui-btn-area{margin:1.17647059em 15px .3em}.weui-agree{display:block;padding:.5em 15px;font-size:13px}.weui-agree__text{color:#999}.weui-agree__link{display:inline;color:#586c94}.weui-agree__checkbox{position:absolute;left:-9999px}.weui-agree__checkbox-icon{position:relative;top:2px;display:inline-block;border:1px solid #d1d1d1;background-color:#fff;border-radius:3px;width:11px;height:11px}.weui-agree__checkbox-icon-check{position:absolute;top:1px;left:1px}.weui-footer{color:#999;font-size:14px;text-align:center}.weui-footer_fixed-bottom{position:fixed;bottom:.52em;left:0;right:0}.weui-footer__links{font-size:0}.weui-footer__link{display:inline-block;vertical-align:top;margin:0 .62em;position:relative;font-size:14px;color:#586c94}.weui-footer__link:before{content:" ";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1rpx solid #c7c7c7;color:#c7c7c7;left:-.65em;top:.36em;bottom:.36em}.weui-footer__link:first-child:before{display:none}.weui-footer__text{padding:0 .34em;font-size:12px}.weui-grids{border-top:1rpx solid #d9d9d9;border-left:1rpx solid #d9d9d9;overflow:hidden}.weui-grid{position:relative;float:left;padding:20px 10px;width:33.33333333%;box-sizing:border-box;border-right:1rpx solid #d9d9d9;border-bottom:1rpx solid #d9d9d9}.weui-grid_active{background-color:#ececec}.weui-grid__icon{display:block;width:28px;height:28px;margin:0 auto}.weui-grid__label{margin-top:5px;display:block;text-align:center;color:#000;font-size:14px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.weui-loading{margin:0 5px;width:20px;height:20px;display:inline-block;vertical-align:middle;-webkit-animation:a 1s steps(12) infinite;animation:a 1s steps(12) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size:100%}.weui-loading.weui-loading_transparent{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E")}@-webkit-keyframes a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes a{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.weui-badge{display:inline-block;padding:.15em .4em;min-width:8px;border-radius:18px;background-color:#e64340;color:#fff;line-height:1.2;text-align:center;font-size:12px;vertical-align:middle}.weui-badge_dot{padding:.4em;min-width:0}.weui-loadmore{width:65%;margin:1.5em auto;line-height:1.6em;font-size:14px;text-align:center}.weui-loadmore__tips{display:inline-block;vertical-align:middle}.weui-loadmore_line{border-top:1px solid #e5e5e5;margin-top:2.4em}.weui-loadmore__tips_in-line{position:relative;top:-.9em;padding:0 .55em;background-color:#fff;color:#999}.weui-loadmore__tips_in-dot{position:relative;padding:0 .16em;width:4px;height:1.6em}.weui-loadmore__tips_in-dot:before{content:" ";position:absolute;top:50%;left:50%;margin-top:-1px;margin-left:-2px;width:4px;height:4px;border-radius:50%;background-color:#e5e5e5}.weui-panel{background-color:#fff;margin-top:10px;position:relative;overflow:hidden}.weui-panel:first-child{margin-top:0}.weui-panel:before{top:0;border-top:1rpx solid #e5e5e5}.weui-panel:after,.weui-panel:before{content:" ";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}.weui-panel:after{bottom:0;border-bottom:1rpx solid #e5e5e5}.weui-panel__hd{padding:14px 15px 10px;color:#999;font-size:13px;position:relative}.weui-panel__hd:after{content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1rpx solid #e5e5e5;color:#e5e5e5;left:15px}.weui-media-box{padding:15px;position:relative}.weui-media-box:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1rpx solid #e5e5e5;color:#e5e5e5;left:15px}.weui-media-box:first-child:before{display:none}.weui-media-box__title{font-weight:400;font-size:17px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;word-wrap:break-word;word-break:break-all}.weui-media-box__desc{color:#999;font-size:13px;line-height:1.2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.weui-media-box__info{margin-top:15px;padding-bottom:5px;font-size:13px;color:#cecece;line-height:1em;list-style:none;overflow:hidden}.weui-media-box__info__meta{float:left;padding-right:1em}.weui-media-box__info__meta_extra{padding-left:1em;border-left:1px solid #cecece}.weui-media-box__title_in-text{margin-bottom:8px}.weui-media-box_appmsg{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-media-box__thumb{width:100%;height:100%;vertical-align:top}.weui-media-box__hd_in-appmsg{margin-right:.8em;width:60px;height:60px;line-height:60px;text-align:center}.weui-media-box__bd_in-appmsg{-webkit-box-flex:1;-webkit-flex:1;flex:1;min-width:0}.weui-media-box_small-appmsg{padding:0}.weui-cells_in-small-appmsg{margin-top:0}.weui-cells_in-small-appmsg:before{display:none}.weui-progress{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.weui-progress__bar{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-progress__opr{margin-left:15px;font-size:0}.weui-navbar{display:-webkit-box;display:-webkit-flex;display:flex;position:absolute;z-index:500;top:0;width:100%;border-bottom:1rpx solid #ccc}.weui-navbar__item{position:relative;display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;padding:13px 0;text-align:center;font-size:0}.weui-navbar__item.weui-bar__item_on{color:#1aad19}.weui-navbar__slider{position:absolute;content:" ";left:0;bottom:0;width:6em;height:3px;background-color:#1aad19;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.weui-navbar__title{display:inline-block;font-size:15px;max-width:8em;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.weui-tab{position:relative;height:100%}.weui-tab__panel{box-sizing:border-box;height:100%;padding-top:50px;overflow:auto;-webkit-overflow-scrolling:touch}.weui-search-bar{position:relative;padding:8px 10px;display:-webkit-box;display:-webkit-flex;display:flex;box-sizing:border-box;background-color:#efeff4;border-top:1rpx solid #d7d6dc;border-bottom:1rpx solid #d7d6dc}.weui-icon-search{margin-right:8px;font-size:inherit}.weui-icon-search_in-box{position:absolute;left:10px;top:7px}.weui-search-bar__text{display:inline-block;font-size:14px;vertical-align:middle}.weui-search-bar__form{position:relative;-webkit-box-flex:1;-webkit-flex:auto;flex:auto;border-radius:5px;background:#fff;border:1rpx solid #e6e6ea}.weui-search-bar__box{position:relative;padding-left:30px;padding-right:30px;width:100%;box-sizing:border-box;z-index:1}.weui-search-bar__input{height:28px;line-height:28px;font-size:14px}.weui-icon-clear{position:absolute;top:0;right:0;padding:7px 8px;font-size:0}.weui-search-bar__label{position:absolute;top:0;right:0;bottom:0;left:0;z-index:2;border-radius:3px;text-align:center;color:#9b9b9b;background:#fff;line-height:28px}.weui-search-bar__cancel-btn{margin-left:10px;line-height:28px;color:#09bb07;white-space:nowrap}

</style>
