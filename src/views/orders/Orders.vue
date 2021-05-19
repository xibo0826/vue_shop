<template>
  <div class="container">
    <breadcrumbNav></breadcrumbNav>
    <el-card>
      <div class="button-area">
        <el-button
          type="primary"
          @click="search"
          icon="el-icon-search"
          size="mini"
          plain
        >检索</el-button>
      </div>
      <el-divider></el-divider>
      <div class="search-cond-area">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="search-cond-title">
              <span>付款状态</span>
            </div>
            <el-select
              placeholder="请选择"
              clearable
              v-model="queryParams.pay_status"
            >
              <el-option
                key="0"
                label="未付款"
                value="0"
              >
              </el-option>
              <el-option
                key="1"
                label="已付款"
                value="1"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <div class="search-cond-title">
              <span>发货状态</span>
            </div>
            <el-select
              clearable
              placeholder="请选择"
              v-model="queryParams.is_send"
            >
              <el-option
                key="否"
                label="未发送"
                value="否"
              >
              </el-option>
              <el-option
                key="是"
                label="已发送"
                value="是"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <div class="table-area">
        <el-table
          :data="searchResult.orders"
          stripe
          border
          max-height="620"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form
                label-position="left"
                inline
                class="table-expand"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="配送地址:">
                      <span>{{ props.row.consignee_addr }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="发票类型:">
                      <span>{{ props.row.order_fapiao_title }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="发票公司名称:">
                      <span>{{ props.row.order_fapiao_company }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="发票内容:">
                      <span>{{ props.row.order_fapiao_content }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label=""
            width="50"
            align="center"
          />
          <el-table-column
            prop="order_number"
            label="订单编号"
            width="300"
          />
          <el-table-column
            prop="order_price"
            label="订单价格(元)"
            width="200"
            align="right"
          >
            <template slot-scope="scope">
              {{ scope.row.order_price | showPrice }}
            </template>
          </el-table-column>
          <el-table-column
            prop="order_pay"
            label="是否付款"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.pay_status === '1'"
                type="success"
                size="mini"
              >是</el-tag>
              <el-tag
                v-else
                type="danger"
                size="mini"
              >否</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_send"
            label="是否发货"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.is_send === '是'"
                type="success"
                size="mini"
              >是</el-tag>
              <el-tag
                v-else
                type="danger"
                size="mini"
              >否</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="add_time"
            label="下单时间"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.create_time | formatDate }}
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
                :showRemove="false"
                @editClick="editOrder"
              >
                <el-tooltip
                  content="查看物流"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    icon="el-icon-location"
                    type="success"
                    circle
                    size="mini"
                    @click="openProcess"
                  ></el-button>
                </el-tooltip>
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
    <el-dialog
      title="修改配送地址"
      :visible="upsertOrderParam.isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form
        :model="order"
        ref="upsertOrderFormRef"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          prop="city"
          label="省市区"
        >
          <el-cascader
            v-model="order.city"
            :options="cityData"
          ></el-cascader>
        </el-form-item>
        <el-form-item
          prop="address"
          label="详细地址"
        >
          <el-input v-model="order.address"></el-input>
        </el-form-item>
        <el-form-item class="btn_area_right">
          <el-button type="primary">保存</el-button>
          <el-button
            type="info"
            @click="cancel"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="查看物流"
      :visible.sync="processViewParam.isVisible"
      custom-class="processContainer"
    >
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(process, index) in processViewParam.processData"
          :key="index"
          :timestamp="process.ftime"
        >
          {{process.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
<script>
import breadcrumbNav from 'components/breadcrumb.vue'
import operation from 'components/operation.vue'
import cityData from 'plugins/city/citydata_zh.js'
import * as common from 'plugins/common.ts'
export default {
  data() {
    return {
      queryParams: {
        pay_status: '',
        is_send: '',
        pagenum: 1,
        pagesize: 10,
      },
      searchResult: {
        orders: [],
        total: 0,
      },
      upsertOrderParam: {
        id: -1,
        isVisible: false,
      },
      processViewParam: {
        isVisible: false,
        processData: [],
      },
      order: {
        city: '',
        address: '',
      },
      cityData,
      rules: {
        city: [{ required: true, message: '请选择省市区', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { max: 100, message: '详细地址在100个字符之内', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      const { data: result } = await this.$http.get('orders', {
        params: this.queryParams,
      })
      this.searchResult.total = result.data.total
      this.searchResult.orders.splice(
        0,
        this.searchResult.orders.length,
        ...result.data.goods
      )
    },

    resetPagesize(pagesize) {
      this.queryParams.pagesize = pagesize
      this.search()
    },

    editOrder(order) {
      this.upsertOrderParam.id = order.order_id
      this.upsertOrderParam.isVisible = true
    },

    cancel() {
      this.$refs.upsertOrderFormRef.resetFields()
      this.upsertOrderParam.isVisible = false
    },

    async openProcess() {
      // const result = await this.$http.get('/kuaidi/1106975712662')
      const { data: result } = {
        meta: { status: 200, message: '获取物流信息成功！' },
        data: [
          {
            time: '2020-07-15 12:39:56',
            ftime: '2020-07-15 12:39:56',
            context:
              '已签收,签收人是（快递已送代理点如有问题请联系11053685196）先生/女士，如有疑问请联系派件员寒亭魏飞飞(11053685196、0530-18194261)，如您未收到此快递，请拨打投诉电话：0530--17366376，感谢使用申通快递，期待再次为您服务',
            location: null,
          },
          {
            time: '2020-07-15 08:46:54',
            ftime: '2020-07-15 08:46:54',
            context:
              '山东潍坊寒亭营业厅-寒亭魏飞飞(11053685196,0530-18194261)-派件中',
            location: null,
          },
          {
            time: '2020-07-15 08:38:57',
            ftime: '2020-07-15 08:38:57',
            context: '已到达-山东潍坊寒亭营业厅',
            location: null,
          },
          {
            time: '2020-07-15 06:38:13',
            ftime: '2020-07-15 06:38:13',
            context: '已到达-山东潍坊寒亭营业厅',
            location: null,
          },
          {
            time: '2020-07-14 20:56:45',
            ftime: '2020-07-14 20:56:45',
            context: '山东潍坊转运中心-已发往-山东潍坊寒亭公司',
            location: null,
          },
          {
            time: '2020-07-14 20:52:44',
            ftime: '2020-07-14 20:52:44',
            context: '已到达-山东潍坊转运中心',
            location: null,
          },
          {
            time: '2020-07-14 17:43:48',
            ftime: '2020-07-14 17:43:48',
            context: '已到达-山东潍坊转运中心',
            location: null,
          },
          {
            time: '2020-07-14 10:53:46',
            ftime: '2020-07-14 10:53:46',
            context: '山东临沂转运中心-已发往-山东潍坊转运中心',
            location: null,
          },
          {
            time: '2020-07-14 10:43:31',
            ftime: '2020-07-14 10:43:31',
            context: '已到达-山东临沂转运中心',
            location: null,
          },
          {
            time: '2020-07-14 02:43:20',
            ftime: '2020-07-14 02:43:20',
            context: '安徽合肥转运中心-已发往-山东临沂转运中心',
            location: null,
          },
          {
            time: '2020-07-14 02:41:40',
            ftime: '2020-07-14 02:41:40',
            context: '已到达-安徽合肥转运中心',
            location: null,
          },
          {
            time: '2020-07-13 16:28:13',
            ftime: '2020-07-13 16:28:13',
            context: '安徽阜阳转运中心-已发往-安徽合肥转运中心',
            location: null,
          },
          {
            time: '2020-07-13 15:03:30',
            ftime: '2020-07-13 15:03:30',
            context: '安徽利辛公司-已发往-安徽阜阳转运中心',
            location: null,
          },
          {
            time: '2020-07-13 14:47:56',
            ftime: '2020-07-13 14:47:56',
            context: '安徽利辛公司-已发往-安徽阜阳转运中心',
            location: null,
          },
          {
            time: '2020-07-13 14:37:06',
            ftime: '2020-07-13 14:37:06',
            context: '安徽利辛公司-城南吴彦祖-已收件',
            location: null,
          },
        ],
      }
      this.processViewParam.processData = result
      this.processViewParam.isVisible = true
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
<style>
.processContainer {
  margin-top: 10px !important;
}
</style>
