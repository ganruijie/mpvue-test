import request from './request'
import wx from './wx'
/**
 * 榜单：
 * Top 250：
 *  接口地址: top250
 *  要求权限：movie_basic_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {number} count=20 获取数量
 *
 * 北美票房榜：
 *  接口地址：us_box
 *  要求权限：movie_basic_r
 *
 * 正在上映：
 *  接口地址: in_theaters
 *  要求权限：movie_premium_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {count} count=20 获取数量
 *    @params {string} city=北京 城市
 *
 * 即将上映：
 *  接口地址: coming_soon
 *  要求权限：movie_premium_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {number} count=20 获取数量
 *
 * 口碑榜 -> weekly （movie_advance_r）
 * 新片榜 -> new_movies（movie_advance_r）
 */
export function getBoardData({board = 'top250',page = 1,count = 20,city = '北京',search = ''}={}){
    let params = {}
    if(board !== 'us_box'){
        params.start = (page-1)*count
        params.count = count
    }
    if(board === 'in_theaters'){
        params.city = city
    }
    if(board === 'search'){
        params.q = search
    }
    return request.get(`/${board}`,params)
}

/**
 * 获取电影条目信息：
 *  接口地址: subject/:id
 *  要求权限：movie_basic_r
 *  可传参数：
 *    @params {number} id 电影id
 */

export function getMovieData(id){
	return request.get(`/subject/${id}`)
}

export function getRankingList({type=0}={}){
    var rangList=1212;
    wx.request({
        url: 'http://119.29.214.133:3000/top/list',
        data: {
            idx:type
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
            if(res.statusCode == 200){
                if(res.data.playlist.tracks){
                    rangList = res.data.playlist.tracks;
                }
            }
        },
        fail: function (error) {
            // fail
            wx.showToast(error)
          },
    })
    console.log(rangList,'aaaaaaaaaaaaaaaaaaaaaa')
    return rangList;
}