const canvas = document.querySelector("#jsCanvas"),
      ctx = canvas.getContext("2d"),
      colors = document.querySelectorAll(".jsColor"),
      control = document.querySelector(".controls"),
      colorBox = document.querySelector("#jaColors"),
      range = document.querySelector("#jsRange"),
      mode = document.querySelector("#jsMode"),
      INITIAL_COLOR = "#2c2c2c",
      CANVAS_SIZE = 700,
      saveBtn = document.querySelector("#jsSave"),
      selectColor = document.querySelector("#jsColorSelect"),
      SaveColor = document.querySelector("#jsSaveColor"),
      canvasClear = document.querySelector("#jsClear"),
      sizeForm = document.querySelector("#jsSize"),
      Dot = document.querySelector("#jsDot"),
      DotPoint = document.querySelector(".DotPoint");


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

      ctx.strokeStyle = INITIAL_COLOR;
      ctx.fillStyle = INITIAL_COLOR;
      ctx.lineWidth = 2.5;

let painting = false;
let filling = false,
    doting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting)   {
        ctx.beginPath();
        ctx.moveTo(x,y)
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function handleDotMove()    {
    if(doting === false)    {
    handleCanvasClear();
    stopPainting();
    painting = false;
    filling = false;
    doting = true;

    let dotPoint = document.createElement("div");
        

    DotPoint.appendChild(dotPoint);

    dotPoint.id = "dotPointer";
    dotPoint.style.border = `1px solid ${ctx.strokeStyle}`;
    dotPoint.style.position = `relative`;
    dotPoint.style.boxSizing = `border-box`;

    dotBoxMove(dotPoint);

    function dotBoxMove(dotBox) {
        canvas.addEventListener("mousemove", function(event) {
            let dotSize = range.value;
            painting = false;
            filling = false;
            const x = event.offsetX;
            const y = event.offsetY;

            dotPoint.style.width = `${dotSize*5}px`;
            dotPoint.style.height = `${dotSize*5}px`;
            dotBox.style.top = `${y-dotSize*2}px`;
            dotBox.style.left = `${x-dotSize*2.5}px`;


            canvas.addEventListener("mousedown", function(event) {
                let dotSize = range.value;

                const x = event.offsetX;
                const y = event.offsetY;
                
                ctx.fillRect(x-dotSize*2.5, y-dotSize*2, dotSize*5, dotSize*5);
            })
        });
    };

    canvas.addEventListener("mouseup", function() {
    })
    }else   {
        filling = true;
    }
}



function handleRangeChange(event)   {
    const sizeStorke = event.target.value;
    ctx.lineWidth = sizeStorke;
}

function handleModeClick(event) {
    if(doting === true) {
        doting = false;
        painting = true;
        canvas.addEventListener("mousemove", onMouseMove);
        init();
    }
    if(filling === true)    {
        filling = false;
        mode.innerText = "Fill";
    } else  {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick()   {
    if(filling) {
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleSaveClick()  {
    const image = canvas.toDataURL(),
    link = document.createElement("a");

    link.href = image;
    link.download = "paintJs";

    link.click();
}

function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleChngeColor(event) {
    const selectValue = selectColor.value;

    ctx.strokeStyle = selectValue;
    ctx.fillStyle = selectValue;
}

function handleSaveColor()  {

    const saveColor = document.createElement("div"),
          saveColorBox = document.createElement("div"),
          loadColor = saveColor.style.backgroundColor = selectColor.value;

    saveColorBox.className = "selectColorBox";
    saveColor.className = "controls_color jsColor";

    const selectBox = document.querySelector(".selectColorBox");

    if(selectBox)  {
        loadColor;
        selectBox.appendChild(saveColor);
        saveColor.addEventListener("click", handleColor);
    } else  {
        loadColor;
        control.appendChild(saveColorBox);
        saveColorBox.innerText = "#seveColor";
        saveColorBox.appendChild(saveColor);
        saveColor.addEventListener("click", handleColor);
        console.log("없음");
    }
}

function handleCanvasClear()    {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function handleCanvasSize(event) {
    const changeCanvasSizeWidth = sizeForm[0].value,
          changeCanvasSizeHeight = sizeForm[1].value;

    event.preventDefault();
    console.log(sizeForm[0].value,sizeForm[1].value);
    

    canvas.style.width = `${changeCanvasSizeWidth}px`;
    canvas.style.height = `${changeCanvasSizeHeight}px`;
    DotPoint.style.width = `${changeCanvasSizeWidth}px`;
    DotPoint.style.height = `${changeCanvasSizeHeight}px`;
    canvas.width = changeCanvasSizeWidth;
    canvas.height = changeCanvasSizeHeight;

    sizeForm[0].value = "";
    sizeForm[1].value = "";
}

function init() {
    if(canvas)  {
        if(doting === false)    {
            canvas.addEventListener("mousemove", onMouseMove);
        }
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
    };
    
    Array.from(colors).forEach(colors => 
         colors.addEventListener("click", handleColor)
    );
    
    if(range)   {
        range.addEventListener("input", handleRangeChange);
    };
    
    if(mode)    {
        mode.addEventListener("click", handleModeClick);
    }
    
    if(saveBtn) {
        saveBtn.addEventListener("click", handleSaveClick);
    }
    
    if(selectColor)    {
        selectColor.addEventListener("input", handleChngeColor);
    }
    
    if(SaveColor)    {
        SaveColor.addEventListener("click", handleSaveColor);
    }
    
    if(canvasClear) {
        canvasClear.addEventListener("click", handleCanvasClear);
    }
    
    if(sizeForm)    {
        sizeForm.addEventListener("submit", handleCanvasSize);
    }
    
    if(Dot) {
        Dot.addEventListener("click",handleDotMove);
    }
}
init()
