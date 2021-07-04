var ctx = document.getElementById('canvas').getContext('2d');
// var ctx = canvas.getContext('2d');


// let onValue = false;



window.addEventListener('resize',resize);
resize();
let mousePos = {
    x:0,
    y:0
}
window.addEventListener('mousemove', draw);
window.addEventListener('mousedown', mousePosition);
window.addEventListener('mouseenter', mousePosition);
function mousePosition(e){
    mousePos.x = e.clientX - canvas.offsetLeft;
    mousePos.y = e.clientY - canvas.offsetTop;
}
function resize(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

}
function draw(e){
    if(e.buttons !== 1){
        return;
    }
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#111'

    var pen_width = document.getElementById('pen-width');
    ctx.lineWidth = pen_width.value;

    ctx.moveTo(mousePos.x, mousePos.y);
    mousePosition(e);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}

function onWidthElement(e){
    var displayWidthBar = document.getElementById('pen-width');
    displayWidthBar.style.display='block';
    // setTimeout(() => {
    //     displayWidthBar.style.display='none'; //tried to remove the bar after 5 sec but was not looking good
    // }, 5000);
}
function removedfromWidth(e){
    var displayWidthBar = document.getElementById('pen-width');
    displayWidthBar.style.display='none';
}