import Vue from 'vue'
import { Button,Form, FormItem,Input, Container, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, Header, Dropdown, DropdownMenu, 
        DropdownItem, Table, TableColumn, Breadcrumb, BreadcrumbItem, Card, Switch, Select, Option, Row, Col, Pagination, Tooltip, 
        Dialog, MessageBox, Tag, Tree, Cascader, Timeline, TimelineItem, Divider, RadioGroup, RadioButton, Radio, DatePicker, TimeSelect,
        ColorPicker, Alert, Tabs, TabPane, Steps, Step, Checkbox, CheckboxGroup, Upload } from 'element-ui'

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
Vue.use(Cascader)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Divider)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(ColorPicker)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)

Vue.prototype.$message = customersMessage;
Vue.prototype.$messagebox = MessageBox;


