import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                	path: '/persontable',
                	component: resolve => require(['../components/page/PersonTable.vue'], resolve)
                },
                {
                	path: '/usertable',
                	component: resolve => require(['../components/page/UserTable.vue'], resolve)
                },
                {
                	path: '/datepicker',
                	component: resolve => require(['../components/page/DatePicker.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                	path: '/ui-test1',
                	component: resolve => require(['../components/page/Ui-Test1.vue'], resolve)
                },
                {
                	path: '/studenttable',
                	component: resolve => require(['../components/page/StudentTable.vue'], resolve)
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
