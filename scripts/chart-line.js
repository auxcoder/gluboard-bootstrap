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

function updateData(data, start, end) {
  var dataset = data;
  if (start) dataset = dataset.filter(sample => window.dateFns.isAfter(new Date(sample.date), new Date(start)));
  if (end) dataset = dataset.filter(sample => window.dateFns.isBefore(new Date(sample.date), new Date(end)));
  if (!start && !end) dataset = dataset.slice(0, 30);
  return dataset
}

function updateLineConfigData(data, start, end) {
  var dataset = updateData(data, start, end)
  chartLineConfig.data.labels = dataset.map(item => window.dateFns.format(new Date(item.date), 'MMM d'));
  chartLineConfig.data.datasets[0].data = dataset.map(item => item.value);
  return chartLineConfig
}


(function($) {
  // Start of use strict
  "use strict";

  // Line Chart
  var targetcode = 58;
  var chartLine;
  window.addEventListener('load', (event) => {
    var toID;
    var sampleData = new Promise((resolve) => {
      toID = setTimeout(() => {
        if (window.hasOwnProperty('samplesData')) resolve(window.samplesData.filter(sample => sample.code == targetcode));
      }, 1000);
    });
    sampleData.then((data) => {
      window.clearTimeout(toID);
      var ctx = document.getElementById("chartLine");
      chartLine = new Chart(ctx, updateLineConfigData(data));
    });
  });

  $(document).ready(function() {
    document.addEventListener('update-data', function(event) {
      var data = window.samplesData.filter(sample => sample.code == targetcode);
      var toDate = window.lastDayOfSample(window.samplesData);
      var dataset;
      switch (event.detail.name) {
        case 'lastMonth':
          var fromDate = window.dateFns.subMonths(toDate, 1);
          dataset = updateData(data, fromDate, toDate);
          chartLine.data.datasets[0].data = dataset.map(item => item.value);
          chartLine.data.labels = dataset.map(item => window.dateFns.format(new Date(item.date), 'MMM d'));
          chartLine.update();
          break;
        case 'lastTwoMonths':
          var fromDate = window.dateFns.subMonths(toDate, 2);
          dataset = updateData(data, fromDate, toDate);
          chartLine.data.datasets[0].data = dataset.map(item => item.value);
          chartLine.data.labels = dataset.map(item => window.dateFns.format(new Date(item.date), 'MMM d'));
          chartLine.update();
          break;
        case 'lastThreeMonths':
          var fromDate = window.dateFns.subMonths(toDate, 3);
          dataset = updateData(data, fromDate, toDate);
          chartLine.data.datasets[0].data = dataset.map(item => item.value);
          chartLine.data.labels = dataset.map(item => window.dateFns.format(new Date(item.date), 'MMM d'));
          chartLine.update();
          break;
        case 'lastSixMonths':
          var fromDate = window.dateFns.subMonths(toDate, 6);
          dataset = updateData(data, fromDate, toDate);
          chartLine.data.datasets[0].data = dataset.map(item => item.value);
          chartLine.data.labels = dataset.map(item => window.dateFns.format(new Date(item.date), 'MMM d'));
          chartLine.update();
          break;
        default:
          break;
      }

      chartLine
    });
  });
})(jQuery); // End of use strict
