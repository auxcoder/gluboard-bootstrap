// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var chartPieConfig = {
  type: 'doughnut',
  data: {
    labels: ["Direct", "Referral", "Social"],
    datasets: [{
      data: [55, 30, 15],
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
    }],
  },
  options: {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    maintainAspectRatio: false,
    cutoutPercentage: 66,
  },
}

function updatePieConfigData(data) {
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
  chartPieConfig.data.labels = ['Low', 'Normal', 'High', 'Too High'];
  var levelsTotal = dataset
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
  chartPieConfig.data.datasets[0].data = levelsTotal;
  return chartPieConfig;
}

var chartPie;
window.addEventListener('load', (event) => {
  var timeoutID;
  var sampleData = new Promise((resolve) => {
    timeoutID = setTimeout(() => {
      if (window.hasOwnProperty('samplesData')) resolve(window.samplesData);
    }, 1000);
  });
  sampleData.then((data) => {
    window.clearTimeout(timeoutID);
    var ctx = document.getElementById("chartPie");
    chartPie = new Chart(ctx, updatePieConfigData(data));
  })
});
