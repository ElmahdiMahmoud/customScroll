function setSlider($scrollpane) { 
    var handleImage = false;
    $scrollpane.css('overflow', 'hidden');
    if ($scrollpane.find('.scroll-content').length == 0) $scrollpane.children().wrapAll('<\div class="scroll-content"> /');
    var difference = $scrollpane.find('.scroll-content').height() - $scrollpane.height();
    $scrollpane.data('difference', difference);
    if (difference <= 0 && $scrollpane.find('.slider-wrap').length > 0) 
    {
        $scrollpane.find('.slider-wrap').remove(); 
        $scrollpane.find('.scroll-content').css({
            top: 0
        }); 
    }
    if (difference > 0) 
    {
        var proportion = difference / $scrollpane.find('.scroll-content').height(); 
        var handleHeight = Math.round((1 - proportion) * $scrollpane.height()); 
        handleHeight -= handleHeight % 2;
        var contentposition = $scrollpane.find('.scroll-content').position();
        var sliderInitial = 100 * (1 - Math.abs(contentposition.top) / difference);
        if ($scrollpane.find('.slider-wrap').length == 0) 
        {
            $scrollpane.append('<\div class="slider-wrap"><\div class="slider-vertical"><\/div><\/div>'); 
            sliderInitial = 100;
        }
        $scrollpane.find('.slider-wrap').height($scrollpane.height()); 
        $scrollpane.find('.slider-vertical').slider({
            orientation: 'vertical',
            min: 0,
            max: 100,
            range: 'min',
            value: sliderInitial,
            slide: function (event, ui) {
                var topValue = -((100 - ui.value) * difference / 100);
                $scrollpane.find('.scroll-content').css({
                    top: topValue
                }); 
                $('ui-slider-range').height(ui.value + '%');
            },
            change: function (event, ui) {
                var topValue = -((100 - ui.value) * ($scrollpane.find('.scroll-content').height() - $scrollpane.height()) / 100); 
                $scrollpane.find('.scroll-content').css({
                    top: topValue
                }); 
                $('ui-slider-range').height(ui.value + '%');
            }
        });
        $scrollpane.find(".ui-slider-handle").css({
            height: handleHeight,
            'margin-bottom': -0.5 * handleHeight
        });
        var origSliderHeight = $scrollpane.height(); /
        var sliderHeight = origSliderHeight - handleHeight; 
        var sliderMargin = (origSliderHeight - sliderHeight) * 0.5; 
        $scrollpane.find(".ui-slider").css({
            height: sliderHeight,
            'margin-top': sliderMargin
        }); 
        $scrollpane.find(".ui-slider-range").css({
            bottom: -sliderMargin
        }); 
        if (handleImage) {
            $(".ui-slider-handle").append('<img class="scrollbar-top" src="/images/misc/scrollbar-handle-top.png"/>');
            $(".ui-slider-handle").append('<img class="scrollbar-bottom" src="/images/misc/scrollbar-handle-bottom.png"/>');
            $(".ui-slider-handle").append('<img class="scrollbar-grip" src="/images/misc/scrollbar-handle-grip.png"/>');
        }
    } 
    $(".ui-slider").click(function (event) {
        event.stopPropagation();
    });
    $(".slider-wrap").click(function (event) { 
        var offsetTop = $(this).offset().top; 
        var clickValue = (event.pageY - offsetTop) * 100 / $(this).height(); 
        $(this).find(".slider-vertical").slider("value", 100 - clickValue); 
    });
    if ($.fn.mousewheel) {
        $scrollpane.unmousewheel(); 
        $scrollpane.mousewheel(function (event, delta) {
            var speed = Math.round(5000 / $scrollpane.data('difference'));
            if (speed < 1) speed = 1;
            if (speed > 100) speed = 100;
            var sliderVal = $(this).find(".slider-vertical").slider("value"); 
            sliderVal += (delta * speed); 
            $(this).find(".slider-vertical").slider("value", sliderVal);
            event.preventDefault();
        });
    }
}
$('.scroll-pane').each(function(){
	setSlider($(this));
});