export const chartOptions = {
  hover: {
    onHover: ''
  },
  animation: {
    duration: 400,
    easing: 'easeInOutExpo'
  },
  maintainAspectRatio: false,
  title: {
    display: true,
    fontSize: 16,
    padding: 40,
    fullWidth: true
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  scales: {
    xAxes: [{
      ticks: {
        beginAtZero: true,
        max: 50,
        fontColor: 'rgb(175,175,0175)'
      },
      gridLines: {
        color: 'rgb(151, 151, 151)',
        display: false
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        max: 35,
        fontColor: 'rgb(175,175,0175)'
      },
      gridLines: {
        color: 'rgb(151, 151, 151)',
        display: false
      }
    }]
  }
}
