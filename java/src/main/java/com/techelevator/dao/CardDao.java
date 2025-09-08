package com.techelevator.dao;

import com.techelevator.controller.CardController;
import com.techelevator.exception.DaoException;
import com.techelevator.model.viewmodel.Card;
import com.techelevator.model.viewmodel.User;
import org.springframework.jdbc.CannotGetJdbcConnectionException;

import java.security.Principal;
import java.util.List;

public interface CardDao {

    public Card getCardById(int cardId);
    public Card createCard(Card newCard);
    public Card updateCard(Card updatedCard);
    public boolean deleteCard(int cardId);
    public List<Card> getCardsByDeckId(int deckId);
    public List<Card> getAllCards();
    public List<Card> getCardsByUserId(int userId);
}