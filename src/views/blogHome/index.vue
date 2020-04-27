<template>
  <section>
    <a href="https://github.com/AustinWen0530" target="_blank" class="fork-me-link">
      <img
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>
    <div class="blog-bg">
      <div class="blog-bg-txt">
        <span class="blog-bg-txt-title">Hello, I'm Austin Wen</span>
        <br />
        <span class="blog-bg-txt-subtitle">一名前端开发工程师</span>
        <div class="blog-bg-txt-btn">
          <el-button class="me-btn">关于我</el-button>
          <el-button class="me-opus" @click="$router.push('/itemPark')">我的作品</el-button>
        </div>
      </div>

      <div class="blog-bg-book">
        <div class="blog-bg-book-cover">
          <img src="../../assets/book-liweier-01.jpg" />
        </div>
        <div class="blog-bg-book-content">
          <h2>个人信息</h2>
          <p>姓名：温正官</p>
          <p>性别：男</p>
          <p>爱好：电影、动漫、游戏</p>
          <p>联系方式：13868453033</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "blogHome",
  data() {
    return {};
  },
  created() {},
  methods: {},
  watch: {},
  computed: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.fork-me-link {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
}
.blog-bg {
  min-height: 773px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../../assets/bg-juren-01.jpg");
  position: absolute;
  width: 100%;
  height: 100%;
  // opacity: 0.9;
  top: 0;
  left: 0;
  animation: myBgAnimation 5s infinite;
  .blog-bg-txt-btn {
    /deep/ .el-button {
      width: 120px;
    }
    .me-btn {
      background-color: #2c3e50;
      color: #fff;
    }
    .me-opus {
      background-color: #fff;
      color: #2c3e50;
      border: 1px solid #2c3e50 !important;
    }
  }
}
@keyframes myBgAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.blog-bg-txt {
  font-family: Georgia, "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", STXihei,
    "\534E\6587\7EC6\9ED1", serif;
  color: #fff;
  text-align: center;
  font-size: 80px;
  position: absolute;
  width: 100%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  .blog-bg-txt-subtitle {
    font-size: 40px;
  }
  animation: myTxtAnimation 3s;
}

@keyframes myTxtAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.blog-bg-book-cover {
  img {
    width: 100%; /* 宽 */
  }
}

.blog-bg-book {
  position: absolute; /* 绝对定位 */
  top: 60%; /* 距上部 */
  left: 20%; /* 距左部 */
  width: 200px;
  height: 300px;
  background: #fff;
  transform-style: preserve-3d; /* 开启3D空间 */
  transform: translate(-50%, -50%) perspective(2000px); /* 移动X,Y */
  box-shadow: inset 300px 0 50px rgba(0, 0, 0, 0.5),
    0 20px 100px rgba(0, 0, 0, 0.5); /*阴影*/
  transition: 1s;
}
.blog-bg-book:hover {
  transform: translate(-50%, -50%) perspective(2000px) rotate(-10deg);
  box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5),
    0 10px 100px rgba(0, 0, 0, 0.5);
}
.blog-bg-book::before {
  /*上边框*/
  content: "";
  position: absolute;
  top: -5px;
  left: 1px;
  width: 101%;
  height: 5px;
  z-index: 10;
  background: #0c1826;
  transform: skewX(-45deg); /*X轴扭曲*/
}
.blog-bg-book::after {
  /*右边框*/
  content: "";
  position: absolute;
  top: -64px;
  right: -4px;
  width: 3px;
  height: 142%;
  background-color: #334251;
  -webkit-transform: skewX(-45deg) rotate(-225deg);
  transform: skewX(-45deg) rotate(-225deg);
}
.blog-bg-book .blog-bg-book-cover {
  /*图片*/
  user-select: none; /*不可选取*/
  width: 100%;
  height: 100%;
  position: relative;
  transform-origin: left; /*更改元素变形位置*/
  transition: 1s cubic-bezier(0.15, 1.7, 0.84, 0.58);
}
.blog-bg-book:hover .blog-bg-book-cover {
  transform: rotateY(-155deg); /*Y轴转动*/
}
.blog-bg-book .blog-bg-book-content {
  /*文本效果*/
  background: url("../../assets/book-liweier-02.jpg") no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 20px;
  z-index: -1;
  height: 100%;
  color: #FFF;
  h2{
    margin-bottom: 10px;
  }
  p{
    margin-bottom: 5px;
  }
}
</style>
