<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"/>
    <good-list :goods="showGoods"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import GoodList from "../../components/content/goods/GoodsList";

  export default {
    name: "Home",
    components: {
      GoodList,
      HomeSwiper,
      RecommendView,
      NavBar,
      TabControl
    },
    data() {
      return {
        //result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0,list: []},
          'new': {page:0,list: []},
          'sell': {page:0,list: []}
        },
        currentType: 'pop'
      }
    },
    created() {
      //1.请求轮播图和推荐的数据  created是创建时的生命周期，一般不要在这里面写太多代码
      //this.getHomeMultidata调用的是method里的，method里的getHomeMultidata调用的是network里的方法
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //this.result=res;  一般不请求所有，有什么就调用什么
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        //软解码获取页数
        const page=this.goods[type].page+1;
        getHomeMultidata(type,page).then(res => {
          //当数据很多时，可以用...会自动解构成遍历
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page+=1;
        })
      },
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>