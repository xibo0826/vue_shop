import Vue from 'vue'
import { Button,Form, FormItem,Input, Container, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, Header, Dropdown, DropdownMenu, DropdownItem, Table, TableColumn } from 'element-ui'
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

Vue.prototype.$message = customersMessage;


