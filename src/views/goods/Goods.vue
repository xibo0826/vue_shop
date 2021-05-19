<template>
  <div class="container">
    <!-- <upsertRole
      :id="upsertRoleParam.id"
      :isVisible.sync="upsertRoleParam.isVisible"
      :search="search"
    ></upsertRole> -->
    <breadcrumbNav></breadcrumbNav>
    <el-card>
      <div class="button-area">
        <el-button
          type="primary"
          @click="newGood"
          icon="el-icon-circle-plus-outline"
          size="mini"
          plain
        >{{ $t('lang.new') }}</el-button>
      </div>
      <el-divider></el-divider>
      <div class="search-cond-area">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              v-model="queryParams.query"
              placeholder="请输入内容"
              clearable
              @keyup.enter.native="search"
              @clear="search"
            >
              <template slot="prepend">用户名</template>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div class="table-area">
        <el-table
          :data="searchResult.goods"
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
            prop="goods_name"
            label="商品名称"
            width="920"
          />
          <el-table-column
            prop="goods_price"
            label="商品价格(元)"
            width="120"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row.goods_price | showPrice }}
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="100"
            align="right"
          />
          <el-table-column
            prop="add_time"
            label="创建时间"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.add_time | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="is_promote"
            label="热销"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.is_promote"
                type="danger"
                size="mini"
              >热销</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <operation
                :scope="scope.row"
                @editClick="editGood"
                @deleteClick="deleteGood"
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
</template>
<script>
import breadcrumbNav from 'components/breadcrumb.vue'
import operation from 'components/operation.vue'
import * as common from 'plugins/common.ts'
export default {
  data() {
    return {
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      searchResult: {
        goods: [],
        total: 0,
      },
      upsertGoodParam: {
        id: -1,
        isVisible: false,
      },
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      const { data: result } = await this.$http.get('goods', {
        params: this.queryParams,
      })
      this.searchResult.total = result.data.total
      this.searchResult.goods.splice(
        0,
        this.searchResult.goods.length,
        ...result.data.goods
      )
      console.log(this.searchResult.goods)
    },

    resetPagesize(pagesize) {
      this.queryParams.pagesize = pagesize
      this.search()
    },

    newGood() {
      this.upsertGoodParam.isVisible = true
    },

    editGood(good) {
      this.upsertGoodParam.id = good.goods_id
      this.upsertGoodParam.isVisible = true
    },

    async deleteGood(good) {
      await this.$http.delete(`goods/${good.goods_id}`)
      this.$message.success('删除成功')
      this.search()
    },
  },
  filters: {
    showPrice(price) {
      return common.showPrice(price)
    },
    formatDate(date) {
      return common.formatDate(date)
    },
  },
  components: {
    breadcrumbNav,
    operation,
  },
}
</script>
<style scoped>
</style>
