
import React, { useEffect, useState } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { 'src': './img/1.png', matched: false },
  { 'src': './img/2.png', matched: false },
  { 'src': './img/3.png', matched: false },
  { 'src': './img/4.png', matched: false },
  { 'src': './img/5.png', matched: false },
  { 'src': './img/6.png', matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTow, setChoiceTow] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTow(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTow(card) : setChoiceOne(card)
  }
  useEffect(() => {

    if (choiceOne && choiceTow) {
      setDisabled(true)
      if (choiceOne.src === choiceTow.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            }
            else {
              return card;
            }
          })
        })
        resetTurn();
      }
      else {

        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTow])

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTow(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard handleChoice={handleChoice} key={card.id} card={card}
            flipped={card === choiceOne || card === choiceTow || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  )
}

export default App