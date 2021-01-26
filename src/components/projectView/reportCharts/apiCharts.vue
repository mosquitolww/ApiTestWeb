<template>
    <div ref="bar_dv" :style="{ width: '1200px', height: '700px' }"></div>
</template>

<script>
export default {
  name: "NodeIndexDialog",
  props: {
    isShowDialog: {
    type: Boolean,
    default: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  methods: {
    /* 负载情况图标 */
    drawLine() {
      let bar_dv = this.$refs.bar_dv;
      let myChart = this.$echarts.init(bar_dv);
      // 绘制图表
      var builderJson = {
            "all": 1000,
            "charts": {
              "收银-支付": 172,
              "智能教培": 523,
              "收银-免费": 147,
              "收银-极速": 192,
              "中台-蓝鲸": 405,
              "定制化": 204,
              "收银-收费": 775,
              "中台-蜂巢": 154,
              "基础-C端": 46,
              "中台-数据": 13,
              "收银-免费BOSS": 147,
              "教学": 76,
              "基础-UC": 358,
              "收银-总账管理": 101,
              "安全": 441,
              "收银-免费版重构": 230,
              "基础-容器": 7,
              "野蛮体魄": 76
            },
            "components": {
              "收银-支付": 172,
              "智能教培": 649,
              "收银-免费": 169,
              "收银-极速": 128,
              "中台-蓝鲸": 170,
              "定制化": 223,
              "收银-收费": 570,
              "中台-蜂巢": 110,
              "基础-C端": 59,
              "中台-数据": 13,
              "收银-免费BOSS": 54,
              "教学": 76,
              "基础-UC": 392,
              "收银-总账管理": 57,
              "安全": 638,
              "收银-免费版重构": 568,
              "基础-容器": 0,
              "野蛮体魄": 76
            },
            "ie": 9743
          };

      var downloadJson = {
        "成功": 269150,
        "失败": 2372,
        "错误": 10,
        "跳过": 10
      };

      var themeJson = {
        "成功": 1594,
        "失败": 925,
        "错误": 1608,
        "跳过": 721,
      };

      var waterMarkText = 'ECHARTS';

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = canvas.height = 100;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = 0.08;
      ctx.font = '20px Microsoft Yahei';
      ctx.translate(50, 50);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(waterMarkText, 0, 0);
      myChart.setOption({
        backgroundColor: {
        type: 'pattern',
        image: canvas,
        repeat: 'repeat'
        },
        tooltip: {},
        title: [{
            text: '用例数据',
            subtext: '总计 ' + builderJson.all,
            left: '25%',
            textAlign: 'center'
        }, {
            text: '测试环境测试报告',
            subtext: '总计 ' + Object.keys(downloadJson).reduce(function (all, key) {
                return all + downloadJson[key];
            }, 0),
            left: '75%',
            textAlign: 'center'
        }, {
            text: '线上环境测试报告',
            subtext: '总计 ' + Object.keys(themeJson).reduce(function (all, key) {
                return all + themeJson[key];
            }, 0),
            left: '75%',
            top: '50%',
            textAlign: 'center'
        }],
        grid: [{
            top: 50,
            width: '50%',
            bottom: '45%',
            left: 10,
            containLabel: true
        }, {
            top: '55%',
            width: '50%',
            bottom: 0,
            left: 10,
            containLabel: true
        }],
        xAxis: [{
            type: 'value',
            max: builderJson.all,
            splitLine: {
                show: false
            }
        }, {
            type: 'value',
            max: builderJson.all,
            gridIndex: 1,
            splitLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'category',
            data: Object.keys(builderJson.charts),
            axisLabel: {
                interval: 0,
                rotate: 30
            },
            splitLine: {
                show: false
            }
        }, {
            gridIndex: 1,
            type: 'category',
            data: Object.keys(builderJson.components),
            axisLabel: {
                interval: 0,
                rotate: 30
            },
            splitLine: {
                show: false
            }
        }],
        series: [{
            type: 'bar',
            stack: 'chart',
            z: 3,
            label: {
                normal: {
                    position: 'right',
                    show: true
                }
            },
            data: Object.keys(builderJson.charts).map(function (key) {
                return builderJson.charts[key];
            })
        }, {
            type: 'bar',
            stack: 'chart',
            silent: true,
            itemStyle: {
                normal: {
                    color: '#eee'
                }
            },
            data: Object.keys(builderJson.charts).map(function (key) {
                return builderJson.all - builderJson.charts[key];
            })
        }, {
            type: 'bar',
            stack: 'component',
            xAxisIndex: 1,
            yAxisIndex: 1,
            z: 3,
            label: {
                normal: {
                    position: 'right',
                    show: true
                }
            },
            data: Object.keys(builderJson.components).map(function (key) {
                return builderJson.components[key];
            })
        }, {
            type: 'bar',
            stack: 'component',
            silent: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: '#eee'
                }
            },
            data: Object.keys(builderJson.components).map(function (key) {
                return builderJson.all - builderJson.components[key];
            })
        }, {
            type: 'pie',
            radius: [0, '30%'],
            center: ['75%', '25%'],
            data: Object.keys(downloadJson).map(function (key) {
                return {
                    name: key.replace('.js', ''),
                    value: downloadJson[key]
                }
            })
        }, {
            type: 'pie',
            radius: [0, '30%'],
            center: ['75%', '75%'],
            data: Object.keys(themeJson).map(function (key) {
                return {
                    name: key.replace('.js', ''),
                    value: themeJson[key]
                };
            })
        }]
      });
      myChart.resize();
    },

/*     hideData() {
      this.$emit("hideDialog")
    },

    confirm(){
      this.hideData();

    }, */
  }
}
</script>

<style>
</style>