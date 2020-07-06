$(document).ready(function () {
    //ДЕСКТОП ВЕРСІЯ
    //поява/скривання липкого блоку
    $(window).scroll(function () {
        if($(window).width() > 480) {
            if ($(this).scrollTop() > 180) {
                $('.cabinet-block').addClass('sticky-block')
                $('.cabinet-wrapper').addClass('sticky-cabinet-wrapper')
                $('.catalog-btn-sticky-wrapper').css('display', 'block')
            } else {
                $('.cabinet-block').removeClass('sticky-block')
                $('.cabinet-wrapper').removeClass('sticky-cabinet-wrapper')
                $('.catalog-btn-sticky-wrapper').css('display', 'none')            
                $('.catalog-menu-wrapper').removeClass('sticky-catalog-menu-wrapper_show')                  
            }
        }
    })
    //відкриття/закриття каталогу товарів, липкий блок   
    $('.catalog-btn-sticky').on('click', function () {
        $('.catalog-menu-wrapper').toggleClass('sticky-catalog-menu-wrapper_show');
    })
    
    //catalog-btn hover, модальне вікно    
    $('.catalog-btn-menu').on('mouseover', function () {
        //запобігання роботі ховера на головній сторінці
        if ($('.center-main-container').hasClass('home') && $(window).width() > 1024) {
            $(this).css('cursor', 'default');
            return false;
        }        
        $('.catalog-menu-wrapper').fadeIn(300).css('display', 'block')
        $('.catalog-menu-wrapper').addClass('catalog-btn-menu_hover')
        $('.catalog-btn-substrate').addClass('catalog-btn-substrate_menu-hover')
        $('.catalog-btn-hover-modal-background').addClass('catalog-btn-hover-modal-background_active')
        
    })

    $('.catalog-btn-hover-modal-background').on('mouseover', function () {        
        $('.catalog-menu-wrapper').fadeOut(300).css('display', 'none')
        $('.catalog-menu-wrapper').removeClass('catalog-btn-menu_hover')
        $('.catalog-btn-substrate').removeClass('catalog-btn-substrate_menu-hover')
        $('.catalog-btn-hover-modal-background').removeClass('catalog-btn-hover-modal-background_active')        
    })
    //відміна скрола при ховері каталога товарів
    $('.catalog-menu-btn-wrapper').on('mousewheel', function(){        
        if ($('.catalog-btn-hover-modal-background').hasClass('catalog-btn-hover-modal-background_active')) {
            return false;
        }        
    })   
    //випадашка особистого кабінета    
    $('.cabinet__avatar-ico').on('click', function() {
        if ($('.person-cabinet__dropdown-block').hasClass('person-cabinet__dropdown-block_show')) {
            $('.person-cabinet__dropdown-block').fadeOut(200).removeClass('person-cabinet__dropdown-block_show');
        }
        else {
            $('.person-cabinet__dropdown-block').fadeIn(200).addClass('person-cabinet__dropdown-block_show');
        }
    })
    $('.person-cabinet__dropdown-block').on('mouseleave', function() {
        $(this).fadeOut(200).removeClass('person-cabinet__dropdown-block_show');
    })
     //попап корзини десктоп
     $('.cabinet__basket-ico').on('click', function() {
        $('.basket-popup-container').show();
        $('.basket-popup-window').show(200);
    })
    $('.basket-popup-container').on('click', function() {
        $(this).hide();
        $('.basket-popup-window').hide(200);
    })
    $('.basket-popup__close-btn').on('click', function() {
        $('.basket-popup-container').hide();
        $('.basket-popup-window').hide(200);
    })
    $('.basket-popup-window').on('click', function(e) {
        e.stopPropagation();
    })   
    
    //показ меню каталога товарів на головній сторінці
    mainPageCatalogMenuDisplay();

    $(window).resize(function () {
        mainPageCatalogMenuDisplay();
    })

    function mainPageCatalogMenuDisplay() {
        //перевірка на головну сторінку і ширину, відображення меню
        if ($('.center-main-container').hasClass('home')) {
            if ($(window).width() > 1024) {
                $('.catalog-menu-wrapper').addClass('catalog-menu-wrapper_display')
                $('.catalog-menu-btn-wrapper').addClass('catalog-menu-btn-wrapper_home1024')                
            }
            else {
                $('.catalog-menu-wrapper').removeClass('catalog-menu-wrapper_display')                     
                $('.catalog-menu-btn-wrapper').removeClass('catalog-menu-btn-wrapper_home1024')                         
            }
        }
    }
    //підключення основного слайдера
    $('.main-slider__block').slick({
        prevArrow: '<img class="slider-btn-left" src="img/left-slider-btn.png">',
        nextArrow: '<img class="slider-btn-right" src="img/right-slider-btn.png">',
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 3000
    });

    // задання слайдера в мобільній версії для блоку товарів та переваги
    // goodsSliderMobile();
    // advantageSliderMobile();

    $(window).resize(function () {
        if ($(window).width() < 480) {
            goodsSliderMobile();
            advantageSliderMobile();
        } else {
            $('.goods-slider-mobile').slick("unslick")
            $('.advantage-slider-mobile').slick("unslick")
        }
    })

    if ($(window).width() < 480) {
        goodsSliderMobile();
        advantageSliderMobile();
    }

    function goodsSliderMobile() {
        $('.goods-slider-mobile').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            dots: true
        })
    }

    function advantageSliderMobile() {
        $('.advantage-slider-mobile').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            dots: true
        })
    }

    //підключення слайдера блока відгуків
    $('.reviews-slider__wrapper').slick({
        infinite: true,
        // autoplay: true,
        dots: true,
        autoplaySpeed: 3000
    });
    //прив'язка картинок до слайдера відгуків
    $('.review-pic-slide-trigger').on('click', function () {
        $picPersonData = $(this).data('pic-person');
        $slider = $('.reviews-slider__wrapper');
        $slider.slick('slickGoTo', $picPersonData);
    });
    //привязка активного слайда до картинки
    $('.reviews-slider__wrapper').on('beforeChange', function (slick, currentSlide) {
        $slideIndex = currentSlide.currentSlide
        $('.review-pic-slide-trigger').each(function (index, elem) {
            if ($(elem).data('pic-person') == $slideIndex) {
                $('.review-pic-slide-trigger').removeClass("review-pic-slider_active")
            }
        })
    })

    $('.reviews-slider__wrapper').on('afterChange', function (slick, currentSlide) {
        $slideIndex = currentSlide.currentSlide
        $('.review-pic-slide-trigger').each(function (index, elem) {
            if ($(elem).data('pic-person') == $slideIndex) {
                $(elem).addClass("review-pic-slider_active")
            }
        })
    })

    //адаптивний слайдер блока з брендами
    $('.brands-slider-block').slick({
        slidesToShow: 6,
        slidesToScroll: 3,
        dots: true,
        // autoplay: true,
        infinite: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    //кнопка вверх
    $('.page-up-btn').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 700);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.page-up-btn').fadeIn(200);
        } else {
            $('.page-up-btn').fadeOut(200);
        };
    });
    //пульсація кнопок головного слайдера при клікові
    $('.slider-btn-left').on('mousedown', buttonScale)
    $('.slider-btn-left').on('mouseup', resetButtonScale)
    $('.slider-btn-right').on('mousedown', buttonScale)
    $('.slider-btn-right').on('mouseup', resetButtonScale)

    function buttonScale() {
        $(this).css("transform", "scale(1.1)");
    }

    function resetButtonScale() {
        $(this).css("transform", "scale(1)");
    }

    //фільтра товарів
    //випадалка фільтрів
    $('.filter-dropdown_trigger').on('click', function () {
        $($(this).siblings('.filters-dropdown-container')).toggleClass('filters-dropdown-container_open')
        $($(this).find('.chose-category-filter-state-ico')).toggleClass('chose-category-filter-state-ico_open')
    })

    //підключення двойного повзунка, фільтр цін
    let priceRangeSlider = document.getElementById('price-range-slider');
    if (priceRangeSlider) {
        noUiSlider.create(priceRangeSlider, {
            start: [20, 60],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
    }

    let weightRangeSlider = document.getElementById('weight-range-slider');
    if (weightRangeSlider) {
        noUiSlider.create(weightRangeSlider, {
            start: [0.2, 0.7],
            connect: true,
            range: {
                'min': 0.1,
                'max': 2
            }
        });
    }
    let fatsRangeSlider = document.getElementById('fats-range-slider');
    if (fatsRangeSlider) {
        noUiSlider.create(fatsRangeSlider, {
            start: [0, 0],
            connect: true,
            range: {
                'min': 0.1,
                'max': 100
            }
        });
    }
    let proteinsRangeSlider = document.getElementById('proteins-range-slider');
    if (proteinsRangeSlider) {
        noUiSlider.create(proteinsRangeSlider, {
            start: [0, 0],
            connect: true,
            range: {
                'min': 0.1,
                'max': 100
            }
        });
    }
    let carbonsRangeSlider = document.getElementById('carbons-range-slider');
    if (carbonsRangeSlider) {
        noUiSlider.create(carbonsRangeSlider, {
            start: [0, 0],
            connect: true,
            range: {
                'min': 0.1,
                'max': 100
            }
        });
    }
    let caloriesRangeSlider = document.getElementById('calories-range-slider');
    if (caloriesRangeSlider) {
        noUiSlider.create(caloriesRangeSlider, {
            start: [0, 50],
            connect: true,
            step: 1,
            range: {
                'min': 0,
                'max': 1000
            }
        });
    }

    //відображення даних повзунків ціни
    $('.noUi-target').on('click', function () {
        $('.price-field__min').attr('value', $('.noUi-handle-upper').attr('aria-valuemin'))
        $('.price-field__max').attr('value', $('.noUi-handle-upper').attr('aria-valuenow'))
    })
    //відображення даних повзунків фільтрів
    $('.noUi-target').on('click', function () {
        $minValue = $(this).find('.noUi-handle-upper').attr('aria-valuemin');
        $maxValue = $(this).find('.noUi-handle-upper').attr('aria-valuenow');
        $(this).siblings('.filter-range-display-wrapper').find('.filter-range-display__min').text($minValue);
        $(this).siblings('.filter-range-display-wrapper').find('.filter-range-display__max').text($maxValue);

    })
    //скриття карточок акційних товарів нижні ряди
    // let stockCards = document.querySelectorAll('.stock-product-unit')
    // for (let i = 0; i < stockCards.length; i++) {
    //     if(stockCards[i].offsetWidth == 300) {
    //         stockCards[i].style.display = 'none'
    //     }    
    // }
    
    //підключення плагина кастомізованого селекта
    if (document.querySelector('.products-quick-sort-filter-block')) {
        $('.products-quick-sort-filter-block').niceSelect();
   }
     //випадайка швидкого сортування мобілка
   if(document.querySelector('.mobile-quick-sort-block')) {
        $('.mobile-quick-sort-block').niceSelect();
    }
    //задання стрілочки напрямку застосованого фільтра
    $('li.option').on('click', function(){        
        if ($(this).data('value') == 'price_high' ) {
            $('.current').addClass('up-arrow');            
        }
        if ($(this).data('value') == 'price_low' )  {
            $('.current').removeClass('up-arrow');
        }                
    })
    //модалка форми добавляння адресу особистий кабінет
    $('.account-add-address-btn').on('click', function() {
        $('.add-address-popup-container').addClass('add-address-popup-container_active')
    })
     
    $('.add-address-popup-container').on('click', function(e) {        
        $(this).removeClass('add-address-popup-container_active')                         
    })    
    //запобігання закриттю модалки при кліку на нею
    $('.add-address-popup-window').click(function(e) {
        e.stopPropagation()
    })
    
     //модалка входа особистого кабінету 
     $('.cabinet-entrance-btn').on('click',  function(){
        userPopupFormDisplay($(this).data('tab-bind'));
    })
    //модалка реєстрації особистого кабінету
    $('.cabinet-register-btn').on('click', function(){        
        userPopupFormDisplay($(this).data('tab-bind')); 
    })
    //функція перемикання табів до появлення модалки
    function userPopupFormDisplay(data = null) {
        //перемикання табів 
        if(data == '0' || data == '1'){                    
            $('.user__tab').removeClass('user__tab_active');
            $('.user__tab').eq(data).addClass('user__tab_active');
            $('.tab-form').removeClass('tab-form_active');
            $('.tab-form').eq(data).addClass('tab-form_active');
        }
        $('.user-cabinet-popup-container').addClass('user-cabinet-popup-container_active');
        $('.user-cabinet-popup-window').fadeIn(150).addClass('user-cabinet-popup-window_active')
    } 
    
    //вихід з модалки
    $('.user-cabinet-popup-container').on('click', function() {
        $(this).removeClass('user-cabinet-popup-container_active')
        $('.user-cabinet-popup-window').fadeOut().removeClass('user-cabinet-popup-window_active')
    })
    $('.user-cabinet-popup-window').on('click', function(e) {
        e.stopPropagation();
    })    
    function popupTabSwitch() {        
        $(this).addClass('user__tab_active').siblings().removeClass('user__tab_active');
        $(this).closest('.user-cabinet-popup-window').find('.tab-form').removeClass('tab-form_active').eq($(this).index()).addClass("tab-form_active");
    }
     //таби попапа реєстрації/входа    
    $('.tabs-caption').on('click', '.user__tab:not(.user__tab_active)', popupTabSwitch);
    //перемикач форми реєстрації додаткових полів
    $('.register-client-switch-btn-wrapper').on('click', function() {
        $(this).find('.client-switch-btn_active').removeClass('client-switch-btn_active').siblings().addClass('client-switch-btn_active');
        $(this).closest('.register-client-switch-btn-wrapper').siblings('.register-business-block').toggleClass('register-business_active');
    })
    //форма замовлення
    $('input').on('change', function() {        
        if ($('#order-main-tel').prop('value') != undefined) {
            $('.order-step-btn').addClass('order-main-info-btn');
            $('.order-main-info-btn').on('click', function() {
                $('.order-step-block__delivery').addClass('order-step-block_show');                    
                $('html, body').animate({
                    scrollTop: 500
                    }, 400
                );
            });
        }
    
    })
    
    

    $('.order-delivery-btn').on('click', function() {
        $('.order-step-block__payment').addClass('order-step-block_show');        
        $('html, body').animate({
            scrollTop: 800
            }, 400
        );
    });

    //перемикання блоків доставки 
    $('.order-delivery-label').on('click', function() {
        if ($('input[name="order-delivery"]').prop('checked')){ 
            $(this).closest('.delivery-radio-wrapper').siblings('.order-delivery-input-block').toggle();
        }
        else{
            $(this).closest('.delivery-radio-wrapper').siblings('.order-delivery-input-block').toggle();
        }
    })
    
     //МОБІЛЬНА ВЕРСІЯ

    //мобільна карта
    //вмикання списку адрес магазинів
    $('.mobile-shops-list-btn').on('click', function () {
        $('.mobile-map-tab__title').removeClass('mobile-map-tab__title_active')
        $(this).addClass('mobile-map-tab__title_active')
        $('.shops-address-mobile-map-wrapper').removeClass('shops-address-mobile-map_show')
    })
    $('.mobile-shops-map-btn').on('click', function () {
        $('.mobile-map-tab__title').removeClass('mobile-map-tab__title_active')
        $(this).addClass('mobile-map-tab__title_active')
        $('.shops-address-mobile-map-wrapper').addClass('shops-address-mobile-map_show')
    })
    //показ фільтрів товарів
    $('.mobile-show-filters-btn').on('touchstart', function() {
        $('.product-filters-block').toggle();
    })
    //слайдера сторінки товара
    if ($(window).width() < 480) {
        $('.product__gallery-imgs').slick({
            prevArrow: '<span class="product-slider-left-arrow"></span>',
            nextArrow: '<span class="product-slider-right-arrow"></span>',
            infinite: true,
            // autoplay: true,
            autoplaySpeed: 3000
        });
        $('.mobile-slider-stock-products').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            infinite: true,
            // autoplay: true,
            autoplaySpeed: 3000
        });
        $('.mobile-slider-similar-products').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            infinite: true,
            // autoplay: true,
            autoplaySpeed: 3000
        });
    }
    //прилипаючий мобільний хедер
    $(window).resize(function() {
        if( $(window).width() < 480) {
            $('.mobile-logo-header').addClass('mobile-logo-header-sticky')
            $('.cabinet-block').css("margin-top", "70px")
        }
        else {
            $('.mobile-logo-header').removeClass('mobile-logo-header-sticky')
            $('.cabinet-block').css("margin-top", "0px")
        }
    })
    //блок цін мобільна версія
    if( $(window).width() < 480) {
        $(window).scroll(function() {       
            if ($(this).scrollTop() > 1000) {
                $('.mobile-basket-sticky').fadeIn(200).addClass('mobile-basket-sticky_active');
            } else {
                $('.mobile-basket-sticky').fadeOut(200).removeClass('mobile-basket-sticky_active');
            }       
        })
    }
    
    
    
})
    
      
