<template>
  <div>
    <el-dialog
      :title="upsertCategoryForm.isNew ? $t('lang.new') : $t('lang.edit')"
      :visible="upsertCategoryForm.isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @open=initUpsertView
    >
      <el-form
        :model="category"
        ref="upsertCatFormRef"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          prop="cat_name"
          label="分类名称"
        >
          <el-input v-model="category.cat_name"></el-input>
        </el-form-item>
        <el-form-item
          prop="cat_pid"
          label="父级分类"
          v-show="upsertCategoryForm.isNew"
        >
          <el-cascader
            v-model="category.cat_pid"
            :options="upsertCategoryForm.categoryCombo"
            :props="{ checkStrictly: true, value:'cat_id', label:'cat_name' }"
            @change="selectPCat"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item class="btn_area_right">
          <el-button
            type="primary"
            @click="saveCategory"
          >保存</el-button>
          <el-button
            type="info"
            @click="cancel"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="container">
      <breadcrumbNav></breadcrumbNav>
      <el-card class="content">
        <div class="button-area">
          <el-button
            type="primary"
            @click="newCategory"
            icon="el-icon-circle-plus-outline"
            size="mini"
            plain
          >添加</el-button>
        </div>
        <div class="table-area">
          <el-table
            :data="searchResult.categories"
            style="width: 100%"
            row-key="cat_id"
            border
            lazy
            :load="loadCategories"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column
              prop="cat_name"
              label="分类名称"
              width="480"
            >
            </el-table-column>
            <el-table-column
              label="是否有效"
              align="center"
              width="180"
            >
              <template slot-scope="scope">
                <i
                  v-if="scope.row.cat_deleted"
                  class="el-icon-error"
                  style="color: red;"
                ></i>
                <i
                  v-else
                  class="el-icon-success"
                  style="color: lightgreen;"
                ></i>
              </template>
            </el-table-column>
            <el-table-column
              label="排序"
              align="center"
              width="280"
            >
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.cat_level===0"
                  size="mini"
                >一级</el-tag>
                <el-tag
                  v-else-if="scope.row.cat_level===1"
                  size="mini"
                  type="success"
                >二级</el-tag>
                <el-tag
                  v-else
                  size="mini"
                  type="warning"
                >三级</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <operation
                  :scope="scope.row"
                  @editClick="editCategory"
                  @deleteClick="deleteCategory"
                >
                </operation>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="resetPagesize"
            @current-change="search"
            :current-page.sync="queryParams.pagenum"
            :page-size="queryParams.pagesize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="searchResult.total"
            background
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import breadcrumbNav from 'components/breadcrumb.vue'
import operation from 'components/operation.vue'

export default {
  data() {
    return {
      queryParams: {
        type: '',
        pagenum: 1,
        pagesize: 10,
      },

      searchResult: {
        total: 0,
        categories: [],
      },

      upsertCategoryForm: {
        isNew: true,
        isVisible: false,
        categoryName: '',
        categoryCombo: [],
      },

      category: {
        cat_id: 0,
        cat_pid: 0,
        cat_name: '',
        cat_level: 0,
      },

      rules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 80, message: '分类的长度在80个字符以内', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.search('1')
  },
  methods: {
    async search(type) {
      this.queryParams.type = type
      const { data: result } = await this.$http.get('categories', {
        params: this.queryParams,
      })
      this.searchResult.total = result.data.total
      this.searchResult.categories.splice(
        0,
        this.searchResult.categories.length,
        ...result.data.result
      )
      for (const obj of this.searchResult.categories) {
        Vue.set(obj, 'hasChildren', true)
      }
    },

    async loadCategories(row, child, resolve) {
      const { data: result } = await this.$http.get('categories', {
        params: {
          type: row.cat_level === 0 ? '2' : '3',
          pagenum: this.queryParams.pagenum,
          pagesize: this.queryParams.pagesize,
        },
      })

      if (row.cat_level === 0) {
        const cat2nds = result.data.result.filter(
          (p) => p.cat_id === row.cat_id
        )
        if (!cat2nds[0].children || cat2nds[0].children.length === 0) {
          resovle([])
        } else {
          for (const obj of cat2nds[0].children) {
            Vue.set(obj, 'hasChildren', true)
          }
          resolve(cat2nds[0].children)
        }
      } else {
        const cat1st = result.data.result.filter(
          (p) => p.cat_id === row.cat_pid
        )
        const cat2nds = cat1st[0].children.filter(
          (p) => p.cat_id === row.cat_id
        )
        if (!cat2nds[0].children || cat2nds[0].children.length === 0) {
          resovle([])
        }
        resolve(cat2nds[0].children)
      }
    },

    resetPagesize(pagesize) {
      this.queryParams.pagesize = pagesize
      this.search()
    },

    newCategory() {
      this.upsertCategoryForm.isNew = true
      this.upsertCategoryForm.isVisible = true
    },

    editCategory(category) {
      this.category.cat_id = category.cat_id
      this.category.cat_name = category.cat_name
      this.upsertCategoryForm.isNew = false
      this.upsertCategoryForm.isVisible = true
    },

    async deleteCategory(category) {
      await this.$http.delete(`categories/${category.cat_id}`)
      this.$message.success('删除成功')
      this.search()
    },

    async initUpsertView() {
      const { data: result } = await this.$http.get(`categories`, {
        params: {
          type: 2,
        },
      })

      this.upsertCategoryForm.categoryCombo = result.data
    },

    selectPCat(value) {
      if (value) {
        this.category.cat_level = value.length
        this.category.cat_pid = value.slice(-1)[0]
      } else {
        this.category.cat_level = 0
        this.category.cat_pid = 0
      }
    },

    async saveCategory() {
      if (this.upsertCategoryForm.isNew) {
        await this.$http.post('categories', this.category)
      } else {
        await this.$http.put(
          `categories/${this.category.cat_id}`,
          this.category
        )
      }
      this.$message.success(this.$t('lang.saveSuccess'))
      this.$refs.upsertCatFormRef.resetFields()
      this.upsertCategoryForm.isVisible = false
      this.search('1')
    },

    cancel() {
      this.$refs.upsertCatFormRef.resetFields()
      this.upsertCategoryForm.isVisible = false
    },
  },
  components: {
    breadcrumbNav,
    operation
  },
}
</script>
<style scoped>
.el-input__inner {
  border-radius: 0 !important;
}
</style>
