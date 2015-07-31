$(document).ready ->

  $(".navbar").sticky
    topSpacing: 0

  $(".filter").sticky
    topSpacing: 57

  $(window).load ->
    container = $('.grid')
    container.isotope
      itemSelector: '.element-item'
      filter: '*'
      animationOptions:
        duration: 750,
        easing: 'linear',
        queue: false

  $('.filterButton').click ->
    grid = $('.grid')
    selector = $(this).attr 'data-filter'
    grid.isotope
      filter: selector
