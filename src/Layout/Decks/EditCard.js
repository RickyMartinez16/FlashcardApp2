import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api/index";

import CardForm from "../CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();

    const initialCardState = {
        id: "",
        front: "",
        back: "",
        deckId: "",
    };

    const [card, setCard] = useState({...initialCardState});
    const [deck, setDeck] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        const cardInfo = async () => {
            const response = await readCard(cardId, abortController.signal);
            setCard(() => response);
        };
        cardInfo();
        return () => abortController.abort();
    }, [cardId]);

    useEffect(() => {
        const abortController = new AbortController();

        const deckInfo = async() => {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(() => response);
        }
        deckInfo();
        return () => abortController.abort();
    }, [deckId]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deck.id}`);
    };

    function changeFront(event){
        setCard({...card, front: event.target.value});
    }

    function changeBack(event){
        setCard({...card, back: event.target.value});
    }


    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Edit Card {cardId}</li>
            </ol>
            <h4>Edit Deck</h4>
            <CardForm 
                submitHandler={handleSubmit}
                card={card}
                changeFront={changeFront}
                changeBack={changeBack}
            />
        </div>
    );
}

export default EditCard;