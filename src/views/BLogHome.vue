<template>
    <section class="main-home-body">
        <section class="main-home-body-top" :class="{'main-animation_1' : emitAnimation_1}">
            <div class="main-home-body-top-content">
                <span>Thoughts, stories and ideas</span>
                <span>The man who would climb the ladder must begin at the bottom</span>
            </div>
        </section>
        <section class="main-home-body-center" id="main-home-body-center">
            <div class="main-home-body-slot"></div>
            <div class="main-home-body-center-text">
                <!--个人简介-->
            </div>
            <div class="main-home-body-center-left">
                <div></div>
                <div></div>
            </div>
        </section>
        <section class="main-home-body-bottom">
            <section class="main-home-body-bottom-top">
                <div class="main-home-body-slot"></div>
                <div class="main-home-body-bottom-text">
                    Articles
                </div>
            </section>

            <section class="main-home-body-categories" :class="{'main-animation_2' : emitAnimation_2}">
                <section class="main-home-body-categories-left">
                    <div class="article-categories">
                        <img src="../assets/category_1.jpg" alt="">
                        <span>About JS</span>
                        <category-com :articleType="1"></category-com>
                    </div>
                    <div class="article-categories">
                        <img src="../assets/category_3.jpg" alt="">
                        <span>About CSS</span>
                        <category-com :articleType="2"></category-com>
                    </div>
                </section>
                <section class="main-home-body-categories-right">
                    <div class="article-categories">
                        <img src="../assets/category_2.jpg" alt="">
                        <span>About Node</span>
                        <category-com :articleType="3"></category-com>
                    </div>
                    <div class="article-categories">
                        <img src="../assets/category_1.jpg" alt="">
                        <span>About Life</span>
                        <category-com :articleType="4"></category-com>
                    </div>
                </section>

            </section>

        </section>
    </section>
</template>

<script>
import { getUser } from '@/api/user.js';
import categoryCom from '@/components/Category'

export default {
    props: {},
    data() {
        return {
            emitAnimation_1: false,//触发动画
            emitAnimation_2: false,//触发动画   
        }
    },
    activated() {
        this.getBasicInfo();
        this.test();
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
    },
    methods: {
        test() {
            // function foo(){
            //     console.log(this.a);
            // }
            // var a = 2;
            // var o = {a: 3,foo:foo};
            // var p = {a: 4};
            // o.foo(); //3
            // (p.foo = o.foo)();
            // function foo() {
            //     console.log(this.a);
            // }
            // var a = 2;
            // foo(); // 2 
        },
        handleScroll: function() {
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;//可视窗口高度
            let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条到顶部的距离
            if (scrollHeight > 440) {
                this.emitAnimation_1 = true;
            }
            if (scrollHeight > 700) {
                this.emitAnimation_2 = true;
            }
        },
        getBasicInfo() {
            getUser({}).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }

    },
    watch: {},
    computed: {},
    components: {
        categoryCom,
    },
}
</script>
<style lang="scss" scoped>
.article-categories {
    text-align: left;
    span {
        display: inline-block;
        margin: 20px 0;
        width: 100%;
        text-align: center;
        font-size: 20px;
    }
}
</style>