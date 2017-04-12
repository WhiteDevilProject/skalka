
$(document).ready(function(){
    var w_w = $(window).width();
    var w_h = $(window).height();
    $('.scroll').on('click', function(){
        if($('.wrapper').hasClass('fullpage-wrapper')){
            $.fn.fullpage.moveTo($(this).data('section'));
        }else{
            var anchor = $(this).data('scroll');
            var anchor_link = $(anchor).offset().top;
            $('html, body').stop().animate({
                scrollTop : anchor_link +  "px"
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        }
    });

    $('.sorting-links a').on('click', function () {
        if(!$(this).hasClass('active')){
            $('.sorting-links a').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('.filter-types a').on('click', function () {
        if(!$(this).hasClass('active')){
            $('.filter-types a').removeClass('active');
            $(this).addClass('active');
        }
    });

    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
        if($('.wrapper').hasClass('full-page-wrapper')){
            init_page();
            $('body').addClass('full-page-body');
        }


    }else{
        $('body').removeClass('full-page-body');
    }

    $('.side-nav li a').on('click', function () {
        var parent = $(this).closest('li');
        if(!parent.hasClass('active')){
            $('.side-nav li').removeClass('active');
            parent.addClass('active');
            $.fn.fullpage.moveTo(parent.data('section'));
        }
    });

    $('.next-section-wrap a').on('click', function () {
        $.fn.fullpage.moveSectionDown();
    });

    $('.currency-links a').on('click', function () {
        $('.currency-links a').removeClass('active');
        var _this = $(this);
        $('.currency-links').each(function () {
            $(this).find('a').eq(_this.index()).addClass('active');
        });

    });

    if($('.gallery-slider').length){
        $('.gallery-slider').slick({
            dots: false,
            prevArrow: '.gallery-slider-wrap .slide-left',
            nextArrow: '.gallery-slider-wrap .slide-right',
            infinite: true,
            asNavFor: '.prevs-slider'
        });

        $('.prevs-slider').slick({
            dots: false,
            arrows: false,
            asNavFor: '.gallery-slider',
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: true,
            focusOnSelect: true
        });
    }


    if($('.card-slider').length){
        $('.card-slider').slick({
            dots: false,
            prevArrow: '.card-slider-wrap .slide-left',
            nextArrow: '.card-slider-wrap .slide-right',
            infinite: true
        });
    }
    if($('.checkbox-wrap').length){
        $('.checkbox-wrap input').styler();
    }



    $('.custom-modal-open').fancybox({
        autoSize: true,
        type: 'inline',
        closeBtn: true,
        padding: 0,
        scrolling: 'visible',
        fixed: false,
        autoCenter: false,
        beforeShow: function() {

            $('#order-modal .custom-modal-title').html(this.element.data('title'));
            $('#order-modal [name="from"]').val(this.element.data('from'));
            $('#order-modal button').text(this.element.data('btn'));
            if(this.element.hasClass('dark-type')){
                $('#order-modal').addClass('dark-type');
            }else{
                $('#order-modal').removeClass('dark-type');
            }

            $(".fancybox-skin").css("background-color", "transparent");

        },
        afterShow: function(){
            $('.loader').removeClass('active');
        },
        beforeClose: function(){

        },
        afterClose: function() {

        }
    }).click(function() {
        if (typeof($(this).data('from')) !== 'undefined') {

        }
    });

    $('.modal-close, .close-modal').click(function() {
        $.fancybox.close();
        return false;
    });

    $('.send').on('click', function(){
        $(this).parents('form').submit();
    });

    $('form').submit(function() {
        $(this).isCorrectRequest();
        return false;
    });


    $(".fancybox").fancybox({
        helpers: {
            overlay: {
                locked: false
            }
        },
        openEffect	: 'none',
        closeEffect	: 'none',
        padding: 0
    });

});


$(window).load(function(){
    if($('.main-info-col').length){
        $('.main-info-item').css('height', $('.main-info-col').outerHeight()/2 + 'px');
    }
});


$(window).resize(function(){
    var w_w = $(window).width();
    var w_h = $(window).height();

    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))){
        if($('.wrapper').hasClass('full-page-wrapper')){
            init_page();
            $('body').addClass('full-page-body');
        }
    }else{

        if($('.main-page').length){
            if(window.innerHeight > window.innerWidth){
                $('.main-page .section').css('height', $('.hidden-item').height()/2);
            }else{
                $('.main-page .section').removeAttr('style');
            }
        }

        $('body').removeClass('full-page-body');
        $.fn.fullpage.destroy('all');
        $('.wrapper').removeClass('full-screen fullpage-wrapper fp-destroyed fp-notransition');


    }


});

$(window).scroll(function() {
    /*animate();*/
});

$(document).ready(function() {
    /*animate();*/
});


function init_page(){
    $('.wrapper').fullpage({
        css3: true,
        fixedElements: '.side-nav, .header',
        afterLoad: function(anchorLink, index){
            if(index > 1){
                $('.arrow-up').addClass('active');
            }else{
                $('.arrow-up').removeClass('active');
            }
            $('.side-nav li').removeClass('active');
            $('.side-nav li[data-section="' + index + '"]').addClass('active');


        },
        afterRender: function () {

        },
        onLeave: function(index, nextSlideIndex){
            if(nextSlideIndex === 9){
                $('.side-nav').addClass('white-theme');
            }else{
                $('.side-nav').removeClass('white-theme');
            }

            if(nextSlideIndex === 8){
                $('.side-nav').addClass('hidden-theme');
            }else{
                $('.side-nav').removeClass('hidden-theme');
            }
        }
    });
}

(function($) {
    
    $.fn.isCorrectRequest = function() {
        this.find('input[type=text]').removeClass('correct incorrect shake');

        var nameInput = $(this).find('[name = name]');
        var telephoneInput = $(this).find('[name = phone]');
        var emailInput = $(this).find('[name = email]');

        nameInput.val($.trim(nameInput.val()));
        telephoneInput.val($.trim(telephoneInput.val()));

        if(telephoneInput.val() != undefined){
            if(telephoneInput.val().length === 0)
            {
                telephoneInput.addClass('incorrect');
                telephoneInput.focus();
                return false;
            }
        }

        if(emailInput.val() != undefined){
            if(emailInput.val().length === 0)
            {
                emailInput.addClass('incorrect');
                emailInput.focus();
                return false;
            }
        }

        var form = $(this);
        var formData = new FormData($(this)[0]);
        var url = form.attr('action');
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            async: false,
            success: function(data)
            {
                $('input').removeClass('incorrect');
                $('input[type="text"]').val('');
                window.location.href = 'thanks.html';
            },
            error: function(answer)
            {
                alert('Ошибка отправки данных. Попробуйте еще раз.');
            }
        });
    };
})(jQuery);

