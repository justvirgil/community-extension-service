<template>
  <div style="width: 300px; height: 300px;">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: { Pie },
  data() {
    return {
      data: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [{ backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'], data: [40, 20, 80, 10] }]
      },
      options: { 
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1
      }
    }
  }
}
</script>
