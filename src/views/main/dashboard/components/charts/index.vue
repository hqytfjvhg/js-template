<template>
  <div>
    <barChart />
    <!-- 间隔20px -->
    <el-row :gutter="20">
      <!-- 宽度大于1200px，分两列，在960和1200之间显示一个 -->
      <el-col :lg="12" :md="24">
        <pieChart />
      </el-col>
      <el-col :lg="12" :md="24">
        <circleChart />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import barChart from './barChart.vue'
import pieChart from './pieChart.vue'
import circleChart from './circleChart.vue'
export default defineComponent({
  components: {
    barChart,
    pieChart,
    circleChart
  },
  setup() {

  }
})
</script>

<style lang="scss" scoped></style>
