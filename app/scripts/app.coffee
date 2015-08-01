$(document).ready ->

  $(".navbar").sticky
    topSpacing: 0

  $(window).load ->
    container = $('.grid')
    container.isotope
      itemSelector: '.element-item'
      filter: '*'
      animationOptions:
        duration: 750,
        easing: 'linear',
        queue: false

  $('.filterButton').click (e) ->
    e.preventDefault()

    $('.nav li.active').removeClass 'active'
    $(this).parent().addClass 'active'

    grid = $('.grid')
    selector = $(this).attr 'data-filter'
    grid.isotope
      filter: selector
