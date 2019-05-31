<template>
    <section class="categories-box">
        <ul>
            <li v-for="item in categoryData" :class= "{ 'hignlight' : item._id == hignLightLi }" :key="item._id" @click="toItemDetail(item._id)">
                {{item.title}}
            </li>
        </ul>
    </section>
</template>

<script>
import { getArticleByType, getArticleById } from '@/api/article.js';


export default {
    props: {
        articleType: {
            type: Number,
            default: 1
        },
        isDetail: { //是否是详情页的目录,默认否
            type: Boolean,
            default: false
        },
        hignLightLi: {//是否高亮当前目录,默认否
            type: String,
        }
    },
    data() {
        return {
            categoryData: [],//文章分类数据
        }
    },
    created() {
        this.getArticles();
    },
    methods: {
        getArticles() {
            // getArticleByType({
            //     params: {
            //         articleType: this.articleType
            //     }
            // }).then(res => {
            //     if (res) {
            //         this.categoryData = res.data;
            //     }
            // }).catch(err => {
            //     console.log(err);
            // })
        },
        toItemDetail(id) {
            // if (!this.isDetail) { //如果非详情页,即首页
            //     this.$router.push({
            //         path: `/itemDetail/${id}`,
            //     })
            // }else{
            //     this.$emit('get-item-detail',id);
            // }
        }
    },
    watch: {},
    computed: {},
    components: {},
}
</script>
<style lang="scss" scoped>
.categories-box {
    padding: 30px 20px;
    ul {
            text-align: left;
        li {
            margin-bottom: 10px;
            font-size: 14px;
            font-family: Serif;
            font-weight: 600;
            list-style: circle;
            cursor: pointer;
        }
    }
    .hignlight{
        color:#e98562;
    }
}
</style>