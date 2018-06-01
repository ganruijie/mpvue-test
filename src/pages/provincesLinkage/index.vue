<template>
    <view>
        <view class="container">
            <view class="input">
                <input placeholder="选择" :value="province+'-'+city+'-'+county"  v-focus/>
            </view>
        </view>
        <view class="citypicker">
            <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="value" @change="bindChange" class="citybody">
                <view class="cityheader">
                    <view @click="open" class="city-cancel">取消</view>
                    <view @click="open" class="city-true">确定</view>
                </view>
                <picker-view-column>
                    <view v-for="(item,index) in provinces" :key="index" style="line-height: 50px;padding-left:10px;">{{item}}</view>
                </picker-view-column>
                <picker-view-column>
                    <view v-for="(cityName,i) in citys" :key="i" style="line-height: 50px;padding-left:10px;">{{cityName}}</view>
                </picker-view-column>
                <picker-view-column>
                    <view v-for="(cou,x) in countys" :key="x" style="line-height: 50px;padding-left:10px;">{{cou}}</view>
                </picker-view-column>
            </picker-view>
        </view>
    </view>
</template>
<script>
import cityData from '../../components/js/cityData'
export default {
    data(){
        return{
            cityData:cityData,
            provinces: [],
            province: "",
            citys: [],
            city: "",
            countys: [],
            county: '',
            value: [0, 0, 0],
            values: [0, 0, 0],
            condition: false
        }
    },
    directives:{
        focus:{
            inserted:function(el){
                el.focus();
                this.open();
            }
        }
    },
    mounted(){
         let _this = this;
         _this.init();
    },
    methods:{
        init(){
            let _this = this;
            let cityData = _this.cityData;
            const provinces = [];
            const citys = [];
            const countys = [];

            for(let i=0;i<cityData.length;i++){
                provinces.push(cityData[i].name);
            }
            console.log('省份完成');
            for (let i = 0 ; i < cityData[0].sub.length; i++) {
                citys.push(cityData[0].sub[i].name)
            }
            console.log('city完成');
            for (let i = 0 ; i < cityData[0].sub[0].sub.length; i++) {
                countys.push(cityData[0].sub[0].sub[i].name)
            }

            _this.provinces = provinces;
            _this.citys = citys;
            _this.countys = countys;
            _this.province = cityData[0].name;
            _this.city = cityData[0].sub[0].name;
            _this.county = cityData[0].sub[0].sub[0].name
            console.log('初始化完成');
        },
        bindChange(e) {
            console.log(e);
            let _this = this;
            let val = e.target.value
            let t = _this.values;
            let cityData = _this.cityData;
            
            if(val[0] != t[0]){
                console.log('province no ');
                const citys = [];
                const countys = [];

                for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
                    citys.push(cityData[val[0]].sub[i].name)
                }
                for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
                    countys.push(cityData[val[0]].sub[0].sub[i].name)
                }

                _this.province = _this.provinces[val[0]];
                _this.city = citys;
                _this.county = cityData[val[0]].sub[0].sub[0].name;
                _this.values = val;
                _this.value = [val[0],0,0]
    
                return;
            }
            if(val[1] != t[1]){
                console.log('city no');
                const countys = [];

                for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
                    countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
                }
                
                _this.city = _this.citys[val[1]];
                _this.county = cityData[val[0]].sub[val[1]].sub[0].name;
                _this.countys = countys;
                _this.values = val;
                _this.value = [val[0],val[1],0];
                return;
            }
            if(val[2] != t[2]){
                console.log('county no');
                _this.county = _this.countys[val[2]];
                _this.values = val;
                _this.value = [val[0],val[1],val[2]];
                return;
            }
            

        },
        open(){
            let _this = this;
            _this.condition = !_this.condition
        },
    }
}
</script>

<style scoped>
.container {
  position: absolute;
  height: 100%;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  box-sizing: border-box;
  background-color: #f8f8f8;
} 

.citypickers{
  position: fixed;
  height: 100%;
  width: 100%;
  min-height: 100%;
  background-color: red;
}

.citypicker{
  
}
.citybody {
  position: fixed;
  bottom: 0px;
}

.cityheader {
  position: absolute;
  top:0px;
  width: 100%;
  z-index: 4;
}

.city-cancel {
  float: left;
  margin: 20rpx;
  color: #818181;
}

.city-true {
  float: right;
  margin: 20rpx;
  color: #2FB42E
}

.section .picker {
  background-color: #fff;
  border-bottom: 1px #d9d9d9 solid;
  border-top: 1px #d9d9d9 solid;
  padding: 20rpx;
}

.input {
  padding-top: 300rpx;
  width: 100%;
}

.input input {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px #d9d9d9 solid;
  border-top: 1px #d9d9d9 solid;
  padding: 20rpx 50rpx;
}

.section {
  padding-top: 20rpx;
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
  margin-top: 200px;
}
</style>
