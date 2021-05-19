<template>
  <div class="container">
    <breadcrumbNav></breadcrumbNav>
    <el-card>
      <div>
        <div
          id="main"
          style="width: 1360px;height:800px;"
        ></div>
      </div>
    </el-card>
  </div>
</template>
<script>
import breadcrumbNav from 'components/breadcrumb.vue'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      options: {
        title: {
          text: '用户来源',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
      },
    }
  },

  async mounted() {
    let myChart = echarts.init(document.getElementById('main'))
    const { data: res } = await this.$http.get('reports/type/1')
    const result = Object.assign(this.options, res.data)
    console.log(result)
    myChart.setOption(result)
  },
  components: {
    breadcrumbNav,
  },
}
</script>
<style>
</style>
