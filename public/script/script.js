document.addEventListener("DOMContentLoaded", () => {
    const deck = document.querySelector('.stack-cards')
    // gsap code here!

    let cards = gsap.timeline()

    deck.addEventListener('click', () => {
        cards.to(deck, {
            x: '250px',
            rotateY: -180,
            start: () => (window.innerHeight * 0.25),
            end: () => (window.innerHeight * 0.25)
        })
        console.log(deck.querySelector('.tarot-card'))
        const thisCard = deck.querySelector('.tarot-card')
        thisCard.src= '/images/back-of-card.svg'
    })
});
