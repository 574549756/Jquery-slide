let $slides = $('#slides')
let $imges = $slides.children('img')
let current = 0
let $buttons = $('#buttons > #normal')


makeFakeSlides()

$slides.css({transform: 'translateX(-640px)'})
bindEvents()
$(right).on('click', function(){
    gotoSlide(current + 1)
})
$(left).on('click', function(){
    gotoSlide(current - 1)
})

function bindEvents(){
    $('#buttons').on('click', '#normal', function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        activeButton($button)
        gotoSlide(index)
    })
}


let timer = setInterval(function(){
    gotoSlide(current + 1)
},2000)
$('.windowInside, #buttons, .arrow').on('mouseenter', function(){
    window.clearInterval(timer)
}).on('mouseleave', function(){
    timer = setInterval(function(){
        gotoSlide(current + 1)
    }, 2000)
})

function gotoSlide(index){
    if(index > $buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length - 1
    }
    console.log('index','current')
    console.log(index, current)
    if(current === $buttons.length-1 && index === 0){
        //最后一张到第一张
        $slides.css({transform:`translateX(${-($buttons.length+1) * 640}px)`})
        .one('transitionend', function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${-(index+1)*640}px)`}).show()
        })
    }else if(current === 0 && index === $buttons.length -1){
        //第一张到最后一张
        $slides.css({transform:`translateX(0px)`})
        .one('transitionend', function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${-(index+1)*640}px)`}).show()
        })
    }else{
        $slides.css({transform: `translateX(${-(index+1) * 640}px)`})
    }
    current = index
    activeButton($('#buttons').children('#normal').eq(index))
}


function activeButton($button){
    $button.addClass('black').siblings('.black').removeClass('black')
}


function makeFakeSlides(){
    let $fakeFirst = $imges.eq(0).clone(true)
    let $fakeLast = $imges.eq($imges.length-1).clone(true)
    $slides.append($fakeFirst)
    $slides.prepend($fakeLast)
}