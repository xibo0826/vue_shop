<template>
  <div class="container">
    <upsertRole
      :id="upsertRoleParam.id"
      :isVisible.sync="upsertRoleParam.isVisible"
      :search="search"
    ></upsertRole>
    <assignAuth
      :id="roleAuthAssingParam.id"
      :roleAuth="roleAuthAssingParam.roleAuth"
      :isVisible.sync="roleAuthAssingParam.isVisible"
      :search="search"
    ></assignAuth>
    <breadcrumbNav></breadcrumbNav>
    <el-card>
      <div class="button-area">
        <el-button
          type="primary"
          @click="newRole"
          icon="el-icon-circle-plus-outline"
          size="mini"
          plain
        >新建</el-button>
      </div>
      <div class="table-area">
        <el-table
          :data="roleForm.searchResult.roles"
          stripe
          border
          max-height="620"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row
                :class="['valign-center', 'bdbottom', idx1===0? 'bdtop':'']"
                v-for="(item1, idx1) in scope.row.children"
                :key="item1.id"
              >
                <el-col :span="7">
                  <el-tag
                    closable
                    @close="deleteAuth(scope.row, item1.id)"
                  >
                    {{item1.id + item1.authName}}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="17">
                  <el-row
                    :class="['valign-center', idx2!==0? 'bdtop':'']"
                    v-for="(item2, idx2) in item1.children"
                    :key="item2.id"
                  >
                    <el-col :span="10">
                      <el-tag
                        closable
                        @close="deleteAuth(scope.row, item2.id)"
                        type="success"
                      >
                        {{item2.id + item2.authName}}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="14">
                      <el-row>
                        <el-col>
                          <el-tag
                            closable
                            @close="deleteAuth(scope.row, item3.id)"
                            type="danger"
                            v-for="item3 in item2.children"
                            :key="item3.id"
                          >
                            {{item3.id + item3.authName}}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label=""
            width="50"
            align="center"
          />
          <el-table-column
            prop="roleName"
            label="角色名称"
            width="350"
          />
          <el-table-column
            prop="roleDesc"
            label="角色描述"
            width="600"
          />
          <el-table-column
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <operation :scope="scope.row" @editClick="editRole" @deleteClick="deleteRole">
                <el-tooltip
                  content="分配权限"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    icon="el-icon-setting"
                    type="warning"
                    circle
                    size="mini"
                    @click="assignAuth(scope.row)"
                  ></el-button>
                </el-tooltip>
              </operation>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import breadcrumbNav from 'components/breadcrumb.vue'
import operation from 'components/operation.vue'
import upsertRole from './RoleUpsert.vue'
import assignAuth from './RoleAuthAssign.vue'
export default {
  data() {
    return {
      roleForm: {
        searchResult: {
          roles: [],
        },
      },
      upsertRoleParam: {
        id: -1,
        isVisible: false,
      },
      roleAuthAssingParam: {
        id: -1,
        roleAuth: [],
        isVisible: false,
      },
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      const { data: result } = await this.$http.get('roles')
      this.roleForm.searchResult.roles = result.data
    },

    newRole() {
      this.upsertRoleParam.isVisible = true
    },

    editRole(role) {
      this.upsertRoleParam.id = role.id
      this.upsertRoleParam.isVisible = true
    },

    async deleteRole(role) {
      await this.$messagebox.confirm('删除角色, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      await this.$http.delete(`roles/${role.id}`)
      this.$message.success('删除成功')
      this.search()
    },

    async deleteAuth(role, authId) {
      const { data: result } = await this.$http.delete(
        `roles/${role.id}/rights/${authId}`
      )
      role.children = result.data
      this.$message.success('删除成功')
    },

    assignAuth(role) {
      this.roleAuthAssingParam.id = role.id
      this.roleAuthAssingParam.roleAuth = [...role.children]
      this.roleAuthAssingParam.isVisible = true
    },
  },
  components: {
    breadcrumbNav,
    operation,
    upsertRole,
    assignAuth,
  },
}
</script>
<style scoped>
.valign-center {
  display: flex;
  align-items: center;
}

.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}

.el-tag {
  margin: 10px;
}
</style>
