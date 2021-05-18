import Vue from 'vue'
import { Button,Form, FormItem,Input, Container, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, Header, Dropdown, DropdownMenu, 
        DropdownItem, Table, TableColumn, Breadcrumb, BreadcrumbItem, Card, Switch, Select, Option, Row, Col, Pagination, Tooltip, 
        Dialog, MessageBox, Tag, Tree } from 'element-ui'
import { localeEn } from 'element-ui/lib/locale/lang/en'
import { localeJa } from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'
import { customersMessage } from './config/resetMessage.js'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)

// 设置语言
locale.use(localeEn)

Vue.prototype.$message = customersMessage;
Vue.prototype.$messagebox = MessageBox;


