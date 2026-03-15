document.addEventListener("DOMContentLoaded", () => {
  function typeWriter(element, text, speed = 70) {
    let index = 0;
    element.innerHTML = "";

    function type() {
      if (index < text.length) {
        if (text[index] === "\n") {
          element.innerHTML += "<br>";
        } else {
          element.innerHTML += text[index];
        }

        index++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  const intro = document.getElementById("typeOut");

  if (intro) {
    typeWriter(intro, "I am the GREAT YODINI,\nand I have been expecting you~");
  }

  const stackCard = document.querySelector(".stack-card");
  const line1 = document.querySelector(".line-1");
  const line2 = document.querySelector(".line-2");
  const line3 = document.querySelector(".line-3");

  let clickCount = 0;

  if (stackCard) {
    stackCard.addEventListener("click", () => {
      console.log("clicked");

      if (clickCount === 0 && line1) {
        typeWriter(line1, "Your first card describes your current state.");
      }

      if (clickCount === 1 && line2) {
        typeWriter(line2, "Your second card describes the actions you must take.");
      }

      if (clickCount === 2 && line3) {
        typeWriter(line3, "Your third card describes what the future holds for you.");
      }

      clickCount++;
    });
  }
});