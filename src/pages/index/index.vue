<template>
  <div class="container">
    <div class="container_top">
      <div class="top_box1">
        <span class="top_box1_left">
          <img :src="locatIcon" height="36" width="32" alt="" class="locationIcon">
        </span>
        <span class="top_box1_right" @click="chooseLocation">{{localtionInfoName}}</span>
      </div>
      <div class='top_box2'>
        <navigator url="../searchPage/searchPage">
          <div></div>
        </navigator>
        <span class="search_box">
        </span>
      </div>
    </div>
    <div class="container_center"></div>
    <div class="container_bottom"></div>
  </div>
</template>

<script>
import localtionIcon from '../../image/address.png';
import searchIcon from '../../image/search.png' 
export default {
  data () {
    return {
      locatIcon:localtionIcon,
      latitude: 39.92,
      longitude: 116.46,
      localtionInfoName:'正在获取位置',
      isGetLocation:false,//是否获取到定位信息
      sugData:''
    }
  },

  components: {
  },

  methods: {
    renderReverse(){
      return arguments[0]
    },
    chooseLocation(){
      let that = this;
       wx.chooseLocation({
          success: function(res){
            // success
            console.log(res);
            that.latitude = res.latitude;
            that.longitude = res.longitude;
            that.localtionInfoName = res.name;
           
          },
          fail: function() {
            // fail
          }
        })
    },
    showLocationName(){
      let _this = this;
      wx.request({
        url: 'http://api.map.baidu.com/geocoder/v2/?callback='+_this.renderReverse+'&location='+_this.latitude+','+_this.longitude+'&output=json&pois=1&ak=UvS50GKvzIfsk1cdUxhQIuFXHhqYAkMs',
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if(res.statusCode == 200){
            console.log(res);
            _this.localtionInfoName = res.data.result.formatted_address
          }else{
             _this.localtionInfoName = '未能获取位置'
          }
        },
        fail: function () {
          // fail
        },
      })
    }
  },
  watch:{
  },
  mounted(){
    let _this = this;
    //  高度自适应
    wx.getSystemInfo({  
        success: function(res) {  
          let clientHeight=res.windowHeight;
          let clientWidth=res.windowWidth;
          let rpxR=750/clientWidth;
          let calc=clientHeight*rpxR-180;
          _this.winHeight = calc ;
        }  
    });
    // 打开页面进行获取位置
    // 调用应用实例的方法获取全局数据
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        _this.latitude = res.latitude
        _this.longitude = res.longitude
        _this.isGetLocation = true;
        var speed = res.speed
        var accuracy = res.accuracy  
        // 调用获取位置地址的函数
        _this.showLocationName();
 
      }
    })
  },
  created () {

  }
}
</script>

<style scoped>
.container{
  padding:0rpx;
}
.container_top{
  width:100%;
  background-color:#008BFF;
}
.top_box1{
  height:84rpx;
  padding:0rpx 40rpx;
}
.top_box1_left{
  display: inline-block;
  height:84rpx;
  line-height:84rpx;
}
.locationIcon{
  width:36rpx;
  height:36rpx;
  padding-right:10rpx;
}
.top_box1_right{
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    color:#ffffff;
}
.top_box2{
  position:relative;
  height:84rpx;
  padding:0rpx 40rpx;
}
.top_box2 div{
  height:60rpx;
  background-color:#ffffff;
  border-radius:1px;
}
.search_box{
  position:absolute;
  height:52rpx;
  width:52rpx;
  right:50rpx;
  top:5rpx;
  background-image:url('../../image/search.png');
}
</style>
