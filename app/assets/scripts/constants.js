export const chartOptions = {
  hover: {
    onHover: ''
  },
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Supply and Demand by Zipcode',
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
