<template>
  <section class="fashionMain">
    <div class="fashion_top">
      <img src="../../assets/image/fashionWeek/top.png" />
    </div>
    <div class="fashion_first">
      <ul>
        <li class="fashion_title">
          <img src="../../assets/image/fashionWeek/first_game.png" />
        </li>
        <li class="fashion_content fashion_swipe" style="margin-right: 0;">
          <van-swipe :show-indicators="false" :width="280" :loop="false" @touchstart.native="stopImmediatePropagation()">
            <van-swipe-item v-for="(item, index) in images" :key="index">
              <div style="padding-right: 20px;">
                <img :src="item.img" @click="goByCmd(item.optionId)" />
              </div>
            </van-swipe-item>
          </van-swipe>
        </li>
      </ul>
    </div>
    <div class="fashion_two">
      <ul>
        <li class="fashion_title">
          <img src="../../assets/image/fashionWeek/two_game.png" />
        </li>
        <li class="fashion_content">
          <img src="../../assets/image/fashionWeek/two_cont.png" @click="goByCmd('35')" />
        </li>
      </ul>
    </div>
    <div class="fashion_creative fashion_content">
      <img src="../../assets/image/fashionWeek/ctreative.png" @click="goByCmd('36')" />
    </div>
    <div class="fashion_fashion fashion_content">
      <img src="../../assets/image/fashionWeek/fashion.png" @click="goByCmd('37')" />
    </div>
    <div class="fashion_content fashion_art">
      <img src="../../assets/image/fashionWeek/art.png" @click="goByCmd('34')" />
    </div>
    <div class="fashion_bottom">
      <img src="../../assets/image/fashionWeek/bottom.png" />
    </div>
    <!-- APP 打开 -->
    <div class="app_entrance" v-if="!isApp">
      <ul>
        <li class="entrance_left">
          <img src="../../assets/image/fashionWeek/share_logo.png" />
        </li>
        <li class="entrance_right" @click="getDownURL">
          <img src="../../assets/image/fashionWeek/bt.png" />
        </li>
      </ul>
    </div>
    <!-- 回到顶部 -->
    <div class="top" @click="toTop" ref="toTop_ref">
      <img src="../../assets/image/mall/top.png">
    </div>

    <button class="share-btn" @click="showShare()">分享活动</button>
  </section>
</template>

<style rel="stylesheet/scss" lang="scss">
  .fashionMain{
    position: relative;
    background: #ffffff;
    img{
      width: 90%;
      vertical-align: top;
    }
    .fashion_top >img{ width: 100%;}
    .fashion_title{
      text-align: center;
    //  margin-top: 2%;
      margin-top: 2.5rem;
      img{
        width: 37%;
      }
    }
    .fashion_content{
      margin-top: 1.5rem;
    //  margin-top: 1%;
      text-align: center;
    }
    .fashion_swipe{
      margin-left: 0.8rem;
      img{
        width: 100%;
      }
    }
    .fashion_bottom{
    //  margin-top: 2%;
      margin-top: 2.5rem;
      text-align: center;
      img{ width: 100%;}
    }
    .van-swipe__track{
       width: 1400px !important;
    }
    .van-swipe-item{
      width: 280px !important;
    }
    .app_entrance{
      position: fixed;
      bottom: 0;
      background: #ffffff;
      padding: 0.5rem 1rem;
      width: 100%;
      li.entrance_left{
        float: left;
        width: 30%;
        padding-top: 5px;
      }
      li.entrance_right{
        float: right;
        width: 30%;
      }
    }
    .top{
      position: fixed;
      bottom: 4rem;
      right: 3%;
      width: 13%;
      z-index: 99;
    }

    .share-btn{
      position: fixed;
      top: 3.75rem;
      right: 0;
      padding: 5px 15px;
      color: white;
      font-size: 14px;
      background: rgba($color: #000000, $alpha: 0.6);
      border: 1px solid transparent;
      border-radius: 16px 0 0 16px;
    }
  }
</style>

<script>
  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'vant'
  Vue.use(Swipe).use(SwipeItem)
  export default {
    name: 'index',
    data () {
      return {
        businessId: undefined,
        shareConfig: {
          link: window.location.protocol + '//' + window.location.host + window.location.pathname + '#/fashionWeek?isApp=0',
          title: 'FASHION PARTY2018•LIBER时尚趴SEE NOW BUY NOW即秀即买',
          desc: 'LIBER时尚周开启即秀即买模式，并结合最新科技展示，同时通过线上直播及各地LIBER时尚周分会场， 同步将当季时尚发布全球...',
          imgUrl: 'https://public.myutopa.com/liber_share_logo_link.png',
          from: '优托邦APP'
        },
        images: [{
          img: require('../../assets/image/fashionWeek/essentiel.png'),
          optionId: '18'
        }, {
          img: require('../../assets/image/fashionWeek/jil.png'),
          optionId: '19'
        }, {
          img: require('../../assets/image/fashionWeek/baum.png'),
          optionId: '12'
        }, {
          img: require('../../assets/image/fashionWeek/silvian.png'),
          optionId: '13'
        }, {
          img: require('../../assets/image/fashionWeek/frankie.png'),
          optionId: '24'
        }],
        isApp: 1
      }
    },
    beforeCreate() {
    },
    created () {
      this.businessId = this.$route.query.businessId
      this.isApp = Number(this.$route.query.isApp)
    },
    mounted () {
      document.title = 'FASHION PARTY'
      this.$refs.toTop_ref.style.display = 'none'
      window.addEventListener('scroll', this._scrollTop)
    },
    // components: {Toast},
    methods: {
      showShare () {
      },
      stopImmediatePropagation () {
        event.stopImmediatePropagation();
      },
      goByCmd () {
      },
      // 回到顶部
      toTop() {
        var scrollToptimer = setInterval(function() {
          var top = document.body.scrollTop || document.documentElement.scrollTop;
          var speed = top / 4;
          top -= speed;
          document.body.scrollTop = document.documentElement.scrollTop = top;
          if (top <= 1) {
            clearInterval(scrollToptimer);
          }
        }, 30);
      },
      // 监听滚动条 是否显示回到顶部
      _scrollTop() {
        let scroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (scroll > 0) {
          this.$refs.toTop_ref.style.display = 'block'
        } else {
          this.$refs.toTop_ref.style.display = 'none'
        }
      },
      /**
       * 打开APP 或者下载APP
       */
      getDownURL () {
        const t = 1000
        let hasApp = true
        let params = {
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '#/fashionWeek?isApp=1'
        }
        setTimeout(() => {
          if (!hasApp) {
            location.href = 'https://www.myutopa.com/m/download'
          }
        }, t * 2)

        let url = 'utopaclient://homepage?data=' + encodeURIComponent(JSON.stringify(params))
        location.href = url
        let t1 = Date.now()

        setTimeout(() => {
          const t2 = Date.now()
          if (t2 - t1 < t + 100) {
            hasApp = false
          }
        }, t);
      }
    }
  }
</script>

