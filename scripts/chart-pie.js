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
      backgroundColor: ['#4e73df', '#1cc88a', '#f6c23e',  '#e74a3b'],
      hoverBackgroundColor: ['#2e59d9', '#159667', '#daad3b', '#bf3d31'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
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
