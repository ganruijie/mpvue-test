<template>
  <div class="counter-warp">
    <div>
      <map id="map" v-if="isGetLocation"
      :longitude="longitude" 
      :latitude="latitude" 
      :polyline="polyline"
      :markers="markers" 
      :covers="covers"
      show-location
      bindmarkertap="markertap"
      style="width: 500px; height: 350px;">
      </map>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import locationImg from '../../image/location.png'

export default {
  data(){
    return {
      latitude: 39.92,
      longitude: 116.46,
      markers: [{
        id:1,
        latitude: 22.560664,
        longitude: 113.952255,
        iconPath: locationImg,
        name: 'T.I.T 创意园'
      }],
      polyline: [{
        points: [{
          longitude: 116.46,
          latitude: 39.92
        }, {
          longitude: 113.952255,
          latitude: 22.560664
        }],
        color:"#FF9632",
        width: 5,
        dottedLine: false
      }],
      isGetLocation:false,//是否获取到定位信息
    }
  },
  mounted:function(){
    let _this = this;
    // 调用应用实例的方法获取全局数据
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        _this.latitude = res.latitude
        _this.longitude = res.longitude
        _this.isGetLocation = true;
        var speed = res.speed
        var accuracy = res.accuracy  
        _this.$set(_this.markers[0],'latitude',_this.latitude)
        _this.$set(_this.markers[0],'longitude',_this.longitude)
        wx.openLocation({  
          latitude: _this.latitude,  
          longitude: _this.longitude,  
          name:"12121212121",  
          scale: 28  
        })  
      }
    })
  },
  computed: {
    
  },
  methods: {
    
  }
}

</script>
<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
