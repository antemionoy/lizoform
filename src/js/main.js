//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.js
//= ../../bower_components/magnific-popup/dist/jquery.magnific-popup.js
//= ../../bower_components/fotorama/fotorama.js


"use strict";

function owlCarouselSlider(owl) {

    owl.owlCarousel({
        loop: false,
        margin: 20,
        nav: true,
        dots: false,
        slideBy: 1,
        items: 4,
        center: false,
        responsiveClass: true,
        navContainer: ".slider__nav",
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
                items: 2,
                dots: true

            },

            1023: {
                items: 4,
                dots: false
            }
        }
    });

}

function owlFunction(carousel) {

    $(carousel).owlCarousel({
        items: 1,
        loop: false,
        nav: true,
        dots: true,
        dotsContainer: ".c-dots .c-dots__row",
        responsive: {
            320: {
                items: 1,
            },

            480: {
                items: 1
            },

            768: {
                items: 1
            },

            1023: {
                items: 1
            }
        }
    });
}


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
    navContainer: ".slider__nav",
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
    dotsContainer: ".promo__dots",
    slideBy: 1,
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    center: false,
    responsiveClass: true,
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


function dropdownMenuToggle() {

    if ($(window).width() <= 1023) {

        $('.menu__link, .dropdown__link').each(function(i) {
            var item = i;

            $(this).on('click', function(e) {
                e.preventDefault();
                $(this).siblings('.menu__dropdown').toggleClass('active');
                $('.menu__link_dropdown').toggleClass('active');
                $(this).siblings('.menu__category').toggleClass('active');
                $(this).siblings('.menu__category').siblings('.dropdown__link').toggleClass('active');
            });

        });


        $('.menu__category_link-back').each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                // $(this).parents('.menu__item').find('.menu__link').removeClass('active');
                $(this).parents('.dropdown').toggleClass('active');
                $('.menu__link_dropdown').toggleClass('active');
            });
        });


        $('.menu__category_link').on('click', function(e) {

            e.preventDefault();

            $(this).toggleClass('active');
        });

    }
}


$(function() {

    owlCarouselSlider($('.s-gallery'));
    zoomPopUp('.s-gallery');
    dropdownMenuToggle();
    sidebarToggle();

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

    $('.card__carousel').fotorama({
        nav: 'thumbs'
    });


});