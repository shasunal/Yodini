document.addEventListener("DOMContentLoaded", () => {
    // declare variables
    const stackDeck = document.querySelector('.stack-cards')
    const deck = document.querySelectorAll('.tarot-card')
    const ticket = document.querySelector('.cont-card')

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
    // const stackCard = document.querySelector(".stack-card");
    const line1 = document.querySelector(".line-1");
    const line2 = document.querySelector(".line-2");
    const line3 = document.querySelector(".line-3");


    // GSAP configuration
    let cards = gsap.timeline()
    let ticketCont = gsap.timeline()

    ticketCont.set(ticket, {
        x: '600px',
    })

    deck.forEach((tarot, index) => { // adds flip animation to all tarot cards
        if(tarot.parentElement != document.querySelector('.stack-cards')){ //ignores stack of cards
            
            // MOVE TO CSS IF POSSIBLE
            stackDeck.style.zIndex = '-100' // NOTICE: THIS MADE STACK OF CARDS DISAPPEAR -touch base later
            tarot.style.zIndex = `-${index}0` // move actual tarot cards to top of stack pile
            tarot.style.cursor = 'pointer'


            cards.set(tarot, { // flip animation: ISSUE:: is pretty hardcoded translation & doesn't exactly align with the card-stack 
                x: `-${(500+(200*(index-1)))}px`
                ,rotation: Math.floor(Math.random() * 10) %2 == 0 ? Math.floor(Math.random() * 7) : -Math.floor(Math.random() * 7)
            })
            tarot.addEventListener('click', () => { 
                cards.to(tarot, {
                    x: `0px`,
                    rotateY: -180
                })
                tarot.src= '/images/back-of-card.svg'
                if(index==0 && line1){
                    typeWriter(line1, "Your first card describes your current state.");
                }else if(index==1 && line2){
                    typeWriter(line2,"Your second card describes the actions you must take.");
                }else if(index==2 && line3){
                    typeWriter(line3,"Your third card describes what the future holds for you.");
                    ticketCont.to(ticket, { // animate continue ticket
                        delay: .6, 
                        x: '0px'
                    })
                }
            })
        }
    });

});
