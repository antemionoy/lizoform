//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.js
//= ../../bower_components/magnific-popup/dist/jquery.magnific-popup.js
//= ../../bower_components/fotorama/fotorama.js
//= ../../bower_components/remodal/dist/remodal.min.js
//= ../../bower_components/jquery-mask-plugin/dist/jquery.mask.js

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


function formAjax(){

    $(".form-ajax").submit(function(e) {
        e.preventDefault();

        var LongByteValidate = true;
        var senderForm = this;

        if (LongByteValidate) {

            $.ajax({
                type: "POST",
                url: "../sendeamil.php",
                data: $(senderForm).serializeArray()
            }).done(function(result) {

                console.log(result);

                $(senderForm).find("input, textarea").val("");
                
                if ($(senderForm).hasClass('form-ajax')) {

                    var inst = $('.modal-form').remodal();

                    if(inst){
                        inst.open();
                    }

                } 
            });

        }
        return false;
    });

}


function selectFun() {

    $('.form__select').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function() {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });

}

function changeCheckbox(checkbox, btn) {
    var elementCheckbox = $(checkbox);
    var elementBtn = $(btn);

    elementCheckbox.click(function() {
        if ($(this).is(':checked')) {
            $(this).parents('form').find(elementBtn).removeClass('btn_disabled');
        } else {
            $(this).parents('form').find(elementBtn).addClass('btn_disabled');
        }
    });
}


function catalogChange() {

    var tabTriggerBtns = document.querySelectorAll('.catalog__col');

    tabTriggerBtns.forEach(function(tabTriggerBtn, index) {

        tabTriggerBtn.addEventListener('click', function(e) {
            e.preventDefault();

            var currentTabData = document.querySelector('.catalog__info[data-tab-content="' + this.dataset.tabCategory + '"]');

            console.log(this.dataset.tabCategory);

            if(currentTabData){
                // remove classess
                document.querySelector('.catalog__info.is-open').classList.remove('is-open');
                document.querySelector('.catalog__col.is-active').classList.remove('is-active');
                // add classes
                currentTabData.classList.add('is-open');
                this.classList.add('is-active');
            }


        });
    });


    var tabTrigger = document.querySelectorAll('.tabs__btn');

    tabTrigger.forEach(function(tabTrigger, index) {

        tabTrigger.addEventListener('click', function(e) {
            e.preventDefault();

            var currentTab = document.querySelector('.catalog__section[data-tab-content="' + this.dataset.tabCategory + '"]');

            console.log(this.dataset.tabCategory);

            if(currentTab){
                // remove classess
                document.querySelector('.catalog__section.is-open').classList.remove('is-open');
                document.querySelector('.tabs__btn.tabs__btn_active').classList.remove('tabs__btn_active');
                // add classes
                currentTab.classList.add('is-open');
                this.classList.add('tabs__btn_active');
            }


        });
    });

}

function sidebarToggle() {

        $('.hamburger').on('click', function(e) {
            e.preventDefault();

            $(this).toggleClass("is-active");
            $('.header__nav').toggleClass('is-visible');
            $('.wrapper').toggleClass('open-sidebar');
            $('html').toggleClass('overflow');

        });

}

function tableScroll(){

    var table = $('table');

    if ($(window).width() <= 767) {

        table.wrap('<div class="wrap-table"></div>');

    }
}

function inputmask() {

    $(".mask").mask("+7 (999) 999-99-99");

}



$(function() {

    inputmask();

    tableScroll();

    catalogChange();

    changeCheckbox('.terms-conditions input', '.btn');

    changeCheckbox('.terms-conditions_black input', '.btn');

    changeCheckbox('.terms-conditions input', '.remodal__btn');

    selectFun();

    formAjax();

    zoomPopUp('.s-gallery');

    sidebarToggle();

    var fotoramaBox = $('.card__carousel').fotorama({
        nav: 'thumbs',
        click: false,
        arrows: true,
        allowfullscreen: true
    });

    $(window).scroll(function() {

        if ($(this).scrollTop() != 0) {
            $('.arrow-up').fadeIn();
        } else {
            $('.arrow-up').fadeOut();
        }

    });

    $(window).resize(function() {
        tableScroll();
        sidebarToggle();
    });

    $('.arrow-up').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });

});