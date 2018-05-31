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
        <div @click="wxSearchTab">
            <input class="search-input" type="text" placeholder="搜索地名"/>
        </div>
        <span class="search_box">
        </span>
      </div>
    </div>
    <div class="container_center">
      <div class="weather-box">
        <div class="weather-pic">
          <img :src="weatherData.dayPictureUrl" alt="" width="50" height="50" v-if="dayOrnight">
            <img :src="weatherData.nightPictureUrl" alt="" width="50" height="50" v-else>
        </div>
        <div class="weather-address">
          <p>{{localtionName}}</p>
          <p>{{weatherData.weather}}</p>
          <p>{{weatherData.wind}}</p>
        </div>
        <div class="weather-num">
          <p>{{weatherData.date}}</p>
          <p>{{weatherData.temperature}}</p>
        </div>
      </div>
      <div class="weather-other">
          <div class="left" v-for="(item,index) in otherWeatherData" :key="index">
            <img :src="item.dayPictureUrl" alt=""  v-if="dayOrnight">
            <img :src="item.nightPictureUrl" alt="" width="50" height="50" v-else>
            <p>{{item.date}}</p>
            <p>{{item.weather}}</p>
            <p>{{item.wind}}</p>
            <p>{{item.temperature}}</p>
          </div>
      </div>
    </div>
    <div class="container_center">
      <view class="board-box-bottom board" :scroll-y="true">
        <block v-for="(item,index) in boards" :key="index">
          <view class="board-item moviesBox">
            <navigator :url="'../list/list?type='+item.key+'&title='+item.title" hover-class="none">
              <view class="title">
                <text class="text">{{item.title}}</text>
                <image src="../../../static/images/arrowright.png" mode="aspectFill"/>
              </view>
            </navigator>
            <scroll-view class="content" :scroll-x="true">
                <view v-if="item.key !== 'us_box'" class="inner">
                  <block v-for="(movie,ind) in item.movies" :key="ind">
                    <navigator :url="'../item/item?id=' + movie.id">
                      <view class="movie-item">
                        <image :src="movie.images.large" mode="aspectFill"></image>
                        <text>{{movie.title}}</text>
                      </view>
                    </navigator>
                  </block>
                </view>
                <view v-else class="inner">
                  <block v-for="(movie,ind) in item.movies" :key="ind">
                    <navigator :url="'../item/main?id=' + movie.id">
                      <view class="movie-item">
                        <image :src="movie.subject.images.large" mode="aspectFill"></image>
                        <text>{{movie.subject.title}}</text>
                      </view>
                    </navigator>
                  </block>
                </view>
            </scroll-view>
          </view>
        </block>
        <!-- music -->
        <view class="board-item moviesBox">
          <navigator :url="'../list/list?type=&title='" hover-class="none">
            <view class="title">
              <text class="text"></text>
              <image src="../../../static/images/arrowright.png" mode="aspectFill"/>
            </view>
          </navigator>
          <scroll-view class="content" :scroll-x="true">
              <view class="inner">
                <block v-for="(item,ind) in music" :key="ind">
                  <navigator :url="'../item/main?id='">
                    <view class="movie-item">
                      <image :src="item.al.picUrl" mode="aspectFill"></image>
                      <text>{{item.ar[0].name}}-{{item.al.name}}</text>
                    </view>
                  </navigator>
                </block>
              </view>
          </scroll-view>
        </view>
      </view>
    </div>
    <div class="container_bottom"></div>
  </div>
</template>

