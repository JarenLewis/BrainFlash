package com.techelevator.model.viewmodel;

import java.util.List;

public class Deck {
   private String title;
   private String description;
   private int deckId;
   private  int userId;
   private List<Card> cards;

    public Deck() { }

    public Deck (String title, String description, int deckId, int userId, List<Card> cards) {
        this.title = title;
        this.description = description;
        this.deckId = deckId;
        this.userId = userId;
        this.cards = cards;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDeckId() {
        return deckId;
    }

    public void setDeckId(int deckId) {
        this.deckId = deckId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }
}