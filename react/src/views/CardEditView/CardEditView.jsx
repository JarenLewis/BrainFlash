import axios from "axios";
import CardEditForm from "../../components/CardEditForm/CardEditForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import styles from "./CardEditView.css";

export default function CardEditView() {
  const {id} = useParams();
  const [card, setCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function getCard() {
    axios.get(`/card/${id}`)
    .then(
      response => {
        setCard(response.data);
        setIsLoading(false);
      }
    ).catch(
      error => {
        console.log("Error while retrieving card: " + error);
      }
    );
  }

  useEffect(
    () => getCard(),
    []
  );

  return isLoading ? 
  (
    <p>Form loading...</p>
  )
  : (
    <CardEditForm card={card}/>
  )
}