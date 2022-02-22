import React from "react";
import { Link, useHistory } from "react-router-dom";
import {deleteDeck} from "../../utils/api/index"

function ListOfDecks({deck}){
    const history = useHistory();
    const {id, name, description, cards} = deck;

    const handleDelete = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete this deck? You will not be able to recover it"
            )
        ) {
            await deleteDeck(id);
            history.go(0);
        } else {
            history.go(0);
        }
    };

    //ui

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <h4 className="card-title">{name}</h4>
                    <p className="ml-auto">{cards.length} cards</p>
                </div>
                <p className="card-text">{description}</p>
                <div className="row">
                    <Link to={`/decks/${id}`} className="btn btn-secondary">View</Link>
                    <Link to={`/decks/${id}/study`} className="btn btn-primary">Study</Link>
                    <button
                        onClick={handleDelete}
                        name="delete"
                        value={id}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListOfDecks