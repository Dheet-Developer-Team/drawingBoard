var ctx = document.getElementById('canvas').getContext('2d');
// var ctx = canvas.getContext('2d');
let is_drawing = false;
let pen_button = document.querySelector('#pen');

let restore_array = [];
let index = -1;
let clr = 'black';

function pen() {
    is_erasing = false;
    if (is_drawing) {
        is_drawing = false;
        canvas.style.cursor = "auto";
    }
    else {
        is_drawing = true;
        canvas.style.cursor = "crosshair";
    }
    // console.log(is_drawing);
}

function textbox() {
    let ip = document.createElement('input');

}

function save() {
    let b = domtoimage.toBlob(document.getElementById('canvas'));
    // console.log(b);
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
    ctx.canvas.width = window.innerWidth-10;
    ctx.canvas.height = window.innerHeight-98;

    restore_array = [];
    index = -1;
}

function stop(event) {
    if (is_drawing) {
        ctx.stroke();
        ctx.closePath();
    }

    restore_array.push(ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height));
        index++;
    
    // console.log(index);
}

function undo(){
    if(index <= 0){
        let temp = restore_array;
        resize();
        restore_array = temp;
    }
    else{
        index -= 1;
        ctx.putImageData(restore_array[index], 0, 0);
    }
    // console.log(index);

}

function redo(){
    if(index < 0 || index != restore_array.length-1)
        index++;
    // console.log(restore_array);
    
    ctx.putImageData(restore_array[index],0,0);
    // console.log(index);
}

function chengeColor(element) {
    // console.log(el);
    clr = element.style.backgroundColor;
    // console.log(element);
}
let is_erasing = false;
function modify(){
    is_drawing = false;
    if(is_erasing){
        is_erasing = false;
        canvas.style.cursor = "auto";
    }
    else{
        is_erasing = true;
        canvas.style.cursor = "url(./images/e.png),auto"
    }

}

function draw(e){
    // console.log(e.buttons);
    if((e.buttons !== 1 || !is_drawing) && (!is_erasing || e.buttons !==1)){
        // console.log(is_erasing);
        return;
    }
    ctx.beginPath();
    ctx.lineCap = 'round';
    // ctx.strokeStyle = clr;

    var pen_width = document.getElementById('pen-width');
    ctx.lineWidth = pen_width.value;

    if(is_drawing)
        ctx.strokeStyle = clr;
    else
        ctx.strokeStyle = document.getElementById('canvas').style.backgroundColor ? document.getElementById('canvas').style.backgroundColor : '#fff';


    // if(is_drawing){
        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
        mousePosition(e);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
     
    // }
    // else{
    //         // console.log('inside');
    //         // ctx.lineWidth = 50;
    //         ctx.strokeStyle = document.getElementById('canvas').style.backgroundColor ? document.getElementById('canvas').style.backgroundColor : '#fff';
    //         // console.log(ctx.strokeStyle);        
    
    //         // ctx.globalCompositeOperation="source-over";
            
    //         ctx.beginPath();
    //         ctx.moveTo(mousePos.x, mousePos.y);
    //         mousePosition(e);
    //         ctx.lineTo(mousePos.x, mousePos.y);
    //         ctx.stroke();
    
    // };

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