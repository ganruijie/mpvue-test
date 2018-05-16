<template>
    <view>
        <view class="weui-search-bar">
            <view class="weui-search-bar__form">
                <view class="weui-search-bar__box">
                <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                <input type="text" class="weui-search-bar__input" placeholder="请输入查询内容" value="{{wxSearchData.value}}" bindinput="wxSearchInput" bindconfirm="wxSearchConfirm" />
                <view class="weui-icon-clear" v-if="wxSearchData.value.length > 0" bindtap="wxSearchClear">
                    <icon type="clear" size="14"></icon>
                </view>
                </view>
            </view>
            <view class="weui-search-bar__cancel-btn" bindtap="wxSearchConfirm">
                <text v-if="wxSearchData.value.length>0" data-key='search'>搜索</text>
                <text v-else data-key='back'>返回</text>
            </view>
        </view>

        <view class="wxSearch" :style="{'display':'block',
            'height':wxSearchData.view.seachHeight+'px',
            'top':wxSearchData.view.barHeight+'px'
        }">

            <view class="wxSearchInner">
                <!-- 搜索提示部分 -->
                <view class="wxSearchMindKey">
                <view class="wxSearchMindKeyList">
                    <block v-for="(item,index) in wxSearchData.tipKeys" :key="index">
                    <view class="wxSearchMindKeyItem" bindtap="wxSearchKeyTap" data-key="{{item}}">{{item}}</view>
                    </block>
                </view>
                </view>

                <view v-if="wxSearchData.his[0]" class="wxSearchHistory" :style="{'display':wxSearchData.value.length>0 ? 'none':'block'}">
                <view class="wxSearchHistoryItem">
                    <text class="wxSearchHistoryItemTitle">搜索记录</text>
                    <!--text class="wxSearchHistoryItemDel" bindtap="wxSearchDeleteAll">删除</text-->
                    <icon type="clear" bindtap="wxSearchDeleteAll" size="18" />
                </view>
                <view class="wxSearchKeyList">
                    <block v-for="(item,index) in wxSearchData.his" :key="index">
                    <view class="wxSearchKeyItem" bindtap="wxSearchKeyTap" data-key="{{item}}">{{item}}</view>
                    </block>
                </view>
                </view>

                <view class="wxSearchKey" :style="{'display':wxSearchData.value.length>0 ? 'none':'block'}">
                <text v-if="wxSearchData.hotKeys[0]" class="wxSearchTitle">搜索热点</text>
                <view class="wxSearchKeyList">
                    <block v-for="(item,index) in wxSearchData.hotKeys" :key="index">
                    <view class="wxSearchKeyItem" bindtap="wxSearchKeyTap" data-key="{{item}}">{{item}}</view>
                    </block>
                </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:[],
    mounted () {
        
    },
    methods:{
        init(){

        },
        
    }
}
</script>

<style>
/** 整个区域 */
.wxSearch{
  position: absolute;
  top: 43px;
  left: 0;
  width: 100%;
  height: 100%;
  border-top: 1px #eee solid;
  background-color: rgba(200, 200, 200, 0.1);
  z-index: 9999;
}

/** 搜索框下面的提示区域 */
.wxSearchInner{
  background-color: #fff;
}

/** 搜索热点标题 */
.wxSearchTitle{
  display: block;
  padding: 10px 5px 5px 10px;
  font-size: 13px;
  text-align: left;
}

/** 提示样式 */
.wxSearchMindKeyItem{
  padding: 10px 5px 10px 15px;
  margin-left: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  font-size: 13px;
}

/** 标签样式 */
.wxSearchKeyList{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
}

/** 标签样式 */
.wxSearchKeyItem{
  flex: 0 0 18%;
  font-size: 13px;
  text-align: center;
  border: 1px solid #eee;
  margin: 5px;
  padding: 4px 5px 4px 5px;
  border-radius: 0px;
  background-color: rgba(200, 200, 200, 0.1);
}

/** 搜索记录标题栏 */
.wxSearchHistoryItem{
  padding-left: 10px;
  padding-top: 10px;
  padding-right: 5px;
  padding-bottom: 5px;
  display: flex;
}

/** 搜索记录标题 */
.wxSearchHistoryItemTitle{
  flex: 8;
  font-size: 13px;
}

/** 搜索记录删除按钮 */
.wxSearchHistoryItemDel{
  flex: 1;
  font-size: 13px;
  text-align: center;
  padding-top:2px;
  padding-bottom: 2px;
  border: 1px solid #eee;
  border-radius: 2px;
}

/** ---------------------- 以下是搜索框的 we-ui 样式--------------------------------*/

/*!
 * WeUI v1.1.1 (https://github.com/weui/weui-wxss)
 * Copyright 2017 Tencent, Inc.
 * Licensed under the MIT license
 */

.weui-search-bar {
  position: relative;
  padding: 8px 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  background-color: #efeff4;
  border-top: 1rpx solid #d7d6dc;
  border-bottom: 1rpx solid #d7d6dc;
}

.weui-icon-search {
  margin-right: 8px;
  font-size: inherit;
}

.weui-icon-search_in-box {
  position: absolute;
  left: 10px;
  top: 7px;
}

.weui-search-bar__text {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
}

.weui-search-bar__form {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: auto;
  flex: auto;
  border-radius: 5px;
  background: #fff;
  border: 1rpx solid #e6e6ea;
}

.weui-search-bar__box {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
}

.weui-search-bar__input {
  height: 28px;
  line-height: 28px;
  font-size: 14px;
}

.weui-icon-clear {
  position: absolute;
  top: 0;
  right: 0;
  padding: 7px 8px;
  font-size: 0;
}

.weui-search-bar__label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  border-radius: 3px;
  text-align: center;
  color: #9b9b9b;
  background: #fff;
  line-height: 28px;
}

.weui-search-bar__cancel-btn {
  margin-left: 10px;
  line-height: 28px;
  color: #09bb07;
  white-space: nowrap;
}

</style>
