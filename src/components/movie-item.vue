<template>
  <div class="md-list-item">
    <view class="item">
      <image class="poster" :src="movie.images.small"></image>
      <view class="meta">
        <text class="title">{{ movie.title }}</text>
        <text class="sub-title">{{ movie.original_title }} ({{ movie.year }})</text>
        <view class="artists">导演：<block v-for="(director, i) in movie.directors" :key="director.id"> {{ director.name }} </block></view>
        <view v-if="movie.genres">
          <block v-for="(tag,x) in movie.genres" :key="x">
            <span class="movie-tag">{{tag}}</span>
          </block>
        </view>
      </view>
      <view class="rating">
        <text>{{ movie.rating.average }}</text>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
    default () {
      return {}
    }
  }
}
</script>

<style>
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
