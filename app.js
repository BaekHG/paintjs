const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;



function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y)
    if(!painting){
        // console.log(ctx.moveTo(x,y));
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
        // ctx.closePath();
    }
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    // if(painting_mode === "fill"){
    //     ctx.fillStyle = color;
    // }
}

function handleRangeChange(event){
    // console.log(event.target.value);
    const line_size = event.target.value;
    ctx.lineWidth = line_size;
}

// 1.버튼모양 바뀌고
// 2. 색 클릭 시 변경


function handleModeClick(event){
    
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    }else{
        filling = true;
        mode.innerText = "paint"
        
    }
}

function handleCanvasClick(event){
    if(filling === true)
        ctx.fillRect(0,0,canvas.width,canvas.height);
}




if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));
}

if(range){
    range.addEventListener("input",handleRangeChange)
}