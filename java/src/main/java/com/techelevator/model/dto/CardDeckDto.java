package com.techelevator.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CardDeckDto {
    @JsonProperty("deck_id")
    private int deckId;
    @JsonProperty("card_id")
    private int cardId;

    public CardDeckDto(int deckId, int cardId) {
        this.deckId = deckId;
        this.cardId = cardId;
    }

    public int getDeckId() {
        return deckId;
    }

    public void setDeckId(int deckId) {
        this.deckId = deckId;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }
}