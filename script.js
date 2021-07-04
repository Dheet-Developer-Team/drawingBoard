var ctx = document.getElementById('canvas').getContext('2d');
// var ctx = canvas.getContext('2d');
let is_drawing = false;
let pen_button = document.querySelector('#pen');

let restore_array = [];
let index = -1;
let clr = 'black';

function pen() {
    if (is_drawing) {
        is_drawing = false;
        canvas.style.cursor = "auto";
    }
    else {
        is_drawing = true;
        canvas.style.cursor = "crosshair";
    }
    console.log(is_drawing);
}

function textbox() {
    let ip = document.createElement('input');

}

function save() {
    let b = domtoimage.toBlob(document.getElementById('canvas'));
    console.log(b);
    b.then(function (blob) {
        window.saveAs(blob, 'picture.png');
    })
}
// $(document).ready(function(){
//     $("#save").click(function(){
//         console.log('just checking');
//         domtoimage.toBlob(document.getElementById('container'))
//     .then(function(blob){
//             window.saveAs(blob,'picture.png');
//         });
//     })
// })


// let onValue = false;



window.addEventListener('resize', resize);
resize();
let mousePos = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', draw);
window.addEventListener('mousedown', mousePosition);
window.addEventListener('mouseenter', mousePosition);
canvas.addEventListener('mouseup', stop);
function mousePosition(e) {
    mousePos.x = e.clientX - canvas.offsetLeft;
    mousePos.y = e.clientY - canvas.offsetTop;
}
function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    restore_array = [];
    index = -1;
}

function stop(event) {
    if (is_drawing) {
        ctx.stroke();
        ctx.closePath();
    }

    restore_array.push(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
    index += 1;

    console.log(restore_array);
}

function undo() {
    if (index <= 0)
        resize();
    else {
        index -= 1;
        ctx.putImageData(restore_array[index], 0, 0);
    }
}

function redo() {
    if (index != restore_array.length - 1)
        index++;
    ctx.putImageData(restore_array[index], 0, 0);
    console.log(index);
}
//color
function chengeColor(element) {
    // console.log(el);
    clr = element.style.backgroundColor;
    console.log(element);
}
function draw(e) {
    if (e.buttons !== 1 || !is_drawing) {
        return;
    }
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = clr;

    var pen_width = document.getElementById('pen-width');
    ctx.lineWidth = pen_width.value;

    ctx.moveTo(mousePos.x, mousePos.y);
    mousePosition(e);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}

function onWidthElement(e) {
    var displayWidthBar = document.getElementById('pen-width');
    displayWidthBar.style.display = 'block';
    // setTimeout(() => {
    //     displayWidthBar.style.display='none'; //tried to remove the bar after 5 sec but was not looking good
    // }, 5000);
}
function removedfromWidth(e) {
    var displayWidthBar = document.getElementById('pen-width');
    displayWidthBar.style.display = 'none';
}