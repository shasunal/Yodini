//typewriter script 

window.onload = function () {
    //element:html where text will appear
    //text: the text that shows up
    //speed
  function typeWriter(element, text, speed = 70) {
    //tracks character of the text when typing
    console.log("Start typewriter on:", element);
    //tracks what character is being typed
    let index = 0;
    //starts empty
    element.innerHTML = "";

    function type() {
      //if there are still characters left continue
      if (index < text.length) {
        //if there is a \n then it is a line break
        if (text[index] === "\n") {
          element.innerHTML += "<br>";
        } else {
          //adds letter to the element typing effect
          element.innerHTML += text[index];
        }
        //move to next character
        index++;
        //speed
        setTimeout(type, speed);
      }
    }

    type();
  }
  //index page text
  const intro = document.getElementById("typeOut");

  //if that element exists then the text is typed
  if (intro) {
    typeWriter(intro, "I am the GREAT YODINI,\nand I have been expecting you~");
  }
  //tarot cards page2 get all elements
  const stackCard = document.querySelector(".stack-card");
  const line1 = document.querySelector(".line-1");
  const line2 = document.querySelector(".line-2");
  const line3 = document.querySelector(".line-3");

  //keep track of click count
  let clickCount = 0;

  if (stackCard) {
    //event listener for click on stackcard
    stackCard.addEventListener("click", () => {
      console.log("clicked number:", clickCount);

      if (clickCount === 0 && line1) {
        typeWriter(line1, "Your first card describes your current state.");
      }

      if (clickCount === 1 && line2) {
        typeWriter(
          line2,
          "Your second card describes the actions you must take.",
        );
      }

      if (clickCount === 2 && line3) {
        typeWriter(
          line3,
          "Your third card describes what the future holds for you.",
        );
      }
//increment click count
      clickCount++;
    });
  }
};
