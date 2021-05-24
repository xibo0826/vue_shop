<template>
  <div>
    <div class="container">
      <breadcrumbNav />
      <el-card class="content" style="overflow:auto">
        <el-alert title="添加商品信息！" type="info" show-icon center :closable="false" />
        <el-steps :active="parseInt(activeTabNm)" align-center finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-tabs tab-position="left" :before-leave="validate" v-model="activeTabNm" @tab-click="tabClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form :model="baseGoodForm" ref="baseGoodFormRef" label-width="100px" :hide-required-asterisk="true">
              <el-form-item prop="goods_name" :rules="[
                  { required: true, message: '商品名称不能为空', trigger: 'blur'},
                  { max:100, message:'商品名称在100个字符以内', trigger: 'change' }
                ]">
                <template v-slot:label>
                  <div class="form-item-title required">
                    <span>商品名称</span>
                  </div>
                </template>
                <el-input v-model="baseGoodForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item prop="goods_price" :rules="[
                  { required: true, message: '商品价格不能为空'},
                  { type: 'number', message: '商品价格必须为数字'},
                  { validator: validatorNumber, trigger: 'change' },
                  { validator: validatorPrice, trigger: 'change' },
                ]">
                <template v-slot:label>
                  <div class="form-item-title required">
                    <span>商品价格</span>
                  </div>
                </template>
                <el-input type="number" v-model.number="baseGoodForm.goods_price" autocomplete="off" @mousewheel.native.prevent @DOMMouseScroll.native.prevent></el-input>
              </el-form-item>
              <el-form-item prop="goods_number" :rules="[
                  { required: true, message: '商品重量不能为空'},
                  { type: 'number', message: '商品重量必须为数字'},
                  { validator: validatorNumber, trigger: 'change' },
                  { validator: validatorWeight, trigger: 'change' },
                ]">
                <template v-slot:label>
                  <div class="form-item-title required">
                    <span>商品重量</span>
                  </div>
                </template>
                <el-input v-model.number="baseGoodForm.goods_number" autocomplete="off" @mousewheel.native.prevent @DOMMouseScroll.native.prevent></el-input>
              </el-form-item>
              <el-form-item prop="goods_weight" :rules="[
                  { required: true, message: '商品数量不能为空'},
                  { type: 'number', message: '商品数量必须为数字'},
                  { validator: validatorNumber, trigger: 'change' },
                  { validator: validatorMaru, trigger: 'change' },
                ]">
                <template v-slot:label>
                  <div class="form-item-title required">
                    <span>商品数量</span>
                  </div>
                </template>
                <el-input v-model.number="baseGoodForm.goods_weight" autocomplete="off" @mousewheel.native.prevent @DOMMouseScroll.native.prevent></el-input>
              </el-form-item>
              <el-form-item prop="goods_cat" :rules="[
                  { required: true, message: '商品分类不能为空'},
                  { validator: validatorCategory, trigger: 'change' },
                ]">
                <template v-slot:label>
                  <div class="form-item-title required">
                    <span>商品分类</span>
                  </div>
                </template>
                <el-cascader style="width: 600px" v-model="baseGoodForm.goods_cat" :options="categories" :props="{ 
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    value: 'cat_id',
                  }">
                </el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <div v-for="param in paramGoodForm.paramData" :key="param.attr_id">
              <el-row>
                <el-col>
                  <el-tag> {{ param.attr_name }} </el-tag>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-checkbox-group v-model="param.selected">
                    <el-checkbox v-for="val in paramVals(param.attr_vals)" :key="val" :label="val" border>{{ val }}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form :model="attrGoodForm" ref="attrGoodFormRef" label-width="200px" :hide-required-asterisk="true">
              <el-form-item :prop="'attrData.' + index + '.attr_vals'" v-for="(attr, index) in attrGoodForm.attrData" :key="attr.attr_id" :rules="{
                  max: 100, message: '内容不能超过100字符', trigger: 'change'
                }">
                <template v-slot:label>
                  <div class="form-item-title" style="width: 200px">
                    <span> {{ attr.attr_name }} </span>
                  </div>
                </template>
                <el-input v-model="attr.attr_vals"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload action="http://localhost:8888/api/private/v1/upload" ref="uploadRef" list-type="picture-card" :auto-upload="true" :headers="upload.header" :on-success="uploadSuccess" :on-remove="removeSuccess" :file-list="baseGoodForm.pics">>
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="previewPic(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-delete" @click="removePic(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="upload.dialogVisible">
              <img width="100%" :src="upload.dialogImageUrl" alt="">
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-Editor v-model="baseGoodForm.goods_introduce"></quill-Editor>
          </el-tab-pane>
        </el-tabs>
        <div class="btn_area_left">
          <el-button type="primary" @click="preStep" v-show="parseInt(activeTabNm)>0">上一步</el-button>
          <el-button type="primary" @click="nextStep" v-show="parseInt(activeTabNm)<4">下一步</el-button>
          <el-button type="primary" @click="save" v-show="parseInt(activeTabNm) == 4">保存</el-button>
          <el-button type="info" @click="cancel">返回</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import breadcrumbNav from 'components/breadcrumb.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import _ from 'lodash'

