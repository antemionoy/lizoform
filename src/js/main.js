//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.js
//= ../../bower_components/magnific-popup/dist/jquery.magnific-popup.js
//= ../../bower_components/fotorama/fotorama.js
//= ../../bower_components/remodal/dist/remodal.min.js



"use strict";

function zoomPopUp(item) {
    $(item).magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });
}


$('.certificates__slider').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    slideBy: 1,
    items: 4,
    center: false,
    responsiveClass: true,
    responsive: {

        320: {
            items: 1,
            dots: true
        },

        480: {
            items: 1,
            dots: true
        },

        768: {
            items: 3,
            dots: true

        },

        1023: {
            items: 4,
            dots: false
        },

        1320: {
            items: 4,
            dots: false
        }
    }
});

$('.promo__slider').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    slideBy: 1,
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    center: false,
    responsiveClass: true,
    navContainer: ".slider__nav",
    responsive: {

        320: {
            items: 1,
        },

        480: {
            items: 1,
        },

        768: {
            items: 1,

        },

        1023: {
            items: 1,
        }
    }
});


function sidebarToggle() {
    if ($(window).width() <= 1023) {

        $('.hamburger').on('click', function(e) {
            e.preventDefault();

            $(this).toggleClass("is-active");
            $('.header__bottom').toggleClass('is-visible');
            $('.wrapper').toggleClass('open-sidebar');
            $('html').toggleClass('overflow');

        });

    }

}


function closeFormModal(itemClick, form) {

    var inst = $('.remodal').remodal();

    $(itemClick).click(function(e) {
        e.preventDefault();

        if(inst){
            inst.close();
        }

        if ($('.contact-form').parent().find('.remodal__box-title').length > 0) {
            $('.contact-form').parent().find('.remodal__box-title').show();
        }

        $('.form-complete').hide();
        $(form).show();


        return false;

    });
}


function formAjax(){


    $(".form-ajax").submit(function(e) {
        e.preventDefault();

        var LongByteValidate = true;
        var senderForm = this;

        if (LongByteValidate) {

            $.ajax({
                type: "POST",
                url: "../../sendemail.php",
                data: $(senderForm).serializeArray()
            }).done(function(result) {

                console.log('done');

                $(senderForm).find("input, textarea").val("");

                if ($(senderForm).hasClass('form-ajax')) {
                    $(senderForm)
                        .hide()
                        .siblings('.form-complete')
                        .show();

                    if ($('.contact-form').parent().find('.remodal__box-title').length > 0) {
                        $('.contact-form').parent().find('.remodal__box-title').hide();
                        console.log('hide');
                    }

                } else {
                    $(senderForm)
                        .closest('.contact-form')
                        .hide()
                        .siblings('.form-complete')
                        .show();
                }
            });

        }
        return false;
    });


    closeFormModal('.form-complete .button', '.form-ajax');

}


$(function() {

    formAjax();
    zoomPopUp('.s-gallery');

    $(window).scroll(function() {
        if ($(this).scrollTop() != 0) {
            $('.arrow-up').fadeIn();
        } else {
            $('.arrow-up').fadeOut();
        }

    });

    $(window).resize(function() {
        dropdownMenuToggle();
    });

    $('.arrow-up').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });


    var fotoramaBox = $('.card__carousel').fotorama({
        nav: 'thumbs',
        click:false,
        arrows: true,
        allowfullscreen:true
    });

    // var fotorama = fotoramaBox.data('fotorama');

    // $('.fotorama').click(function(){
    //     fotorama.requestFullScreen();    
    // });

});