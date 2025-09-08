package com.techelevator.dao;

import com.techelevator.model.viewmodel.Deck;

import java.util.List;

public interface DeckDao {

    List<Deck> getAllDecks();
    List<Deck> getDecksByUsername(String username);
    Deck getDeckByDeckId (int deckId);
    List <Deck> getDecksByUserId (int userId);
    Deck getDescription (String description);
    Deck getTitle (String title);
    Deck createDeck(Deck newDeck);
    Deck deleteDeck(int deckId);
    Deck updateDeck(Deck updatedDeck);
    Deck addCardToDeck(int deckId, int cardId);
    Deck removeCardFromDeck(int deckId, int cardId);
}