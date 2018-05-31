import {getBoardData,getRankingList} from '../../utils/api'
import {BOARD_MOVIE_LIST,LIST_MUSIC_LIST} from '../mutations-type'
import {Ajax} from '../../utils/ajax'
import wx from '../../utils/wx'

const state = {
        boards:[
            {key:'top250'},
            // {key:'us_box'},
            {key:'in_theaters'},
            {key:'coming_soon'}
        ],
        rangs:[
            {key:'云音乐新歌榜'},
            {key:'云音乐热歌榜'},
            {key:'美国Billboard周榜'},
            {key:'香港电台中文歌曲龙虎榜'}
        ],
        movies:[],
        music:[],
}
const mutations = {
    [BOARD_MOVIE_LIST](state,{boards}){
        let data
        state.boards = state.boards.map((board,i)=>{
            data = boards[i]
            board.title = data.title
            board.movies = data.subjects
            return board
        })
        state.movies = state.boards[0].movies
    },
    [LIST_MUSIC_LIST](state,{musicRang}){
        let data;
        state.boards = state.rangs.map((rang,i)=>{
            data = musicRang[i]
            // rang.title = data.title
            // rang.music = data.subjects
            console.log(data,rang,'4545454545')
            return rang
        })
        state.music = music;
        
    }
}

const actions = {
    async getBoards ({state,commit},localName){
        const tasks = state.boards.map(board =>{
            if(board.key === 'in_theaters'){
                return getBoardData({board:board.key,page:1,count:10,city:localName})
            }else{
                return getBoardData({board:board.key,page:1,count:10,city:localName})
            }
        })
        let boards = await Promise.all(tasks)
        commit(BOARD_MOVIE_LIST,{boards})
    },
    async getMusic({state,commit}){
        
        const rangList =state.rangs.map(rang=>{
            if(rang.key === '云音乐新歌榜'){
                return getRankingList({type:0})
            }else  if(rang.key === '云音乐热歌榜'){
                return getRankingList({type:1})
            }else if(rang.key === '美国Billboard周榜'){
                return getRankingList({type:6})
            }else if(rang.key === '香港电台中文歌曲龙虎榜'){
                return getRankingList({type:16})
            }
        })
        console.log(getRankingList({type:1}),'89898989')
        commit(LIST_MUSIC_LIST,{rangList}) 
    }
} 
export default {
    state,
    mutations,
    actions
}