<template>
    <section>

        <div class="back-btn">
            <i class="el-icon-back" @click="$router.push('/')"></i>
        </div>
        <section class="articles-detail">
            <section class="articles-detail-left">
                <category-com :articleType="itemDetail.articleType" :isDetail="true" :hignLightLi="itemDetail._id" @get-item-detail="getItemDetail"></category-com>
            </section>
            <section class="articles-detail-right">
                <p class="articles-detail-right-title">{{itemDetail.title}}</p>
                <p>{{itemDetail.date | parseTime}}</p>
                <section class="articles-detail-content" v-html="itemDetail.content"></section>
            </section>
        </section>
    </section>
</template>

<script>
import { getArticleById } from '@/api/article.js';
import categoryCom from '@/components/Category'

export default {
    props: {},
    data() {
        return {
            itemId: '',
            itemDetail: {

            },
        }
    },
    created() {
        this.itemId = this.$route.params.id;
        this.getItemDetail(this.itemId);
    },
    mounted() { },
    methods: {
        getItemDetail(id) {
            getArticleById({
                params: {
                    _id: id
                }
            }).then(res => {
                if (res) {
                    console.log(res);
                    this.itemDetail = res.data;
                }
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
$border_color: #febc73;
$border_dcolor: #e98562;

.back-btn {
    height: 50px;
    width: 50px;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 50px;
    color: $border_color;
    border: 1px solid #f7f7ef;
    border-radius: 50%;
    transition: font-size 0.3s;
    &:hover {
        cursor: pointer;
        font-size: 24px;
        color: $border_dcolor;
    }
}

.articles-detail {
    display: flex;
    .articles-detail-left {
        width: 270px;
        height: 400px;
        border-radius: 4px;
        border: 2px solid #febc73;
        margin-right: 40px;
    }
    .articles-detail-right {
        width: 100%;
        height: 100%;
        min-height: 400px;
        border-radius: 4px;        
        border: 2px solid #febc73;
        p {
            margin-bottom: 20px;
        }
        .articles-detail-right-title {
            font-size: 30px;
        }
        .articles-detail-content {
            text-align: left;
            padding: 20px 40px;
        }
    }
}
</style>