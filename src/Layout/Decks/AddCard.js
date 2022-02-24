
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";
import CardForm from "../CardForm";

function AddCard(){
    const history = useHistory();
    const {deckId} = useParams();
    const initialState = {
        front:"",
        back: ""
    };

    const [newCard, setNewCard] = useState({...initialState});
    const [deck, setNewDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setNewDeck(response);
            } catch (error){
                console.log(error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(
            deckId,
            {...newCard},
            abortController.signal
        );
        history.go(0);
        setNewCard(initialState);
        return response;

        // function handleSubmit({target}) {
        //     setNewCard({
        //         ...newCard,
        //         [target.name]: target.value
        //     });
        // }        
    }
    
    // function handleDone(){
    //     history.push(`/decks/${deckId}`);
    // }

    // function handleChange({ target }) {
    //     setNewCard({
    //         ...newCard,
    //         [target.name]: target.value,
    //     });
    // }

    function changeFront(e) {
        setNewCard({ ...newCard, front: e.target.value });
      }
      
      function changeBack(e) {
        setNewCard({ ...newCard, back: e.target.value });
      }

    //ui

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            
                <h2>{deck.name}: Add Card</h2>
                <CardForm
                    submitHandler={handleSubmit}
                    card={newCard}
                    changeFront={changeFront}
                    changeBack={changeBack}
                 />
        </div>
    )
}

export default AddCard;