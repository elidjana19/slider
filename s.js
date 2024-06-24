const slider = document.querySelector(".slider"),
firstImg = slider.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".container i");
let isDragStart = false
let isDragging = false
let prevPageX, prevScrollLeft, positionDiff;

const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');




// Upload images dymanically
fileInput.addEventListener("change", (e)=>{

    //e.target => input type file
    //e.target.files => all the files
    const files = e.target.files


    for(let file of files){
        const reader= new FileReader()
        reader.readAsDataURL(file)   //read the file as url

        reader.onload=(e)=>{
            const res= e.target.result  //retrieve the url
            console.log(res)

            const img= document.createElement("img")
            img.src=res
            img.alt= file.name

            slider.appendChild(img)
        }
    }
})

uploadButton.addEventListener("click", ()=>{
    fileInput.click()
    
})




// Slider functionality

const showHideIcons = () => {
    let scrollWidth = slider.scrollWidth - slider.clientWidth; 
    console.log(slider.clientWidth)
    
    arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = slider.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 15; 

        if(icon.id=== "left"){
            slider.scrollLeft+= -firstImgWidth
        }else {
            slider.scrollLeft+= firstImgWidth
        }

        setTimeout(() => showHideIcons(), 60); 
    });
});


const dragStart = (e) => {
   
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;

    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    slider.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
   
}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

slider.addEventListener("mouseup", dragStop);
slider.addEventListener("touchend", dragStop);
