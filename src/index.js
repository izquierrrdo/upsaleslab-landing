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
  },
  submitHandler: function(form) {
    //$(form).ajaxSubmit();
    grecaptcha.ready(() => {
      grecaptcha
        .execute("6LcD4sYUAAAAAB1lcsNRsNB8wSjsq2-zX_5rDvIr", {
          action: "homepage"
        })
        .then(token => {
          console.log("1");
        });
    });
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
