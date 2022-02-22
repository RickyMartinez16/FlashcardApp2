import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck(){
    const history = useHistory();
    const initialState = {
        name: "",
        description: ""
    };
    const [newDeck, setNewDeck] = useState({...initialState});

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await createDeck(newDeck);
        history.push(`/decks/${response.id}`)
    }
    const handleChange = (event) => {
        setNewDeck({...newDeck, [event.target.name]: event.target.value});
    };

    // function handleCancel(){
    //     history.push("/")
    // }

    //ui

    return(
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Deck</li>
            </ol>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Create Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Deck name"
                        onChange={handleChange}
                        type="text"
                        value={newDeck.name}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Brief description of deck"
                        onChange={handleChange}
                        type="text"
                        rows="3"
                        value={newDeck.description}
                    />
                </div>
                <Link to="/">Cancel</Link>
                <button
                    className="btn btn-primary mx-1"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}


export default CreateDeck;