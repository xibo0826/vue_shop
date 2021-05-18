<template>
  <div>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
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
                <el-tooltip
                  content="编辑"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    icon="el-icon-edit"
                    type="primary"
                    circle
                    size="mini"
                    @click="editRole(scope.row.id)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  content="删除"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    icon="el-icon-delete"
                    type="danger"
                    circle
                    size="mini"
                    @click="deleteRole(scope.row.id)"
                  ></el-button>
                </el-tooltip>
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

      upsertCategoryParam: {
        isVisible: false,
        id: -1,
        categoryName: '',
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
      this.upsertCategoryParam.isVisible = true
    },

    editCategory(category) {
      this.upsertCategoryParam.id = category.id
      this.upsertCategoryParam.categoryName = category.cat_name
      this.upsertCategoryParam.isVisible = true
    },

    async deleteCategoryr(id) {
      await this.$messagebox.confirm('删除分类, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })

      await this.$http.delete(`categories/${id}`)
      this.$message.success('删除成功')
      this.search()
    },
  },
  components: {
    // userUpsert,
    // userRoleAssign,
  },
}
</script>
<style scoped>
.el-input__inner {
  border-radius: 0 !important;
}
</style>
