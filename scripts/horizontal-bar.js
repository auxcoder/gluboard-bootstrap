var color = Chart.helpers.color;
var horizontalBarChartData = {
  datasets: [{
    backgroundColor: [
      'rgb(78, 115, 223)',
      'rgb(28, 200, 138)',
      "rgb(246, 194, 62)",
      'rgb(231, 74, 59)'
    ],
    hoverBackgroundColor: [
      'rgb(78, 115, 223, 0.2)',
      'rgba(28, 200, 138, 0.2)',
      "rgba(246, 194, 62, 0.2)",
      'rgba(231, 74, 59, 0.2)'
    ],
    borderColor: [
      'rgb(78, 115, 223)',
      'rgb(28, 200, 138)',
      "rgb(246, 194, 62)",
      'rgb(231, 74, 59)'
    ],
    borderWidth: 2,
  }]
};

var barConfig = {
  type: 'horizontalBar',
  data: horizontalBarChartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: false,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
};

function asPercent(levels) {
  const total = levels.reduce((acc, curr) => (acc + curr), 0);
  return levels.map(level => {
    return Math.round(level * 100 / total);
  });
}

function updateBarConfigData(data) {
  const levels = {
    low: {
      value: 70,
      label: 'Low',
      total: 0,
    },
    normal: {
      total: 0,
      label: 'High',
    },
    high: {
      value: 130,
      label: 'High',
      total: 0
    },
    toohigh: {
      value: 160,
      label: 'High',
      total: 0
    }
  };

  var targetcode = 58;
  var dataset = data.filter(sample => sample.code == targetcode);
  barConfig.data.labels = ['Low', 'Normal', 'High', 'Too High'];
  var levelsByLevel = dataset
    .map(item => {
      item.value = Number(item.value);
      return item
    })
    .reduce((acc, curr) => {
      if (curr.value < levels.low.value) acc[0] += 1;
      if (curr.value > levels.high.value) acc[2] += 1;
      if (curr.value >= levels.low.value && curr.value <= levels.high.value) acc[2] += 1;
      if (curr.value >= levels.toohigh.value) acc[3] += 1;
      return acc;
    }, [0, 0, 0, 0]);
    barConfig.data.datasets[0].data = asPercent(levelsByLevel);

  return barConfig;
}

var chartHorizontalBar;
window.addEventListener('load', (event) => {
  var timeoutID;
  var sampleData = new Promise((resolve) => {
    timeoutID = setTimeout(() => {
      if (window.hasOwnProperty('samplesData')) resolve(window.samplesData);
    }, 1000);
  });
  sampleData.then((data) => {
    window.clearTimeout(timeoutID);
    var ctx = document.getElementById("chartHorizontalBar");
    chartHorizontalBar = new Chart(ctx, updateBarConfigData(data));
  })
});
