<template>
  <div>
    <el-dialog
      title="分配权限"
      :visible="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @open="initView"
    >
      <el-tree
        ref="authTree"
        :data="initData.authData"
        node-key="id"
        :props="{label: 'authName'}"
        :default-checked-keys="initData.roleAuthData"
        :default-expanded-keys="initData.roleAuthData"
        show-checkbox
        check-on-click-node
        highlight-current
      ></el-tree>
      <div class="btn_area_right">
        <el-button
          type="primary"
          @click="saveAuth"
        >保存</el-button>
        <el-button
          type="info"
          @click="cancel"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    id: Number,
    isVisible: Boolean,
    roleAuth: Array,
    search: Function,
  },
  data() {
    return {
      initData: {
        authData: [],
        roleAuthData: [],
        selectedAuthData: [],
      },
      //   default-checked-keys
    }
  },
  methods: {
    async initView() {
      const { data: auth } = await this.$http.get('rights/tree')
      this.initData.authData = auth.data

      this.initData.roleAuthData = this.roleAuth
        .reduce((pre, next) => {
          if (next.children) {
            let idsC = next.children.reduce((preC, nextC) => {
              if (nextC.children) {
                preC.push(...nextC.children.map((x) => x.id))
                return preC
              }
            }, [])
            pre.push(...idsC)
            return pre
          }
        }, [])
        .sort()

      this.initData.selectedAuthData = this.getSelectedNode()
    },

    async saveAuth() {
      const selectedNodes = this.getSelectedNode().join(',')
      if (this.checkUpdate()) {
        await this.$http.post(`roles/${this.id}/rights`, {
          rids: selectedNodes,
        })

        this.$message.success('保存成功')
        this.$emit('update:isVisible', false)
        this.search();
      }
    },

    async cancel() {
      if (this.checkUpdate()) {
        try {
          await this.$messagebox.confirm('放弃画面上的所有修改?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
        } catch {
          return
        }
      }
      
      this.$emit('update:isVisible', false)
    },

    getSelectedNode() {
      const selectedLeaies = this.$refs.authTree.getCheckedKeys()
      const selectedHalfNodes = this.$refs.authTree.getHalfCheckedKeys()
      const selectedNodes = [...selectedLeaies, ...selectedHalfNodes].sort()
      return selectedNodes
    },

    checkUpdate() {
      const selectedNodes = this.getSelectedNode()
      if (selectedNodes.join('') === this.initData.selectedAuthData.join('')) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>
<style>
</style>
