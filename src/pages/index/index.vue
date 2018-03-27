<template>
  <div class="container">
    <view class="swiper-tab">
        <view :class="['swiper-tab-item',(currentTab=='0'?'active':'')]" data-current="0" @click="clickTab">tabs1</view>
        <view :class="['swiper-tab-item',(currentTab=='1'?'active':'')]" data-current="1" @click="clickTab">tabs2</view>
        <view :class="['swiper-tab-item',(currentTab=='2'?'active':'')]" data-current="2" @click="clickTab">tabs3</view>
    </view>
    <swiper class="swiper" :current="currentTab" duration="300" @change="swiperTab">
        <swiper-item ><view>tabs1</view></swiper-item>
        <swiper-item><view>tabs2</view></swiper-item>
        <swiper-item><view>tabs3</view></swiper-item>
    </swiper>
  </div>
</template>

<script>


export default {
  data () {
    return {
      currentTab:"0",
    }
  },

  components: {

  },

  methods: {
    //滑动切换
    swiperTab: function (e) {
      var that = this;
      this.currentTab = e.mp.detail.current
    },
    //点击切换
    clickTab: function (e) {
      if (this.currentTab === e.target.dataset.current) {
        return false;
      } else {
        this.currentTab = e.target.dataset.current
      }
    }
  },
  watch:{
  },
  mounted:function(){
    
  },
  created () {

  }
}
</script>

<style scoped>
.container{
  padding:0rpx;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.swiper-tab{
    width: 100%;
    border-bottom: 2rpx solid #ccc;
    text-align: center;
    height: 88rpx;
    line-height: 88rpx;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
}
.swiper-tab-item{
    width: 30%; 
    color:#434343;
}
.active{
    color:#F65959;
    border-bottom: 4rpx solid #F65959;
}
.swiper{
  text-align: center;
  width: 100%;
}
</style>
