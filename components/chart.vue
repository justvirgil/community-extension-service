<template>
  <div style="width: 300px; height: 300px">
    <Doughnut :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Doughnut } from 'vue-chartjs'

  ChartJS.register(ArcElement, Tooltip, Legend)

  export default {
    name: 'DoughnutChart',
    components: { Doughnut },
    props: {
      labels: {
        type: Array,
        default: () => []
      },
      datasets: {
        type: Array,
        default: () => []
      },
      options: {
        type: Object,
        default: () => ({
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1
        })
      }
    },
    computed: {
      chartData() {
        return {
          labels: this.labels,
          datasets: this.datasets
        }
      }
    }
  }
</script>
