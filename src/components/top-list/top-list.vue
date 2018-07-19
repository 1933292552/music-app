<template>
  <transition name="slide">
    <music-list :rank="rank" :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getDetailToplist} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    data() {
      return {
        songs: [],
        rank: true,
      }
    },
    created() {
      this._getDetailToplist()
      // setTimeout(() => {
      //   this._getDetailToplist()
      // }, 5000)
    },
    methods: {
      _getDetailToplist() {
        if (!this.topList.id) {
          this.$router.push({
            path: `/rank`,
          })
        }
        getDetailToplist(this.topList.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._nornalizeSongs(res.songlist)
          }
        })
      },
      _nornalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
    },
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
          'topList',
      ])
    },  
    components: {
      MusicList,
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>