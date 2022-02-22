import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";
import DeckForm from "../DeckForm";

function EditDeck(){
    const history = useHistory();
    const {deckId} = useParams();
    const initialDeckState = {
        id: "",
        name: "",
        description: ""
    }
    const [deck, setDeck] = useState({...initialDeckState});

    useEffect(() => {
        async function fetchData(){
            const abortController = new AbortController();
            try{
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.log(error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    function changeName(event) {
        setDeck({ ...deck, name: event.target.value });
      }
    
      function changeDesc(event) {
        setDeck({ ...deck, description: event.target.value });
      }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({...deck}, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
    }

    // function handleCancel(){
    //     history.push(`/decks/${deckId}`);
    // }

    //ui

    return (
        <div className="col-9 mx-auto">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="breadcrumb-item">Edit Deck</li>
            </ol>
          </nav>
          <h4>Edit Deck</h4>
          <DeckForm
            submitFunction={handleSubmit}
            deck={deck}
            changeName={changeName}
            changeDescription={changeDesc}
          />
        </div>
      );
}

export default EditDeck;