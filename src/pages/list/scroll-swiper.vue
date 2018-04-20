<template>
	<view >
	    <scroll-view scroll-x="true" class="tab-h" :scroll-left="scrollLeft">
	        <view :class="['tab-item',(currentTab=='0'?'active':'')]" data-current="0" @click="swichNav">健康</view>
	        <view :class="['tab-item',(currentTab=='1'?'active':'')]" data-current="1" @click="swichNav">情感</view>
	        <view :class="['tab-item',(currentTab=='2'?'active':'')]" data-current="2" @click="swichNav">职场</view>
	        <view :class="['tab-item',(currentTab=='3'?'active':'')]" data-current="3" @click="swichNav">育儿</view>
	        <view :class="['tab-item',(currentTab=='4'?'active':'')]" data-current="4" @click="swichNav">纠纷</view>
	        <view :class="['tab-item',(currentTab=='5'?'active':'')]" data-current="5" @click="swichNav">青葱</view>
	        <view :class="['tab-item',(currentTab=='6'?'active':'')]" data-current="6" @click="swichNav">全部</view>
	        <view :class="['tab-item',(currentTab=='7'?'active':'')]" data-current="7" @click="swichNav">其他</view>
	    </scroll-view>
	    <swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" v-bind:style="{ height: winHeight+'rpx'}">
	        <swiper-item v-for="(item,index) in numArr" :key="index" >
				<block v-if="index != 7">
		            <scroll-view :scroll-y="true" class="scoll-h" >
		                <block v-for="(item,i) in numArr" :key="i">
		                    <view class="item-ans">
		                        <view class="avatar">
		                            <image class="img" src="http://ookzqad11.bkt.clouddn.com/avatar.png"></image>
		                        </view>
		                        <view class="expertInfo">
		                            <view class="name">{{expertList[0].name}}</view>
		                            <view class="tag">{{expertList[0].tag}}</view>
		                            <view class="answerHistory">{{expertList[0].answer}}个回答，{{expertList[0].listen}}人听过 </view>
		                        </view>
		                        <navigator url="/pages/askExpert/expertDetail" class="askBtn">问TA</navigator> 
		                    </view>
		                </block>
		            </scroll-view>
	            </block>
	        </swiper-item>
	        <swiper-item v-if="currentTab=='7'">
	        	<view>
	        		<mapVue></mapVue>
	        		<!-- <getLocationByBaiDuMap></getLocationByBaiDuMap> -->
	        	</view>
	        </swiper-item>
	    </swiper>
	</view>
</template>
<script>
	import mapVue from '../counter/index.vue' 
	import getLocationByBaiDuMap from '../getLocation/getLocationByBaiDuMap.vue'
	export default{
		data(){
			return {
				numArr:[0,1,2,3,4,5,6],
		        winHeight:"",//窗口高度
		        currentTab:"0", //预设当前项的值
		        scrollLeft:0, //tab标题的滚动条位置
		        expertList:[{ //假数据
		            img:"avatar.png",
		            name:"欢顔",
		            tag:"知名情感博主",
		            answer:134,
		            listen:2234
		        }]
			}
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
		},
		methods:{
			// 滚动切换标签样式
		    switchTab:function(e){
		        this.currentTab = e.mp.detail.current
		        this.checkCor();
		    },
		    // 点击标题切换当前页时改变样式
		    swichNav:function(e){
		        var cur=e.target.dataset.current;
		        if(this.currentTaB==cur){return false;}
		        else{
		            this.currentTab = cur
		        }
		    },
		    //判断当前滚动超过一屏时，设置tab标题滚动条。
		    checkCor:function(){
		      if (this.currentTab>4){
		          this.scrollLeft = 300
		      }else{
		         this.scrollLeft = 0
		      }
		    },
		},
		components:{
			mapVue,
			getLocationByBaiDuMap
		}
	}
</script>
<style scoped>
.tab-h{
    height: 80rpx;
    width: 100%; 
    box-sizing: border-box;
    overflow:hidden;
    line-height: 80rpx;
    background: #F7F7F7; 
    font-size: 16px; 
    white-space: nowrap;
    position: fixed;
    top: 0; 
    left: 0; 
    z-index: 99;
}
.tab-item{
	margin:0 36rpx;
	display: inline-block;
}
.tab-item.active{
	color: #4675F9;
	position: relative;
}
.tab-item.active:after{ 
	content: "";
	display: block;
	height: 8rpx;
	width: 52rpx;
	background: #4675F9;
	position: absolute; 
	bottom: 0;
	left: 5rpx;
	border-radius: 16rpx;
}
.item-ans{ 
	width: 100%;
	display: flex; 
	flex-grow: row no-wrap;
	justify-content: space-between; 
	padding: 30rpx;
	box-sizing: border-box; 
	height: 180rpx;
	align-items: center;
	border-bottom: 1px solid #F2F2F2;
}
.avatar{
	width: 100rpx;
	height: 100rpx;
	position: relative;
	padding-right: 30rpx;
}
.avatar .img{
	width: 100%;
	height: 100%;
}
.avatar .doyen{
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	bottom: -2px;
	right: 20rpx;
}
.expertInfo{
	font-size: 12px;
	flex-grow: 2;
	color: #B0B0B0;
	line-height: 1.5em;
}
.expertInfo .name{
	font-size: 16px;
	color:#000;
	margin-bottom: 6px;
}
.askBtn{ 
	width: 120rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	font-size: 14px; 
	border-radius: 60rpx;
	border: 1px solid #4675F9; 
	color:#4675F9;
}
.tab-content{margin-top: 80rpx;}
.scoll-h{
	height: 100%;
}
</style>