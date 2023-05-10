  const serviceItems = document.querySelector(".reel");
  const popup = document.querySelector(".popup-box")
  const popupCloseBtn = popup.querySelector(".popup-close-btn");
  const popupCloseIcon = popup.querySelector(".popup-close-icon");

  serviceItems.addEventListener("click",function(event){
    if(event.target.tagName.toLowerCase() == "button"){
       var item =event.target.parentElement;
       var h3 = item.querySelector("h3").innerHTML;
       var readMoreCont = item.querySelector(".read-more-cont").innerHTML;
       popup.querySelector("h3").innerHTML = h3;
       popup.querySelector(".popup-body").innerHTML = readMoreCont;
       popupBox();
    }

  })

  popupCloseBtn.addEventListener("click", popupBox);
  popupCloseIcon.addEventListener("click", popupBox);

  popup.addEventListener("click", function(event){
     if(event.target == popup){
        popupBox();
     }
  })

  function popupBox(){
    popup.classList.toggle("open");
  }

