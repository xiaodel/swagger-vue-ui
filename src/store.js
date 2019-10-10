import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        domain: 'http://192.168.0.105:88',
        debug: true,
        apiList: [],
        apiInfo: {},
        menuList: [],
        tabsList: []
    },
    mutations: {
        SET_DEBUG(state, debug) {
            state.debug = debug;
        },
        SET_API_LIST(state, apiList) {
            state.apiList = apiList;
        },
        SET_API_INFO(state, apiInfo) {
            state.apiInfo = apiInfo;
        },
        SET_MENU_LIST(state, menuList) {
            state.menuList = menuList;
        },
        ADD_TABS_LIST(state, tabs) {
            state.tabsList.push(tabs);
        },
        REMOVER_TABS_LIST(state, item) {
            state.tabsList = state.tabsList.filter(v => item !== v.url);
        }
    },
    actions: {},
    getters: {}
})
