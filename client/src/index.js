import $ from "jquery";
import validate from "jquery-validation";
import slick from "slick-carousel";
import "./css/index.css";
import "./scss/index.scss";

$("#myform").validate({
  ignore: ".ignore",
  rules: {
    name: "required",
    email: {
      required: true,
      email: true
    },
    hiddenRecaptcha: {
      required: function() {
        if (grecaptcha.getResponse() == "") {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  messages: {
    name: "Please enter your name",
    email: "Please enter a valid email address"
  }
});

$(".my-carousel").slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,

  nextArrow: '<div class="slider__next"></div>',
  prevArrow: '<div class="slider__prev"></div>',

  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

//smooth scroll
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
