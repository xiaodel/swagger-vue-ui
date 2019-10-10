<template>
    <div class="components-aside">
        <div class="aside">
            <div class="list-item" v-if="menuList.length" v-for="parent in menuList">
                <div class="parent-item" @click=" parent.show = !parent.show"
                     :title="parent.tags+' - '+parent.count+'条'">
                    <div class="left">
                        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="5093">
                            <path d="M716.2 891.7c-96.8 0-175.5-78.7-175.5-175.5V568.4c0-15.3 12.4-27.7 27.7-27.7h147.8c96.8 0 175.5 78.7 175.5 175.5s-78.8 175.5-175.5 175.5z m0-27.7c81.5 0 147.8-66.3 147.8-147.8s-66.3-147.8-147.8-147.8H568.3v147.8c0 81.5 66.3 147.8 147.9 147.8z m-28.1-73.9M891.6 309.9c0 96.7-78.7 175.5-175.5 175.5H568.3c-15.3 0-27.7-12.4-27.7-27.7V309.9c0-96.7 78.7-175.5 175.5-175.5s175.5 78.8 175.5 175.5zM716.2 162.1c-81.5 0-147.8 66.3-147.8 147.8v147.8h147.8c81.5 0 147.8-66.3 147.8-147.8s-66.3-147.8-147.8-147.8z m-28.1 74M134.4 716.2c0-96.7 78.7-175.5 175.5-175.5h147.8c15.3 0 27.7 12.4 27.7 27.7v147.8c0 96.7-78.7 175.5-175.5 175.5S134.4 813 134.4 716.2zM309.8 864c81.5 0 147.8-66.3 147.8-147.8V568.4H309.8c-81.5 0-147.8 66.3-147.8 147.8S228.3 864 309.8 864z m28.1-73.9M309.8 134.5c96.8 0 175.5 78.7 175.5 175.5v147.8c0 15.3-12.4 27.7-27.7 27.7H309.8c-96.8 0-175.5-78.7-175.5-175.5s78.8-175.5 175.5-175.5z m0 27.6c-81.5 0-147.8 66.3-147.8 147.8s66.3 147.8 147.8 147.8h147.8V309.9c0.1-81.5-66.2-147.8-147.8-147.8z m28.1 74"
                                  :fill="parent.show?'#3259CE':''" p-id="5094"></path>
                            <rect x="50" y="50" transform="translate(200,200)scale(1.2,1.2)" width="200" height="50"
                                  fill="red"/>
                        </svg>
                        <span class="title">{{parent.tags}}</span>
                    </div>
                    <span class="count">{{parent.count}}</span>
                </div>
                <div class="children">
                    <div class="children-item" v-show="parent.show" v-for="children in parent.list"
                         @click="bindTabs(children)" :title="children.desc+' '+children.url">
                        <div class="item">
                            <div class="title">
                                <span class="type" :style="'color:'+requestType(children.type)">{{children.type}}</span>
                                <span class="desc">{{children.desc}}</span>
                            </div>
                            <div class="url">{{children.url}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    import {mapState} from 'vuex'

    export default {
        name: 'Header',
        computed: {
            ...mapState(['menuList', 'tabsList']),
        },
        methods: {
            bindTabs(item) {
                let tab = this.tabsList.filter(v => item.url === v.url);
                if (tab.length === 0) {
                    console.error('bindTabs Aside.vue',item)
                    this.$store.commit('ADD_TABS_LIST', item);
                }
            },
            requestType(newV) {
                switch (newV.toLowerCase()) {
                    case 'get':
                        return '#8fb3d6';
                    case 'post':
                        return '#d4724e';
                    case 'put':
                        return '#c5c5c5';
                    case 'delete':
                        return '#ee6270';
                    case 'patch':
                        return '#FFDEAD';
                    case 'head':
                        return '#D8BFD8';
                    case 'options':
                        return '#D1EEEE';
                    default :
                        return '#E9967A'
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .components-aside {
        border-bottom: 1px solid @global-border-color-1;

        .aside {
            width: 100%;
            background-color: @global-basics-color-2;

            .list-item {
                .parent-item {
                    position: relative;
                    padding: 0.6rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    border-top: 1px dashed @global-border-color-2;
                    border-bottom: 1px dashed @global-border-color-2;

                    .left {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .icon {
                            height: 1rem;
                            width: 1rem;
                            object-fit: cover;
                        }

                        .title {
                            margin-left: 0.5rem;
                            color: @global-text-color-1;
                            font-weight: 700;
                            font-size: 0.9rem;
                        }
                    }

                    .count {
                        float: right;
                        background-color: @global-text-color-4;
                        color: @global-basics-color-2;
                        border-radius: 1rem;
                        padding: 0.2rem;
                        height: 1rem;
                        min-width: 1rem;
                        font-size: 0.7rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-shrink: 0;
                        user-select: none;
                    }

                }

                .children {

                    .children-item:before {
                        content: "";
                        display: block;
                        position: absolute;
                        z-index: 1;
                        left: -0.2rem;
                        top: 0;
                        bottom: 0;
                        border: 1px dotted @global-border-color-1;
                        border-width: 0 0 0 1px;
                    }

                    .children-item {
                        position: relative;
                        font-size: 0.8rem;
                        margin-left: 1.5rem;
                        padding: 0.3rem 0 0.3rem 1rem;
                        border-top: 1px dotted @global-border-color-1;
                        cursor: pointer;

                        .item:before {
                            content: "";
                            display: inline-block;
                            position: absolute;
                            width: 0.5rem;
                            top: 1rem;
                            left: -1rem;
                            border-top: 1px dotted @global-border-color-1;
                        }

                        .item {
                            position: relative;
                            color: @global-text-color-1;

                            .title {
                                display: flex;
                                align-items: center;

                                .type {
                                    font-weight: 700;
                                }

                                .desc {
                                    margin-left: 1rem;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
