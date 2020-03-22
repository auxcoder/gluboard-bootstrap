var MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var MONTHS_CHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var chartLineConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: "Sample Value",
      lineTension: 0,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 5,
      data: [],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 15,
        top: 15,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          // drawBorder: false
        },
        // ticks: {
        //   maxTicksLimit: 11
        // }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 10,
          padding: 10,
          callback: function(value, index, values) {
            return  (index === values.length - 1  ? 'mg/dL ' : '') + value;
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          // drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem) {
          // https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-item-interface
          return  window.dateFns.format(new Date(tooltipItem.label), 'MMM d, yyyy');
        },
        title: function(tooltipItems) {
          return  tooltipItems[0].yLabel + ' mg/dL';
        }
      }
    }
  }
};

function updateLineConfigData(data) {
  var targetcode = 58;
  var dataset = data.filter(sample => sample.code == targetcode).slice(0, 30);
  chartLineConfig.data.labels = dataset.map(item => window.dateFns.format(new Date(item.date), 'MMM d'));
  chartLineConfig.data.datasets[0].data = dataset.map(item => item.value);
  return chartLineConfig
}

// Line Chart
var chartLine;
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  var timeoutID;
  var sampleData = new Promise((resolve) => {
    timeoutID = setTimeout(() => {
      if (window.hasOwnProperty('samplesData')) resolve(window.samplesData);
    }, 1000);
  });
  sampleData.then((data) => {
    window.clearTimeout(timeoutID);
    var ctx = document.getElementById("chartLine");
    chartLine = new Chart(ctx, updateLineConfigData(data));
  });
});
