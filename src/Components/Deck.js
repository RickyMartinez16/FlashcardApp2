import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function Deck(){
    const history = useHistory();
    const {deckID} = useParams();
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck(
                    deckID,
                    abortController.signal
                );
                setDeck(deckResponse);
                setCards(deckResponse.cards);
            } catch (error){
                console.log(error)
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckID]);

    async function handleDeleteDeck(deck) {
        if(
            window.confirm(
                "Delete this deck? You will not be able to recover it"
            )
        ) {
            const abortController = new AbortController();
            try{
                history.push("/");
                return await deleteDeck(deck.id, abortController.signal);
            } catch (error) {
                console.log(error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    async function handleDeleteCard(card){
        if(
            window.confirm(
                "Delete this card? You will not be able to recover it"
            )
        ) { 
            const abortController = new AbortController();
            try {
                history.go(0);
                return await deleteCard(card.id, abortController.signal);
            } catch (error) {
                console.log(error)
            }
            return () => {
                abortController.abort();
            };
        }
    }

    function handleEditDeck() {
        history.push(`/decks/${deckID}/edit`);
    }

    function handleAddCard(){
        history.push(`decks/${deckID}/cards/new`);
    }

    function handleStudyClick(){
        history.push(`/decks/${deckID}/study`);
    }

    function handleEditCard(){
        history.push(`decks/${deckID}/cards/${cards.id}/edit`)
    }

    //ui

    if (cards.length > 0) {
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"> 
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </ol>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{deck.name}</h2>
                        <p>{deck.description}</p>
                        <button
                            onClick={() => handleEditDeck()}
                            className="btn btn-secondary mx-1"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleStudyClick()}
                            className="btn btn-primary mx-1"
                        >
                            Study
                        </button>
                        <button
                            onClick={() => handleAddCard()}
                            className="btn btn-primary mx-1"
                        >
                            Add Card(s)
                        </button>
                        <button
                            onClick={() => handleDeleteDeck()}
                            className="btn btn-danger mx-1"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <h1>Cards</h1>
                {cards.map((card) => {
                    return (
                        <div className="card-deck" key={card.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div className="col">{card.back}</div>
                                    </div>
                                    <div className="container row">
                                        <button
                                            onClick={() => handleEditCard(card)}
                                            className="btn btn-secondary mx-1"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCard(card)}
                                            className="btn btn-danger mx-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return null;
    }


}


export default Deck;