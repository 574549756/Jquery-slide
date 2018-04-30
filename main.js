let n = 1
let index = $('.current').index()
reset()

//计时器
function setTimer(){
    return setInterval(()=>{
        makeLeave(getImage(n))
        .one('transitionend', (e)=>{
            makeEnter($(e.currentTarget))
        })
        makeCurrent(getImage(n+1))
        activeButton(getButton(n))
        n += 1
    },3000)
}


//点击事件
$('.left').on('click', function(){
    var index = $('.current').index()
    pressEventP1(index)
    if(index === 0){
        index = size
    }
    pressEventP2(index)
})
$('.right').on('click', function(){
    var index = $('.current').index()    
    pressEventP1(index)
    pressEventP2(index+2)
})


//hover停滞事件
$('.windowInside,#buttons,.arrow').on('mouseenter', function(){
    window.clearInterval(timerId)
})
$('.windowInside,#buttons,.arrow').on('mouseleave', function(){
    timerId = setTimer()
})












/////////////////////////下面都是工具///////////////////////////
var allButtons = $('#buttons > div')

var size = $('#images > img').length

function createButton(){
    for(let i=0;i<size;i++){
        $('#buttons').append('<div class="normal"></div>');
    }
}

var timerId = setTimer()

function x(n){
    if(n>size){
        n = n%size
        if (n===0){
            n=size
        }
    }
    return n
}
function getImage(n){
    return $(`.images > img:nth-child(${x(n)})`)
}
function getButton(n){
    return $(`#buttons > div:nth-child(${x(n)})`)
}
function activeButton($button){
    return $button
   .addClass('black').siblings('.black').removeClass('black')
}

function reset(){
    n = 1
    $(`.images > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}
function makeCurrent($node){
    return $node.removeClass('enter leave').addClass('current')
}
function makeLeave($node){
    return $node.removeClass('enter current').addClass('leave')
}
function makeEnter($node){
    return $node.removeClass('leave current').addClass('enter')
}
function delateCurrent(n){
    return $(`.images > img:nth-child(${x(n)})`).siblings().removeClass('current')
}
function pressEventP1(index){
    makeLeave(getImage(index+1))
    .one('transitionend', (e)=>{
        makeEnter($(e.currentTarget))
    })
}
function pressEventP2(index){
    delateCurrent(index)    
    makeCurrent(getImage(index))
    activeButton(getButton(index))
}