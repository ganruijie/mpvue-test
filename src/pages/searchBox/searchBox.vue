<template>
    <view>
        <view class="weui-search-bar">
            <view class="weui-search-bar__form">
                <view class="weui-search-bar__box">
                <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                <input type="text" class="weui-search-bar__input" placeholder="请输入查询内容" v-model="searchKeyWord" :value="searchKeyWord" @input="wxSearchInput" @keydown="wxSearchConfirm" />
                <view class="weui-icon-clear" v-if="searchKeyWord.length > 0" @click="wxSearchClear">
                    <icon type="clear" size="14"></icon>
                </view>
                </view>
            </view>
            <view class="weui-search-bar__cancel-btn" @click="wxSearchConfirm">
                <text v-if="searchKeyWord.length>0" data-key='search'>搜索</text>
                <text v-else data-key='back'>返回</text>
            </view>
        </view>

        <view class="wxSearch" :style="{'display':'block','height' : seachHeight+'px','top' : barHeight+'px'}">
            <view class="wxSearchInner">
                <!-- 搜索提示部分 -->
                <view class="wxSearchMindKey">
                  <view class="wxSearchMindKeyList"  :style="searchKeyWord.length>0 ? 'display:block':'display:none'">
                      <block v-for="(item,index) in tipKeys" :key="index">
                      <view class="wxSearchMindKeyItem" @click="wxSearchKeyTap" :data-key="item">{{item}}</view>
                      </block>
                  </view>

                  <view v-if="histroyWord[0]" class="wxSearchHistory" :style="searchKeyWord.length>0 ? 'display:none':'display:block'">
                    <view class="wxSearchHistoryItem">
                        <text class="wxSearchHistoryItemTitle">搜索记录</text>
                        <icon type="clear" @click="wxSearchDeleteAll" size="18" />
                    </view>
                    <view class="wxSearchKeyList">
                        <block v-for="(item,index) in histroyWord" :key="index">
                        <view class="wxSearchKeyItem" @click="wxSearchKeyTap" :data-key="item">{{item}}</view>
                        </block>
                    </view>
                  </view>
                </view>

                <view class="wxSearchKey" :style="searchKeyWord.length>0 ? 'display:none':'display:block'">
                  <text v-if="hotKeys[0]" class="wxSearchTitle">搜索热点</text>
                  <view class="wxSearchKeyList">
                      <block v-for="(item,index) in hotKeys" :key="index">
                      <view class="wxSearchKeyItem" @click="wxSearchKeyTap" :data-key="item">{{item}}</view>
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
          hotKeys:['杭州', '佛山', "南宁", "柳州", '贵港', '桂平'],
          tipKeys:['深圳', '广州', '东莞', "惠州"],
          histroyWord:[],//历史搜索关键字
          seachHeight:0,
          searchKeyWord:'',
          temData:{},
          barHeight:43
        }
    },
    props:[],
    mounted () {
        const _this = this;
        _this.init();
    },
    methods:{
        init(){
          const _this = this;
          // 获取本机系统信息
          wx.getSystemInfo({
            success: function (res) {
              var wHeight = res.windowHeight;
              _this.seachHeight = wHeight - _this.barHeight;
            }
          });
          // 读取localstroage中的内容
          _this.getHisKeys()
        },
         // 搜索回调函数  
        searchFunction(value) {
          wx.redirectTo({
            url: '../index/index?searchValue='+value
          })
        },
        // 返回回调函数
        myGobackFunction() {
          wx.redirectTo({
            url: '../index/index'  
          })
        },
        search(inputValue) {
          const _this = this;
          if (inputValue && inputValue.length > 0) {
            // 添加历史记录
            _this.wxSearchAddHisKey(inputValue);
            _this.searchKeyWord = inputValue;
            // 回调搜索
            _this.searchFunction(inputValue);
          }
        },
        // 读取缓存
        getHisKeys() {
          const _this = this;
          let value = [];
          try {
            value = wx.getStorageSync('wxSearchHisKeys')
            if (value) {
              _this.histroyWord = value;
            }
          } catch (e) {
            // Do something when catch error
          }
        },
        // 添加缓存
        wxSearchAddHisKey(inputValue) {
          const _this = this;
          if (!inputValue || inputValue.length == 0) {
            return;
          }
          var value = wx.getStorageSync('wxSearchHisKeys');
          if (value) {
            if (value.indexOf(inputValue) < 0) {
              value.unshift(inputValue);
            }
            wx.setStorage({
              key: "wxSearchHisKeys",
              data: value,
              success: function () {
                _this.getHisKeys();
              }
            })
          } else {
            value = [];
            value.push(inputValue);
            wx.setStorage({
              key: "wxSearchHisKeys",
              data: value,
              success: function () {
                _this.getHisKeys();
              }
            })
          }
        },
        // 删除缓存
        wxSearchDeleteAll() {
          const _this = this;
          wx.removeStorage({
            key: 'wxSearchHisKeys',
            success: function (res) {
              _this.histroyWord = [];
            }
          })
        },
        // 清空输入
        wxSearchClear() {
          const _this = this;
          _this.searchKeyWord = "";
          _this.tipKeys = [];
        },
        // 点击提示或者关键字、历史记录时的操作
        wxSearchKeyTap(e) {
          const _this = this;
          _this.search(e.target.dataset.key);
        },

        // 确任或者回车
        wxSearchConfirm(e) {
          const _this = this;
          var key = e.target.dataset.key;
          if(key=='back'){
            _this.myGobackFunction();
          }else{
            _this.search(_this.searchKeyWord);
          }
        },
        // 搜索框输入时候操作
        wxSearchInput(e) {
          const _this = this;
          let inputValue = e.target.value;
          // 寻找提示值 
          var tipKeys = [];
          if (inputValue && inputValue.length > 0) {
            if(_this.tipKeys.lenght){
              _this.tipKeys.forEach(element=>{
                if (element.indexOf(inputValue) != -1) {
                  tipKeys.push(element);
                  console.log('1212121212',tipKeys)
                }
              })
            }


            // for (var i = 0; i < _this.tipKeys.length; i++) {
            //   var mindKey = _this.tipKeys[i];
            //   // 包含字符串
            //   if (mindKey.indexOf(inputValue) != -1) {
            //     tipKeys.push(mindKey);
            //   }
            // }
          }
          // 更新数据
          _this.searchKeyWord = inputValue;
          _this.tipKeys = tipKeys;
        },
    }
}
</script>

<style scoped>
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
