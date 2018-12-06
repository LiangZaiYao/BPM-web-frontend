<template>
  <div>
    <div class="row">
      <div>{{testData}}</div>
    </div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6">
                <h5 class="card-category">{{"8012年"}}</h5>
                <h3 class="card-title">{{"新增名片数量"}}</h3>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="lineChart1"
                        :chart-data="LineChart1.chartData"
                        :gradient-colors="LineChart1.gradientColors"
                        :gradient-stops="LineChart1.gradientStops"
                        :extra-options="LineChart1.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>

  </div>
</template>

<script>
  import BarChart from '@/components/Charts/BarChart';
  import LineChart from '@/components/Charts/LineChart';
  import APIUtil from '@/services/APIUtil';
  import config from '@/config';
  import Vue from 'vue';
  import * as chartConfigs from '@/components/Charts/config';


  export default {
    name: "human-analysis",
    components: {
      BarChart,
      LineChart
    },
    data() {
      return {
        MonthLabels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        LineChart1: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: null,
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
      }
    },
    methods: {
      getSixMonthLabels: function() {
        var thisMonth = new Date().getMonth();
        var labels = [];
        for(var i = (thisMonth-6); i < thisMonth; i ++){
          labels.push(this.MonthLabels[i]);
        }
        return labels;
      },
      initChart: function() {
        this.LineChart1.chartData.labels = this.getSixMonthLabels();
      },
      loadData: function () {
        APIUtil.get('/User'
        ).then(data => {
          console.log(data.toString())
        }).catch(() => {
          this.showToast('读取信息失败')
        }).finally(() => {
          // do nothing
        });
      }
    },
    created() {
      // 必须在图表渲染前就初始化好……
      this.initChart()
    },
    mounted() {

    }

    }
</script>

<style scoped>

</style>
