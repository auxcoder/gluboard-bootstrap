(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

  // load samples dataset
  $(document).ready(function() {
    $.getJSON( "codes.json", function( data ) {
      window.sampleCodes = data;
    });
    $.getJSON( "data-01.json", function( data ) {
      window.samplesData = data;
      setLastSample(data);
    });
  });

  function getAverage(values) {
    var totalSum = 0;
    for (var i in values) {
      totalSum += Number(values[i]);
    }
    return Math.round(totalSum / values.length);
  }

  function lastDayOfSample(dataSet) {
    var dateToCompare = new Date();
    var samples = dataSet.map(function(sample) {
      return new Date(sample.date);
    });
    return window.dateFns.closestTo(dateToCompare, samples);
  }

  function setLastSample(dataSet) {
    var closestDateOfSample = lastDayOfSample(dataSet);
    var closestSamples = getSamplesByDate(dataSet, closestDateOfSample)
      .filter(function(sample) {
        return sample.code === 58
      });
    $("#lastSample .value").html(closestSamples[0].value);
  }
})(jQuery); // End of use strict
