import Vue from "vue";

import AppTitle from "~/components/common/global/AppTitle";
import AppLogo from "~/components/common/global/AppLogo";
import VarBox from "~/components/common/global/VarBox";
import MorePage from "~/components/common/global/MorePage";
import EmptyBox from "~/components/common/global/EmptyBox";
import SearchField from "~/components/common/global/SearchField";
/**
 * 注册全局组件
 * 
 * APP TITLE 导航
 */
Vue.component('AppTitle', AppTitle);
Vue.component('AppLogo', AppLogo);
Vue.component('VarBox', VarBox);
Vue.component('MorePage', MorePage);
Vue.component('EmptyBox', EmptyBox);
Vue.component('SearchField', SearchField);