export default {
  data() {
    return {
      activeTabNm: '0',

      baseGoodForm: {
        goods_id: '',
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: [],
        goods_introduce: '',
        pics: [],
        attrs: [],
      },

      paramGoodForm: {
        paramData: [],
      },
      attrGoodForm: {
        attrData: [],
      },

      categories: [],
      tabStatus: [],

      upload: {
        header: {
          Authorization: sessionStorage.getItem('token'),
        },
        dialogImageUrl: '',
        dialogVisible: false,
      },
    }
  },
  computed: {
    good_id() {
      return this.$route.query.id
    },
    paramVals() {
      return (vals) => {
        if (vals === '' || vals === null) {
          return ''
        } else {
          return vals.split(',')
        }
      }
    },
  },
  async created() {
    const { data: result } = await this.$http.get('categories?type=3')
    this.categories = result.data

    if (this.good_id != -1) {
      const { data: initData } = await this.$http.get(`goods/${this.good_id}`)
      this.baseGoodForm = initData.data
      this.baseGoodForm.goods_cat = [
        initData.data.cat_one_id,
        initData.data.cat_two_id,
        initData.data.cat_three_id,
      ]
      this.baseGoodForm.pics.forEach(p => {
        p.url = p.pics_mid
      })
      console.log(this.baseGoodForm)
    }
  },
  methods: {
    nextStep() {
      const nowTab = this.activeTabNm
      const newTab = parseInt(nowTab) + 1 + ''
      if (this.validate(newTab, nowTab)) {
        this.activeTabNm = newTab
        if (nowTab === '0') {
          this.getParams()
        } else if (nowTab === '1') {
          this.getAttrs()
        }
      }
    },

    preStep() {
      const nowTab = this.activeTabNm
      this.activeTabNm = parseInt(nowTab) - 1 + ''
    },

    tabClick(tab) {
      if (tab.name === '1') {
        this.getParams()
      } else if (tab.name === '2') {
        this.getAttrs()
      }
    },

    async getParams() {
      if (this.paramGoodForm.paramData.length === 0) {
        const catId = this.baseGoodForm.goods_cat[2]
        const { data: result } = await this.$http.get(
          `categories/${catId}/attributes?sel=many`
        )
        for (const param of result.data) {
          const targetParam = this.baseGoodForm.attrs.filter(
            (p) => p.attr_id === param.attr_id
          )
          if (targetParam.length !== 0) {
            param.selected = []
            param.selected.push(...targetParam[0].attr_vals.split(','))
          } else {
            param.selected = []
          }
        }
        this.paramGoodForm.paramData = result.data
        console.log(this.paramGoodForm.paramData)
      }
    },

    async getAttrs() {
      if (this.attrGoodForm.attrData.length === 0) {
        const catId = this.baseGoodForm.goods_cat[2]
        const { data: result } = await this.$http.get(
          `categories/${catId}/attributes?sel=only`
        )
        this.attrGoodForm.attrData = result.data
      }
    },

    removePic(file, fileList) {
      const pos = this.$refs.uploadRef.uploadFiles.findIndex(
        (p) => p.url === file.url
      )
      this.$refs.uploadRef.uploadFiles.splice(pos, 1)

      this.baseGoodForm.pics.splice(pos, 1)
    },
    previewPic(file) {
      this.upload.dialogImageUrl = file.url
      this.upload.dialogVisible = true
    },

    uploadSuccess(response, file, fileList) {
      file.url = response.data.url
      file.tmp_path = response.data.tmp_path
      this.baseGoodForm.pics.push(response.data.tmp_path)
      console.log(this.$refs.uploadRef.uploadFiles)
    },

    removeSuccess(file, fileList) {
      console.log(file)
    },

    save() {
      let postForm = _.cloneDeep(this.baseGoodForm)
      console.log(postForm)
      postForm.goods_cat = this.baseGoodForm.goods_cat.join(',')

      const params = this.paramGoodForm.paramData.map((p) => {
        let obj = {}
        ;(obj.attr_id = p.attr_id), (obj.attr_value = p.selected.join(','))
        return obj
      })

      const attrs = this.attrGoodForm.attrData.map((p) => {
        let obj = {}
        ;(obj.attr_id = p.attr_id), (obj.attr_value = p.attr_vals)
        return obj
      })

      postForm.attrs.push(...params)
      postForm.attrs.push(...attrs)
      console.log(postForm)

      this.$http.post('goods', postForm)
      this.$message.success('保存成功')
    },

    cancel() {
      // 返回前数据被清空
      this.$router.back()
    },

    validate(activeName, oldActiveName) {
      let okFlg = false
      const activeNameNum = parseInt(activeName)
      const oldActiveNameNum = parseInt(oldActiveName)
      if (oldActiveNameNum >= activeNameNum) {
        return true
      }

      if (oldActiveName === '0') {
        this.$refs.baseGoodFormRef.validate((valid) => {
          if (!valid) {
            this.$message.error('请先修改页面上的错误')
            this.tabStatus.splice(tabStatus.indexOf(oldActiveName), 1)
          } else {
            okFlg = true
            this.tabStatus.push(oldActiveName)
          }
        })
      } else if (oldActiveName === '1') {
        if (this.paramGoodForm.paramData.some((p) => p.selected.length === 0)) {
          this.$message.error('请对每一个参数至少设置一个值')
          this.tabStatus.splice(tabStatus.indexOf(oldActiveName), 1)
        } else {
          okFlg = true
          this.tabStatus.push(oldActiveName)
        }
      } else if (oldActiveName === '2') {
        this.$refs.attrGoodFormRef.validate((valid) => {
          if (!valid) {
            this.$message.error('请先修改页面上的错误')
            this.tabStatus.splice(tabStatus.indexOf(oldActiveName), 1)
          } else {
            okFlg = true
            this.tabStatus.push(oldActiveName)
          }
        })
      } else if (oldActiveName === '3') {
        okFlg = true
      }

      if (okFlg) {
        // 本页面验证完成, 新页面验证

        if (activeNameNum - oldActiveNameNum < 1) {
          okFlg = true
        } else if (activeNameNum - oldActiveNameNum == 1) {
          okFlg = true
        } else {
          for (let i = oldActiveNameNum + 1; i <= activeNameNum - 1; i++) {
            if (this.tabStatus.indexOf(i) >= 0) {
              okFlg = true
            } else {
              this.$message.error('请按照步骤输入!')
              okFlg = false
            }
          }
        }
      }

      return okFlg
    },

    validatorNumber(rule, value, callback) {
      if (value > 0) {
        callback()
      } else {
        callback(new Error('请输入大于0的数字'))
      }
    },

    validatorMaru(rule, value, callback) {
      if (value.toString().indexOf('.') >= 0) {
        callback(new Error('只能输入整数'))
      } else {
        callback()
      }
    },

    validatorPrice(rule, value, callback) {
      const reg = /^(0|[1-9]\d*)(\.\d{1,2})?$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入两位小数'))
      }
    },

    validatorWeight(rule, value, callback) {
      const reg = /^(0|[1-9]\d*)(\.\d{1,3})?$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入三位小数'))
      }
    },

    validatorCategory(rule, value, callback) {
      if (value.length != 3) {
        callback(new Error('只能选择三级分类商品'))
      } else {
        callback()
      }
    },
  },
  components: {
    breadcrumbNav,
    quillEditor,
  },
}
</script>
<style scoped>
.el-tabs {
  margin-top: 25px;
}
.el-row {
  margin-bottom: 10px;
}
.btn_area_left {
  margin-top: 20px;
  margin-left: 100px;
}
</style>
