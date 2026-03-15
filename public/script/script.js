document.addEventListener("DOMContentLoaded", () => {
    const deck = document.querySelectorAll('.tarot-card')
    // gsap code here!

    let cards = gsap.timeline()

    deck.forEach((tarot, index) => { // adds flip animation to all tarot cards
        if(tarot.parentElement != document.querySelector('.stack-cards')){ //ignores stack of cards
            console.log(index, (tarot.x-500)-100)
            cards.set(tarot, {
                x: `-${(tarot.x-500)-100}px`

            })
            tarot.addEventListener('click', () => { 
                cards.to(tarot, {
                    x: `0px`,
                    rotateY: -180,
                    start: () => (window.innerHeight * 0.25),
                    end: () => (window.innerHeight * 0.25)
                })
                tarot.src= '/images/back-of-card.svg'
            })
        }
        
    });
    // deck.addEventListener('click', () => {

        
    // })
});
