<template>
<!-- 选中2级分类时, 禁用添加按钮, 清空表格的处理没有完成 -->
  <div>
    <div class="container">
      <breadcrumbNav />
      <el-card class="content">
        <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" effect="dark" show-icon :closable="false" />
        <div class="search-cond-area">
          <el-row>
            <el-col :span="24">
              <div class="search-cond-title" style="width: 140px">
                <span>选择商品分类：</span>
              </div>
              <el-cascader style="width: 300px" v-model="paramsForm.category" :options="paramsForm.categories" @change="search" :props="{ 
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    value: 'cat_id',
                    emitPath: false
                  }">
              </el-cascader>
            </el-col>
          </el-row>
        </div>
        <div class="table-area">
          <el-tabs value="dynamic">
            <el-tab-pane label="动态参数" name="dynamic">
              <div class="button-area">
                <el-button type="primary" @click="newParam('1')" icon="el-icon-circle-plus-outline" size="mini">添加</el-button>
              </div>
              <div class="table-area">
                <el-table :data="paramsForm.dynamicParams" stripe border max-height="620">
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <el-row>
                        <el-col>
                          <el-tag v-for="param in attrArr(scope.row.attr_vals)" :key="param" :closable="true" @close="removeAttr(scope.row, param)">
                            {{ param }}
                          </el-tag>
                          <el-input class="input-new-tag" v-if="showNewPamarInput" v-model="newParamValue" ref="saveTagInputDy" size="small" @keyup.enter.native="saveAttr(scope.row)" @blur="saveAttr(scope.row)" />
                          <el-button class="button-new-tag" v-else size="small" @click="addAttr('saveTagInputDy')">+ 动态参数</el-button>
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column type="index" label="" width="50" align="center" />
                  <el-table-column prop="attr_name" label="参数名称" width="750" />
                  <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                      <operation :scope="scope.row" @editClick="editParam(scope.row)" @deleteClick="deleteParam(scope.row)" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="static">
              <div class="button-area">
                <el-button type="primary" @click="newParam('2')" icon="el-icon-circle-plus-outline" size="mini">添加</el-button>
              </div>
              <div class="table-area">
                <el-table :data="paramsForm.staticParams" stripe border max-height="620">
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <el-row>
                        <el-col>
                          <el-tag v-for="param in attrArr(scope.row.attr_vals)" :key="param" :closable="true" @close="removeAttr(scope.row, param)">
                            {{ param }}
                          </el-tag>
                          <el-input class="input-new-tag" v-if="showNewPamarInput" v-model="newParamValue" ref="saveTagInputSt" size="small" @keyup.enter.native="saveAttr(scope.row)" @blur="saveAttr(scope.row)" />
                          <el-button class="button-new-tag" v-else size="small" @click="addAttr('saveTagInputSt')">+ 静态参数</el-button>
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column type="index" label="" width="50" align="center" />
                  <el-table-column prop="attr_name" label="属性名称" width="750" />
                  <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                      <operation :scope="scope.row" @editClick="editParam(scope.row)" @deleteClick="deleteParam(scope.row)" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-dialog :title="savaParamForm.attr_sel === 'many' ? '动态参数' : '静态属性'" :visible.sync="showAddDailog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-form :model="savaParamForm" ref="saveParamFormRef" label-width="80px" :rules="rules">
            <el-form-item prop="attr_name" :label="savaParamForm.attr_sel === 'many' ? '动态参数' : '静态属性'">
              <el-input v-model="savaParamForm.attr_name"></el-input>
            </el-form-item>
            <el-form-item class="btn_area_right">
              <el-button type="primary" @click="saveParam">保存</el-button>
              <el-button type="info" @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>
<script>
import breadcrumbNav from 'components/breadcrumb.vue'
import operation from 'components/operation.vue'

export default {
  data() {
    return {
      showNewPamarInput: false,
      newParamValue: '',
      showAddDailog: false,

      paramsForm: {
        category: '', // 检索条件
        categories: [], // 检索条件下拉框数据源
        dynamicParams: [], // 动态参数列表
        staticParams: [], // 静态参数列表
      },

      savaParamForm: {
        attr_id: '',
        attr_name: '',
        attr_sel: 'many',
      },

      rules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { max: 80, message: '参数的长度在80个字符以内', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    attrArr() {
      return (params) => params.split(',')
    },
  },
  async created() {
    const { data: result } = await this.$http.get('categories?type=3')
    this.paramsForm.categories = result.data
  },
  mounted() {},
  methods: {
    async search(catId) {
      const { data: dyResult } = await this.$http.get(
        `categories/${catId}/attributes?sel=many`
      )
      console.log('动态数据:')
      console.log(dyResult.data)
      this.paramsForm.dynamicParams = dyResult.data

      const { data: stcResult } = await this.$http.get(
        `categories/${catId}/attributes?sel=only`
      )
      console.log('静态数据:')
      console.log(stcResult.data)
      this.paramsForm.staticParams = stcResult.data
    },

    addAttr(inputTag) {
      this.showNewPamarInput = true
      this.$nextTick((_) => {
        eval(`this.$refs.${inputTag}.$refs.input.focus()`)
      })
    },

    async saveAttr(row) {
      let paramArr = this.attrArr(row.attr_vals)
      if (this.newParamValue) {
        paramArr.push(this.newParamValue)
        row.attr_vals = paramArr.join(',')
        this.newParamValue = ''
        await this.$http.put(
          `categories/${row.cat_id}/attributes/${row.attr_id}`,
          row
        )
        this.$message.success('保存成功')
      }
      this.showNewPamarInput = false
    },

    async removeAttr(row, removeAttr) {
      let paramArr = this.attrArr(row.attr_vals)
      paramArr.splice(paramArr.indexOf(removeAttr), 1)
      row.attr_vals = paramArr.join(',')
      await this.$http.put(
        `categories/${row.cat_id}/attributes/${row.attr_id}`,
        row
      )
      this.$message.success('删除成功')
    },

    newParam(param) {
      if (this.paramsForm.category === '') {
        this.$message.error('请先选择商品分类')
        return
      }

      if (param === '1') {
        this.savaParamForm.attr_sel = 'many'
      } else {
        this.savaParamForm.attr_sel = 'only'
      }

      this.showAddDailog = true
    },

    editParam(row) {
      Object.assign(this.savaParamForm, row)
      console.log(this.savaParamForm)
      this.showAddDailog = true
    },

    saveParam() {
      this.$refs.saveParamFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请先修改页面提示的错误!', true)
          return
        } else {
          await this.$messagebox.confirm('保存参数, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'infor',
          })

          if (this.savaParamForm.attr_id === '') {
            await this.$http.post(
              `categories/${this.paramsForm.category}/attributes`,
              this.savaParamForm
            )
          } else {
            await this.$http.put(
              `categories/${this.paramsForm.category}/attributes/${this.savaParamForm.attr_id}`,
              this.savaParamForm
            )
          }

          this.$message.success('保存成功')
          this.$refs.saveParamFormRef.resetFields()
          this.showAddDailog = false
          this.search(this.paramsForm.category)
        }
      })
    },

    async deleteParam(row) {
      await this.$http.delete(
        `categories/${row.cat_id}/attributes/${row.attr_id}`
      )

      this.$message.success('删除成功')
      this.search(this.paramsForm.category)
    },

    cancel() {
      this.showAddDailog = false
    },
  },
  components: {
    breadcrumbNav,
    operation,
  },
}
</script>

<style scoped>
.el-tag {
  margin: 10px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
}

.button-new-tag {
  margin: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