<script>
import localtionIcon from '../../image/address.png';
import searchIcon from '../../image/search.png' 
import { mapState,mapActions } from 'vuex'
export default {
  data () {
    return {
      locatIcon:localtionIcon,
      latitude: 39.92,
      longitude: 116.46,
      localtionName:'北京',
      localtionInfoName:'正在获取位置',
      isGetLocation:false,//是否获取到定位信息
      sugData:'',
      weatherData:[],
      otherWeatherData:[],
      dayOrnight:false,//白天还是晚上，默认白天
    }
  },

  components: {
  },
  computed: {
    ...mapState('board', {
      boards: state => state.boards,
      movies: state => state.movies,
      music:state => state.music.splice(0,8),
    })
  },
  methods: {
    ...mapActions('board',[
      'getBoards',
      'getMusic'
    ]),
    async getBoardData(localtionName){
      let localName = localtionName
      await this.getBoards(localName)
      await this.getMusic()
    },
    // 打开搜索窗口 
    wxSearchTab() {
      wx.redirectTo({
        url: '../searchBox/searchBox'
      })
    },
    renderReverse(){
      return arguments[0]
    },
    dayOrNight(){
      let _this = this;
      let time = new Date().getHours();
      _this.dayOrnight = (6<time && time<18)?true:false;
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
            // 选择当前位置的cityname位置,和天气
            wx.request({
              url: 'https://api.map.baidu.com/geocoder/v2/?callback='+that.renderReverse+'&location='+that.latitude+','+that.longitude+'&output=json&pois=1&ak=UvS50GKvzIfsk1cdUxhQIuFXHhqYAkMs',
              data: {},
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                if(res.statusCode == 200){
                  that.localtionName = res.data.result.addressComponent.city;
                  that.getWeather();
                }else{
                  that.localtionInfoName = '未能获取位置'
                }
              },
              fail: function () {
                // fail
              },
            })
          },
          fail: function() {
            // fail
          }
        })
    },
    showLocationName(){
      let _this = this;
      wx.request({
        url: 'https://api.map.baidu.com/geocoder/v2/?callback='+_this.renderReverse+'&location='+_this.latitude+','+_this.longitude+'&output=json&pois=1&ak=UvS50GKvzIfsk1cdUxhQIuFXHhqYAkMs',
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if(res.statusCode == 200){
            console.log(res);
            _this.localtionName = res.data.result.addressComponent.city;
            _this.localtionInfoName = res.data.result.formatted_address;
            _this.getWeather();
          }else{
             _this.localtionInfoName = '未能获取位置'
          }
        },
        fail: function (error) {
          // fail
          wx.showToast(error)
        },
      })
    },
    getWeather(){
      let _this = this;
      wx.request({
        url:'https://api.map.baidu.com/telematics/v3/weather?location='+_this.localtionName+'&output=json&ak=UvS50GKvzIfsk1cdUxhQIuFXHhqYAkMs',
        data:{},
        header: {
          'Content-Type': 'application/json'
        },
        success:function(res){
          if(res.statusCode == 200){
              _this.otherWeatherData = [];
              _this.weatherData = [];
              if(res.data.results && res.data.results.length){
                _this.weatherData = res.data.results[0]?res.data.results[0].weather_data[0]:[];
                if(res.data.results[0].weather_data){
                  res.data.results[0].weather_data.forEach((element,index) => {
                    if(index !=0){
                        _this.otherWeatherData.push(element)
                    }
                  });
                }
                console.log(_this.localtionName,'_this.localtionName')
                // 获取本地上映电影地点----北京、上海...不能是北京市、上海市，选择的地点中是北京市、上海市
                if(_this.localtionName.substr(-1) == '市'){
                  let localName = _this.localtionName.slice(0,-1)
                  _this.getBoardData(localName);
                }else{
                  _this.getBoardData(_this.localtionName);
                }
                
            }else{
               wx.showToast({
                  title: '获取失败，请手动选择城市！',
                  duration: 1000,
                  mask:true
              })
            }
          }
        }
      })
    },
    init(){
      const _this = this;
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
            _this.latitude = res.latitude;
            _this.longitude = res.longitude;
            _this.isGetLocation = true;
            var speed = res.speed
            var accuracy = res.accuracy  
            // 调用获取位置地址的函数
            _this.showLocationName();
        }
      });
      _this.dayOrNight();
    },
  },
  watch:{
  },
  mounted(){
    let _this = this;
    // _this.localtionName
   if(getCurrentPages()[0].options.searchValue){
      _this.localtionName = getCurrentPages()[0].options.searchValue;
      _this.getWeather()
      _this.localtionInfoName = _this.localtionName
    }else{
      _this.init();
    }
  },
  created () {
    const _this = this;

  },
  onPullDownRefresh(){
    const _this = this;
    wx.stopPullDownRefresh();
    _this.init();
  },
  startPullDownRefresh(){
    
  }
}
</script>

<style scoped>
input {
  display:block;
  height:48rpx;
  text-overflow:clip;
  overflow:hidden;
  white-space:nowrap;
  font-family:UICTFontTextStyleBody;
  min-height:48rpx;
  padding:6rpx;
  text-align: center;
}
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
.container_center{
  width:100%;
  margin: 0rpx auto;
}
.weather-box{
  width:96%;
  /* height: 148rpx; */
  margin:10rpx;
  font-size:22rpx;
  border: 2rpx solid #e1e1e1; 
  box-shadow: 4rpx 2rpx 12rpx #666666;
}
.moviesBox{
  width:90.7%;
  margin:10rpx;
  border: 2rpx solid #e1e1e1; 
  box-shadow: 4rpx 2rpx 12rpx #666666;
}
.weather-pic{
   display: inline-block;
    width:22%;
    height: 148rpx;
    padding:10rpx;
    text-align: center;
}
.weather-address,.weather-num{
  display: inline-block;
  width:33%;
  height: 148rpx;
  padding:10rpx;
  font-size:22rpx;
}
.weather-pic p,.weather-address p,.weather-num p{
  line-height: 48rpx;
}
.weather-pic img{
  width:126rpx;
  height: 126rpx;
}
.weather-other{
  width:96%;
  font-size:22rpx;
  height: auto;
  margin:10rpx;
  text-align: center;
  border: 2rpx solid #e1e1e1; 
  box-shadow: 4rpx 2rpx 12rpx #666666;
}
.weather-other .left,.weather-other .center,.weather-other .right{
  display: inline-block;
  width: 30%;
  padding:10rpx;
}
.weather-other .left img{
  width:100rpx;
  height: 100rpx;
}
.board-box-top swiper {
  height: 480rpx;
}

.board-box-top swiper image {
  height: 100%;
  width: 100%;
}
.board {
  box-sizing: border-box;
  background-color: #f8f9fb;
}

.board-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 20rpx;
  /* margin: 40rpx 0; */
  padding: 20rpx;
  background-color: #fff;
}

.board-item .title {
  display: flex;
  margin-bottom: 10rpx;
  width: 100%;
}

.board-item .title text {
  flex: 1;
}

.board-item .title image {
  height: 20rpx;
  width: 20rpx;
}

.board-item .content {
  height: 300rpx;
}

.board-item .content .inner {
  display: flex;
  flex-direction: row;
  height: 300rpx;
  width: 900rpx;
}

.board-item .content .inner .movie-item {
  display: flex;
  flex-direction: column;
  width: 150rpx;
  margin: 10rpx;
}

.board-item .content .inner .movie-item image {
  width: 180rpx;
  height: 250rpx;
}

.board-item .content .inner .movie-item text {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.padding20{
  padding: 20rpx;
}
</style>
