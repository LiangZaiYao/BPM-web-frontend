<template>
  <div>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6">
                <h5 class="card-category">{{now.getFullYear()+'年'}}</h5>
                <h3 class="card-title">{{"人脉关系图"}}</h3>
              </div>
            </div>
          </template>
          <div class="netChart-area">
            <d3-network :net-nodes="netChart.nodes" :net-links="netChart.links" :options="netChart.options"/>
          </div>
        </card>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6">
                <h5 class="card-category">{{now.getFullYear()+'年'}}</h5>
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
  import D3Network from 'vue-d3-network'


  export default {
    name: "human-analysis",
    components: {
      BarChart,
      LineChart,
      D3Network
    },
    data() {
      return {
        now: Date,
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
        netChart: {
          nodes: [
            // { id: 1, name: 'myself' ,_size: '40'},
            // { id: 2 },
            // { id: 4 },
            // { id: 5 },
            // { id: 6 },
            // { id: 7 },
            // { id: 8 },
            // { id: 9 }
          ],
          links: [
            // { sid: 1, tid: 2, _color:'red'},
            // { sid: 2, tid: 1 },
            // { sid: 2, tid: 8, _color:'f0f' },
            // { sid: 3, tid: 4,_color:'rebeccapurple' },
            // { sid: 4, tid: 5 },
            // { sid: 5, tid: 6 },
            // { sid: 7, tid: 8 },
            // { sid: 5, tid: 8 },
            // { sid: 3, tid: 8 },
            // { sid: 7, tid: 9 },
            // { sid: 9, tid: 1 }
          ],
          options:
            {
              force: 4000,
              nodeSize: 20,
              nodeLabels: true,
              linkLabels: true,
              linkWidth:5,
              offset:{
                x:-50,
                y:-50,
              }
            }
        }
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
        this.now = new Date()
        this.LineChart1.chartData.labels = this.getSixMonthLabels();
      },
      loadNetData: function () {
        APIUtil.get('/Friendmap/'+ sessionStorage.userId
        ).then(response => {
          var root = response.data.root
          var map  = response.data.userMaps
          // 加载节点nodes
          for (var i = 0; i < map.length ; i++){
            if( map[i].user.id === root.id){
              this.netChart.nodes.push({id: map[i].user.id, name: map[i].user.user_name + '(我)', _size: '40'})//将root设置为本人节点
            }
            else{
              this.netChart.nodes.push({id: map[i].user.id, name: map[i].user.user_name})
            }
          }
          // endof 加载节点nodes

          // 加载边links
          console.log(map)
          for(var j = 0; j < map.length; j++){
            for (var k = 0; k < map[j].friends.length; k++){
              this.netChart.links.push({sid: map[j].user.id, tid: map[j].friends[k].id})
              // console.log("s:"+ map[j].user.user_name+ ", t:" + map[j].friends[k].user_name)
            }
          }
          // endof 加载遍links
        }).catch(() => {
          console.log('关系图数据读取失败')
        })
      }
    },
    created() {
      // 必须在图表渲染前就初始化好……
      this.initChart()
    },
    mounted() {
      this.loadNetData()
    }

    }
</script>

<style scoped>
 @import "../../assets/css/vue-d3-network.css";
</style>
