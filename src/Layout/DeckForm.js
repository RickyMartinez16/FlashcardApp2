import React from "react";
import {useHistory} from "react-router-dom"

function DeckForm({submitFunction, deck ={}, changeName, changeDescription}) {
    const history = useHistory();

    function deckName(){
        return deck.name ? deck.name : "";
    }

    function deckDescription(){
        return deck.description ? deck.description : "";
    }

    return (
        <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput">Deck Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={deckName()}
                    onChange={changeName}
                >
                </input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextArea1">Deck Description</label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextArea1"
                    rows="3"
                    placeholder="Enter a description of your deck"
                    required
                    value={deckDescription()}
                    onChange={changeDescription}
                >
                </textarea>
            </div>
            <button
                className="btn btn-secondary"
                type="button"
                onClick={() => history.go(-1)}
            >
                Cancel
            </button>
            <button
                className="btn btn-primary"
                type="submit"
                onClick={submitFunction}
            >
                Submit
            </button>
        </form>
    )
}

export default DeckForm