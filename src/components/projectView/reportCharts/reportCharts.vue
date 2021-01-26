<template>
    <el-card>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width:1200px; height:700px;"></div>
    </el-card>
</template>

<script>

export default {
    name: "app",
    data(){
        return {

        }
    },
    methods: {
        drawChart(){
            let myChart = this.$echarts.init(document.getElementById("main"));

            let option ={
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['失败', '错误', '跳过', '成功', '总数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                series: [
                    {
                        name: '失败',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '错误',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '跳过',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '成功',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '总数',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
                    }
                ]
            }

            myChart.setOption(option);
        }
    },
    mounted() {
        this.drawChart();
    }
};
</script>

<style>
</style>