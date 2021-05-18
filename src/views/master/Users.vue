<template>
  <div>
    <userUpsert
      :id="upsertUserForm.id"
      :isVisible.sync="upsertUserForm.isVisible"
      :search="search"
    ></userUpsert>
    <userRoleAssign
      :user="assignUserRoleForm.user"
      :isVisible.sync="assignUserRoleForm.isVisible"
      :roles="searchForm.roleList"
      :search="search"
    ></userRoleAssign>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <div class="button-area">
          <el-button
            type="primary"
            @click="search"
            icon="el-icon-search"
            size="mini"
            plain
          >检索</el-button>
          <el-button
            type="primary"
            @click="newUser"
            icon="el-icon-circle-plus-outline"
            size="mini"
            plain
          >新建</el-button>
        </div>
        <div class="search-cond-area">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input
                v-model="searchForm.queryParams.query"
                placeholder="请输入内容"
                clearable
                @keyup.enter.native="search"
                @clear="search"
              >
                <template slot="prepend">用户名</template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <div class="search-cond-title">
                <span>角色</span>
              </div>
              <el-select
                value="role"
                multiple
                placeholder="请选择"
                v-model="searchForm.queryParams.role"
              >
                <el-option
                  v-for="role in searchForm.roleList"
                  :key="role.id"
                  :label="role.roleName"
                  :value="role.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <div class="table-area">
          <el-table
            :data="searchForm.searchResult.users"
            stripe
            border
            max-height="620"
          >
            <el-table-column
              type="index"
              label=""
              width="50"
              align="center"
            />
            <el-table-column
              prop="username"
              label="姓名"
              width="150"
            />
            <el-table-column
              prop="email"
              label="邮箱"
              width="380"
            />
            <el-table-column
              prop="mobile"
              label="电话"
              width="140"
            />
            <el-table-column
              prop="role_name"
              label="角色"
              width="180"
            />
            <el-table-column
              label="状态"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.mg_state"
                  @change="updateUserStatus(scope.row)"
                >
                </el-switch>
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
                    @click="editUser(scope.row.id)"
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
                    @click="deleteUser(scope.row.id)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  content="分配角色"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    icon="el-icon-setting"
                    type="warning"
                    circle
                    size="mini"
                    @click="updateUserRole(scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="resetPagesize"
            @current-change="search"
            :current-page.sync="searchForm.queryParams.pagenum"
            :page-size="searchForm.queryParams.pagesize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="searchForm.searchResult.total"
            background
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import userUpsert from './UserUpsert.vue'
import userRoleAssign from './UserRoleAssign.vue'
export default {
  created() {
    this.getInitData()
    this.search()
  },
  data() {
    return {
      searchForm: {
        roleList: [],
        queryParams: {
          query: '',
          //role: '',
          pagenum: 1,
          pagesize: 10,
        },
        searchResult: {
          total: 0,
          users: [],
        },
      },

      upsertUserForm: {
        isVisible: false,
        id: -1,
      },

      assignUserRoleForm: {
        isVisible: false,
        user: null
      },
    }
  },
  watch: {},
  methods: {
    // 初期数据取得
    async getInitData() {
      const { data: result } = await this.$http.get('roles')
      this.searchForm.roleList = result.data
    },
    // 检索按钮
    async search() {
      const { data: result } = await this.$http.get('users', {
        params: this.searchForm.queryParams,
      })
      this.searchForm.searchResult.total = result.data.total
      this.searchForm.searchResult.users.splice(
        0,
        this.searchForm.searchResult.users.length,
        ...result.data.users
      )
    },
    // 当前表示页数变化
    resetPagesize(pagesize) {
      this.searchForm.queryParams.pagesize = pagesize
      this.search()
    },
    // 新增用户
    newUser() {
      this.upsertUserForm.id = -1
      this.upsertUserForm.isVisible = true
    },
    // 编辑用户
    editUser(id) {
      this.upsertUserForm.id = id
      this.upsertUserForm.isVisible = true
    },
    // 删除用户
    async deleteUser(id) {
      await this.$messagebox.confirm('删除用户, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })

      await this.$http.delete(`users/${id}`)
      this.$message.success('删除成功')
      this.search()
    },
    // 修改状态
    async updateUserStatus(user) {
      await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      this.$message.success('修改状态成功')
    },
    // 分配角色
    async updateUserRole(user) {
      this.assignUserRoleForm.user = user
      this.assignUserRoleForm.isVisible = true
    },
  },
  components: {
    userUpsert,
    userRoleAssign,
  },
}
</script>
<style>
.el-input__inner {
  border-radius: 0 !important;
}
</style>
