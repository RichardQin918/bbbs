var Index = function() {
    'use strict';

    var handleScroll = function() {
        $('.nav-scroll').localScroll(); 
    }

    var handleHeaderOnScroll = function() {
        if ($(window).scrollTop() > 0) {
            $('body').addClass('page-on-scroll');
        } else {
            $('body').removeClass('page-on-scroll');
        }
    }

    var handleHeight = function() {
        $('[data-auto-height]').each(function() {
                var parent = $(this);
                var items = $('[data-height]', parent);
                var height = 0;
                var mode = parent.attr('data-mode');
                var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

                items.each(function() {
                    if ($(this).attr('data-height') == "height") {
                        $(this).css('height', '');
                    } else {
                        $(this).css('min-height', '');
                    }

                    var height_ = (mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true));
                    if (height_ > height) {
                        height = height_;
                    }
                });

                height = height + offset;

                items.each(function() {
                    if ($(this).attr('data-height') == "height") {
                        $(this).css('height', height);
                    } else {
                        $(this).css('min-height', height);
                    }
                });

                if(parent.attr('data-related')) {
                    $(parent.attr('data-related')).css('height', parent.height());
                }
        });
    }

    var handleSlide = function() {
        jQuery(document).ready(function ($) {
            $('#checkbox').change(function(){
              setInterval(function () {
                  moveRight();
              }, 3000);
            });
            
              var slideCount = $('#slider ul li').length;
              var slideWidth = $('#slider ul li').width();
              var slideHeight = $('#slider ul li').height();
              var sliderUlWidth = slideCount * slideWidth;
              
              $('#slider').css({ width: slideWidth, height: slideHeight });
              
              $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
              
              $('#slider ul li:last-child').prependTo('#slider ul');
          
              function moveLeft() {
                  $('#slider ul').animate({
                      left: + slideWidth
                  }, 200, function () {
                      $('#slider ul li:last-child').prependTo('#slider ul');
                      $('#slider ul').css('left', '');
                  });
              };
          
              function moveRight() {
                  $('#slider ul').animate({
                      left: - slideWidth
                  }, 200, function () {
                      $('#slider ul li:first-child').appendTo('#slider ul');
                      $('#slider ul').css('left', '');
                  });
              };
          
              $('a.control_prev').click(function () {
                  moveLeft();
              });
          
              $('a.control_next').click(function () {
                  moveRight();
              });
          
        });    
          
    }

    var handleAOS = function() {
        AOS.init();
        $(window).on('resize', function () { AOS.refresh(); });
        $(window).on('load', function() { setTimeout(AOS.refreshHard, 150); });

        $(document).ready(function () {
            AOS.init({ 
            startEvent: 'load', 
            easing: 'ease-in-out-quart', 
            duration: 600,  once: false });            
        });
    }

    var handleMoving = function() {
        var fish = bodymovin.loadAnimation({
            container: document.getElementById('fish-top'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'public/js/animation/fish/data.json'
        })

        var conch = bodymovin.loadAnimation({
            container: document.getElementById('conch'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'public/js/animation/conch/data.json'
        })

        var baby = bodymovin.loadAnimation({
            container: document.getElementById('baby'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'public/js/animation/baby/data.json',
            assetsPath: 'public/img/baby/'
        })

        // var seaweed = bodymovin.loadAnimation({
        //     container: document.getElementById('seaweed'),
        //     renderer: 'svg',
        //     loop: true,
        //     autoplay: true,
        //     path: 'public/js/animation/seaweed/seaweed3.json'
        //     // assetsPath: 'public/img/seaweed/'
        // })
    }

    var handleMobile = function() {
        var $window = $(window)
        function resize() {
            if ($window.width() < 991) {
                $('.pc').hide()
                $('.mobile').show()
            } else {
                $('.mobile').hide()
                $('.pc').show()
            }
        }
        $window
            .resize(resize)
            .trigger('resize')

    }
    
    return {
        init: function() {
            handleScroll();
            handleHeaderOnScroll();
            handleHeight();
            handleSlide();
            $(window).scroll(function() {
                handleHeaderOnScroll();
            });
            handleAOS();
            handleMoving();
            handleMobile();
        }
    };
}();

$(document).ready(function() {
    Index.init();
    // console.log('running!')

});