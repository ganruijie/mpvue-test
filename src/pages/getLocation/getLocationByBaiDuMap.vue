<template>
  <div>
    <view class="map_container"> 
       123456
    </view> 
    <view class="place_info"> 
    </view> 
  </div>
</template>
<script>
  import locationImg from '../../image/location.png'
  
  export default{
    data:function(){
      return {
        markers: [], 
            latitude: '', 
            longitude: '', 
            placeData: {} ,
            ak:'UvS50GKvzIfsk1cdUxhQIuFXHhqYAkMs',
      }
    },
    components:{

    },
    created(){
      let that = this;
    },
    mounted(){
      let that = this;
    },
    watch:{

    },
    methods:{
      
    }
  }
</script>
<style>
  
</style>