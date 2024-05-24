import { useState, useEffect } from 'react'
import axios from "axios";
import "./JokeList.css";
import Joke2 from './Joke2'



function JokeList2 ({numJokesToGet}) {
    const [jokes, setJokes ] = useState([]);
    const [isLoading, setIsLoading] =useState(true);
   


    const [ deck, setDeck ] = useState(null);
    const [showCardBack, setShowCardBack] = useState(true)
    const [remainingCards, setRemainingCards] = useState(null)
    const [ cards, setCards ] = useState([]);
    const [ deckId, setDeckId ] = useState(null);
    const [ canShuffle , setCanShuffle ] = useState(true);

    useEffect(function fetchDeckFromAPI(){
        getJokes();
    }, []);
    
    const addCard = card => {
        let newCard = { id: card.code, image: card.image };
        setCards(cards => [...cards, newCard])
    }

    async function getJokes(){
            try{
                // load jokes one at a time, adding not-yet-seen jokes
            let jokes = [];
            let seenJokes = new Set();

            while (jokes.length < numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                headers: { Accept: "application/json" }
                });
                let { ...joke } = res.data;

                if (!seenJokes.has(joke.id)) {
                seenJokes.add(joke.id);
                jokes.push({ ...joke, votes: 0 });
                } else {
                console.log("duplicate found!");
                }
            }
                setJokes(jokes);
                setIsLoading(false);
            
            }
            catch(err){
                console.error(err);
                
            } 
        }

        function generateNewJokes(){
            setIsLoading(true);
            getJokes();
        }

    const vote = (id, delta) => {
        let updatedJokeVotes = jokes.map(joke =>{

            return (joke.id === id ? {...joke, votes: joke.votes + delta} : joke)
        })
        setJokes(updatedJokeVotes);
        }
    
     
    const renderJokes = () => {
        let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
        if (isLoading) {
        return (
            <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
            </div>
        )
        }

        return (
        <div className="JokeList">
            <button
            className="JokeList-getmore"
            onClick={generateNewJokes}
            >
            Get New Jokes
            </button>

            {sortedJokes.map(j => (
            <Joke2
                text={j.joke}
                key={j.id}
                id={j.id}
                votes={j.votes}
                vote={vote}
            />
            ))}
        </div>
        );
    }

    return (
        <>
            
            {renderJokes()}
            
        </>
    )
}

export default JokeList2;