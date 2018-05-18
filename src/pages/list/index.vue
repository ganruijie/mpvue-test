<template>
	<div class="md-list">
    	<movie-list :movies="movies" :hasMore="hasMore" :type="type"></movie-list>
  </div>
</template>

<script>
	import { mapState , mapActions , mapMutations} from 'vuex'
	import wx from '../../utils/wx'
	import MovieList from '../../components/movie-list'
	import { LIST_CLEAR_STATE } from '../../store/mutations-type'
	
	export default{
		data(){
			return{
				type:''
			}
		},
		components:{
			MovieList
		},
		computed:{
			...mapState('list',['movies','hasMovie','type'])
		},
		methods:{
			...mapMutations('list',{clearState:LIST_CLEAR_STATE}),
			...mapActions('list',['getMovies']),
			async getMovieList(){
				await this.getMovies({type:this.type})
			}
		},
		mounted(){
			const {title,type} = this.$root.$mp.query;
			console.log(type,'4545454545')
			wx.setNavigationBarTitle({title:title}) 
			this.type = type;
			this.getMovieList();
		},
		async onPullDownRefresh(){//下拉刷新
			this.clearState()
			await this.getMovieList()
			wx.stopPullDownRefresh()
		},
		onReachBottom(){//上拉加载
			this.getMovieList()
		},
		onUnload(){
			this.clearState()
		}
	}
</script>

<style>
</style>