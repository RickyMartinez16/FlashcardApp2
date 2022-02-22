import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import { Link } from "react-router-dom";
import ListOfDecks from "./Decks/ListOfDecks";


function Home(){
    const [decks, setDecks] = useState([]);
    useEffect(() =>{
        const abortController = new AbortController();
        async function getDecks(){
            try{
                const getDecksFromAPI = await listDecks(abortController.signal);
                setDecks(getDecksFromAPI)
            } catch (error){
                console.log(error)
            }
        }
        getDecks();
        return () => abortController.abort();
    }, [])

    //ui

    return (
        <div>
          <div className="row">
            <Link to="/decks/new" className="btn btn-secondary">
             Create Deck
            </Link>
          </div>
          <div className="row">
            {decks.map((deck) => (
              <ListOfDecks 
                key={deck.id} 
                deck={deck} 
              />
            ))}
          </div>  
        </div>  
      )
}

export default Home;