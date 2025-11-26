<template>
  <div ref="chartRef" class="w-full h-80"/>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

const props = defineProps({
  portfolio: {
    type: Object,
    required: true
  }
})

const amounts = computed(() => {
  return Object.fromEntries(
      (props.portfolio.allocation ?? []).map(a => [a.asset, '€' + formatValue(a.value)])
  )
})

// Fonction pour formater les nombres en K, M, B si > 4 chiffres
function formatValue(value) {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + 'B'
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M'
  if (value >= 10_000) return (value / 1_000).toFixed(1) + 'K'
  return value
}

const formattedTotalAssets = computed(() => props.portfolio.allocation?.map(v => ({
    value: v.percent,
    name: v.asset
  }))
)

const totalValue = computed(() => props.portfolio.total_value)

function setChartOption() {
  if (!chartInstance) return

  chartInstance.setOption({
    legend: {
      top: '5%',
      left: 'center',
      formatter: function(name) {
        return `${name}: ${amounts.value[name] || ''}`
      }
    },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '€' + formatValue(totalValue.value),
          fontSize: 24,
          fontWeight: 'bold',
          fill: '#000',
          lineHeight: 30,
          align: 'center'
        }
      }
    ],
    series: [
      {
        name: 'Total',
        type: 'pie',
        radius: ['60%', '70%'],
        avoidLabelOverlap: true,
        padAngle: 5,
        minAngle: 5,
        itemStyle: { borderRadius: 10 },
        label: { show: false },
        labelLine: { show: false },
        emphasis: { scale: false, label: { show: false } },
        data: formattedTotalAssets.value
      }
    ]
  })
}

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)
  setChartOption()
})

// Watch pour mettre à jour automatiquement si totalValue change
watch([totalValue, formattedTotalAssets], () => {
  setChartOption()
})

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.dispose()
})
</script>
