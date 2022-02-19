
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

function AddCard(){
    const history = useHistory();
    const {deckID} = useParams();
    const initialState = {
        front:"",
        back: ""
    };

    const [newCard, setNewCard] = useState(initialState);
    const [deck, setNewDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckID, abortController.signal);
                setNewDeck(response);
            } catch (error){
                console.log(error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(
            deckID,
            {...newCard},
            abortController.signal
        );
        history.go(0);
        setNewCard(initialState);
        return response;

        function handleSubmit({target}) {
            setNewCard({
                ...newCard,
                [target.name]: target.value
            });
        }        
    }
    
    function handleDone(){
        history.push(`/decks/${deckID}`);
    }

    function handleChange({ target }) {
        setNewCard({
            ...newCard,
            [target.name]: target.value,
        });
    }

    //ui

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckID}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h2>{deck.name}: Add Card</h2>
                <div className="form-group">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newCard.front}
                    >
                    </textarea>
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={newCard.back}
                    />
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={() => handleDone}
                >
                    Done
                </button>
                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    )
}

export default AddCard;