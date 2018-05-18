<template>
  <div class="md-item">
    <image v-if="movie.images" class="background" :src="movie.images.large" mode="aspectFill"/>
    <block v-if="movie.title">
      <view class="meta">
        <image class="poster" :src="movie.images.large" mode="aspectFit"/>
        <p class="title">{{ movie.title }}({{ movie.year }})</p>
        <p class="info">评分：{{ movie.rating.average }}</p>
        <p class="info">导演：
          <block v-for="director in movie.directors" :key="director.id">
            {{ director.name }} </block>
          </p>
        <p class="info">主演：
          <block v-for="cast in movie.casts" :key="cast.id"> 
            {{ cast.name }} </block>
        </p>
        <p class="info">类型：
          <block v-for="(tag,x) in movie.genres" :key="x">
            {{tag}}
          </block>
        </p>
        <p v-if="movie.aka.length" class="info">别名：
          <block v-for="(aka,y) in movie.aka" :key="y">{{y==movie.aka.length-1?aka:aka+'/'}}</block>
        </p>
      </view>
      <view class="summary">
        <p class="label">摘要：</p>
        <p class="content">{{ movie.summary }}</p>
      </view>
    </block>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { ITEM_CLEAR_MOVIE } from '@/store/mutations-type'
import wx from '@/utils/wx'

export default {
  data () {
    return {
      id: null
    }
  },

  computed: {
    ...mapState('item', {
      movie: state => state.movie
    })
  },

  methods: {
    ...mapActions('item', [
      'getMovie'
    ]),
    ...mapMutations('item', {
      clearMovie: ITEM_CLEAR_MOVIE
    }),
    async getMovieData (id) {
      await this.getMovie({ id })
      wx.setNavigationBarTitle({ title: this.movie.title })
    }
  },

  mounted () {
    const id = this.$root.$mp.query.id
    if (!id) {
      return wx.navigateBack()
    }
    this.id = id
    this.getMovieData(id)
  },

  onUnload () {
    this.clearMovie()
  }
}
</script>

<style>
.meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50rpx 40rpx;
}

.poster {
  width: 100%;
  height: 800rpx;
  margin: 20rpx;
}

.title {
  font-style: 42rpx;
  color: #444;
}

.info {
  font-size: 24rpx;
  color: #888;
  margin-top: 20rpx;
  width: 80%;
}

.summary {
  width: 80%;
  margin: 0rpx auto;
}

.label {
  display: block;
  font-size: 30rpx;
  margin-bottom: 10rpx;
}

.content {
  color: #666;
  font-size: 22rpx;
  padding: 2em;
}

.background {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: -1000;
  opacity: .1;
}
.movie-tag{
  color: #f65858;
  font-size: 22rpx;
  border: 2rpx solid #f65858;
  padding: 2rpx 6rpx;
  display: inline-block;
  border-radius: 10rpx;
  margin-right: 10rpx;
}
</style>
