import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck(){
    const history = useHistory();
    const {deckID} = useParams();
    const [deck, setDeck] = useState(initialDeckState);
    const initialDeckState = {
        id: "",
        name: "",
        description: ""
    }

    useEffect(() => {
        async function fetchData(){
            const abortController = new AbortController();
            try{
                const response = await readDeck(deckID, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    function handleChange({ target }) {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({...deck}, abortController.signal);
        history.push(`/decks/${deckID}`);
        return response;
    }

    function handleCancel(){
        history.push(`/decks/${deckID}`);
    }

    //ui

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to={`decks/${deckID}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
            <form obSubmit={handleSubmit}>
                <h1>Edit Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={deck.name}
                    >
                    </input>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={deck.description}
                    >
                    </textarea>
                </div>
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => handleCancel}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-primary mx-1"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditDeck;