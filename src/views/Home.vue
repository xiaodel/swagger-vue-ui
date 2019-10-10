<template>
    <a-layout class="components-layout-demo-top-side-2">
        <a-layout-header class="header">
            <div class="logo"/>
            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :defaultSelectedKeys="['2']"
                    :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">nav 1</a-menu-item>
                <a-menu-item key="2">nav 2</a-menu-item>
                <a-menu-item key="3">nav 3</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout class="ant-row">
            <a-layout-sider
                    class="ant-col-xs-12 site-sidebar main-menu">
                <Aside></Aside>
            </a-layout-sider>
            <a-layout class="ant-col-xs-24 ant-col-sm-24 ant-col-md-18 ant-col-lg-19 ant-col-xl-19 ant-col-xxl-20">
                <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
                    <a-tabs
                            hideAdd
                            v-model="activeKey"
                            type="editable-card"
                            @edit="onEdit"
                    >
                        <a-tab-pane v-for="pane in tabsList" :tab="pane.desc"
                                    :key="pane.url">
                            <TestInfo :swagger="pane" :key="pane.url"></TestInfo>
                        </a-tab-pane>
                        <ApiInfo v-if="tabsList.length === 0"></ApiInfo>
                    </a-tabs>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script>
    import {mapMutations, mapState} from "vuex";
    import {get} from "@/assets/js/http";
    import Header from '@/components/Header.vue'
    import Aside from '@/components/Aside.vue'
    import ApiInfo from '@/components/ApiInfo.vue'
    import TestInfo from '@/components/TestInfo.vue'

    export default {
        name: 'home',
        components: {
            Header, Aside, ApiInfo, TestInfo
        },
        data() {
            return {
                activeKey: '',
                tabIndex: ''
            }
        },
        computed: {
            ...mapState(['domain', 'tabsList']),
        },
        watch: {
            tabsList(newsV, oldV) {
                this.activeKey = newsV[newsV.length - 1].url;
            }
        },
        created() {
            this.initApiList();
        },
        methods: {
            ...mapMutations({
                setApiList: 'SET_API_LIST',
                setApiInfo: 'SET_API_INFO',
                setMenuList: 'SET_MENU_LIST',
                removerTabsList: 'REMOVER_TABS_LIST',
            }),
            async initApiList() {
                const hide = this.$message.loading('Action in progress..', 0);

                let apiList = await get({url: '/swagger-resources'});
                let apiInfo = await get({url: `${apiList[0].location}`});

                let menus = [];
                for (let key of Object.entries(apiInfo.paths)) {
                    menus.push({
                        url: key[0],
                        type: Object.keys(key[1])[0].toUpperCase(),
                        desc: key[1][Object.keys(key[1])[0]].summary,
                        tags: key[1][Object.keys(key[1])[0]].tags[0],
                        info: key[1][Object.keys(key[1])[0]]
                    });
                }


                let dedupeArr = Array.from(new Set(menus.map(v => v.tags)));
                let map = dedupeArr.map(v => {
                    let info = {count: 0, tags: v, show: false, list: []};
                    menus.forEach(k => {
                        if (k.tags === v) {
                            info.count++;
                            info.list.push(k)
                        }
                    })
                    return info;
                })
                setTimeout(hide, 1);
                this.setApiList(apiList);
                this.setApiInfo(Object.assign(apiInfo, apiList[0]));
                this.setMenuList(map);
            },
            onEdit(targetKey, action) {
                this[action](targetKey)
            },
            remove(targetKey) {
                let activeKey = this.activeKey;
                let lastIndex;
                this.tabsList.forEach((pane, i) => {
                    if (pane.url === targetKey) {
                        lastIndex = i - 1;
                    }
                })
                const panes = this.tabsList.filter(pane => pane.url !== targetKey)
                if (lastIndex >= 0 && activeKey === targetKey) {
                    activeKey = panes[lastIndex].url
                }

                this.removerTabsList(targetKey);
                this.activeKey = activeKey
            },
        }
    }
</script>
<style scoped lang="less">
    .components-layout-demo-top-side-2{
        position: relative;
        .main-menu{
            flex: none !important;
            max-width: 500px !important;
            width: 300px !important;
            float: left;
            max-height: 100vh;
            overflow-y: auto;
            padding-bottom: 20px;
        }
    }

    .home-aside::-webkit-scrollbar {
        width: 0.7rem;
        height: 16px;
        background-color: rgba(251, 251, 251, 0.7);
    }

    .home-aside::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
        background-color: #f8f8f8;
    }

    .main::-webkit-scrollbar {
        width: 0.7rem;
        height: 16px;
        background-color: rgba(251, 251, 251, 0.7);
    }

    .main::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
        background-color: #f8f8f8;
    }
</style>
