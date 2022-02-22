import React, {useEffect, useState} from "react";
import {Link, useParams, useHistory, useRouteMatch} from "react-router-dom";
import {deleteCard, readDeck, deleteDeck} from "../../utils/api/index";

function Deck(){
  const [deck, setDeck] = useState([]);
  const {deckId} = useParams();
  const history = useHistory();
  const {url} = useRouteMatch();
  const {id, name, description, cards} = deck;

  // useEffect(() => {
  //     const abortController = new AbortController();
  //     const deckInfoResponse = async() => {
  //         const response = await readDeck(deckId, abortController.signal);
  //         setDeck(() => response)
  //     };
  //     deckInfoResponse();
  //     return() => abortController.abort();
  // }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    async function deckInfo(){
      try{
        const deckInfoResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckInfoResponse)
      } catch (error) {
        console.log(error)
      }
    }
      deckInfo();
      return () => abortController.abort();
  }, [deckId])



  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sre you want to delete this deck? You will not be able to recover it"
      )
    ) {await deleteDeck(id);
    history.push("/")
    } else {
      history.go(0);
    }
  }

  if(!deck || !cards) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  } else {
    return (
      <div className="col">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              {name}
            </li>
          </ol>
        </nav>
        <div className="card border-0">
          <div className="bard-body">
            <div className="row">
              <h5 className="card-title">{name}</h5>
            </div>
            <p className="card-text">{description}</p>
            <div className="row">
              <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
              <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
              <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
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
        <div className="row">
          <h1>Cards</h1>
        </div>
        {cards.map((card, index) => (
          <div className="row" key={index}>
            <div className="col">
              <div className="card">
                <div className="row card-body">
                  <p className="col-6 card-text">{card.front}</p>
                  <p className="col-6 card-text">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end p-4">
                  <Link 
                    to={`${url}/cards/${card.id}/edit`}
                    className="btn btn-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        if(
                          window.confirm(
                            "Are you sure you want to delete this card? You will not be able to recover it"
                          )
                        ) {
                          await deleteCard(card.id);
                          history.go(0);
                        } else {
                          history.go(0);
                        }
                      }}
                      name="deleteCard"
                      value="card.id"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Deck