let options = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilCont = document.querySelector(".pencil-tool-cont");
let eraserCont = document.querySelector(".eraser-tool-cont");
let stickyCont = document.querySelector(".fa-note-sticky");
let stickyColor = document.querySelector(".sticky-cont");
let upload = document.querySelector(".fa-arrow-up-from-bracket");
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilFlag = false;
let eraserFlag = false;
let optionsFlag = true;
let stickyFlag = false;

//converting hamburger to close, close to hamburger
options.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag; // True-> False, False-> True
    if (optionsFlag) {
        openTools();
    }
    else {
        closeTools();
    }
})

function openTools() {
    let iconELem = options.children[0];
    iconELem.classList.remove("fa-xmark");
    iconELem.classList.add("fa-bars-staggered");
    toolsCont.style.display = "flex";
}
function closeTools() {
    let iconELem = options.children[0];
    iconELem.classList.remove("fa-bars-staggered");
    iconELem.classList.add("fa-xmark");
    toolsCont.style.display = "none";
    pencilCont.style.display = "none";
    eraserCont.style.display = "none";

}

//pencil toggle
pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;
    if (pencilFlag) {
        pencilCont.style.display = "flex";
    }
    else {
        pencilCont.style.display = "none";
    }
})
eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) {
        eraserCont.style.display = "flex";
    }
    else {
        eraserCont.style.display = "none";
    }
})

//upload function
upload.addEventListener("click", (e) => {
    //open file explorer from system
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0]; // will take 1 file that we have chosen
        let url = URL.createObjectURL(file);

        let stickyTempHTML=`
        <div class="header-cont">
            <div class="minimize">
                <!--<i class="fas fa-window-minimize"></i>-->
            </div>
            <div class="remove">
                <!--<i class="fa-solid fa-xmark"></i>-->
            </div>
            <div class="line"></div>
        </div>
        <div class="note-cont">
            <textarea></textarea>
        </div>
        `;
        createSticky(stickyTempHTML);
    })
})

//sticky-notes function
stickyCont.addEventListener("click", (e) => {
    let stickyTemplateHTML= `
    <div class="header-cont">
        <div class="minimize">
            <!--<i class="fas fa-window-minimize"></i>-->
        </div>
        <div class="remove">
            <!--<i class="fa-solid fa-xmark"></i>-->
        </div>
        <div class="line"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;
    createSticky(stickyTemplateHTML);
})

function createSticky(stickyTempHTML){
    let sticky = document.createElement("div");
    sticky.setAttribute("class", "sticky-cont");
    sticky.innerHTML = stickyTempHTML;
    document.body.appendChild(sticky);

    let minimize = sticky.querySelector(".minimize");
    let remove = sticky.querySelector(".remove");
    noteFunc(minimize, remove, sticky);

    sticky.onmousedown = function (event) {
        dragndrop(sticky, event);
    };

    sticky.ondragstart = function () {
        return false;
    };

}

function noteFunc(min, rem, stickyElem) {
    rem.addEventListener("click", (e) => {
        stickyElem.remove();
    })
    min.addEventListener("click", (e) => {
        let noteCont = stickyElem.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === 'none') {
            noteCont.style.display = "block";
        }
        else {
            noteCont.style.display = "none";
        }
    })
}

function dragndrop(elem, event) {
    let shiftX = event.clientX - elem.getBoundingClientRect().left;
    let shiftY = event.clientY - elem.getBoundingClientRect().top;

    elem.style.position = 'absolute';
    elem.style.zIndex = 1000;
    //can be removed

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        elem.style.left = pageX - shiftX + 'px';
        elem.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    elem.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        elem.onmouseup = null;
    };
}
