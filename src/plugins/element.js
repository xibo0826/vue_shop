import Vue from 'vue'
import { Button,Form, FormItem,Input, Container, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, Header, Dropdown, DropdownMenu, 
        DropdownItem, Table, TableColumn, Breadcrumb, BreadcrumbItem, Card, Switch, Select, Option, Row, Col, Pagination, Tooltip, Dialog, MessageBox } from 'element-ui'
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

Vue.prototype.$message = customersMessage;
Vue.prototype.$messagebox = MessageBox;


