package com.techelevator.controller;

import com.techelevator.dao.CardDao;
import com.techelevator.dao.UserDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.viewmodel.Card;
import com.techelevator.model.viewmodel.User;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
@RequestMapping
public class CardController {

    private CardDao cardDao;
    private UserDao userDao;

    public CardController(CardDao cardDao, UserDao userDao) {
        this.cardDao = cardDao;
        this.userDao = userDao;
    }

    @RequestMapping(path = "/card/{cardId}", method = RequestMethod.GET)
    public Card getCardById(@PathVariable int cardId, Principal principal) {
        Card card = null;
        try {
            if (!canSeeCard(principal, cardId)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to access card" + cardId);
            }
            card = cardDao.getCardById(cardId);
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return card;
    }

    @RequestMapping (path = "/create-card", method = RequestMethod.POST)
    public Card createCard(@RequestBody Card card, Principal principal) {
        String username = principal.getName();
        User user = userDao.getUserByUsername(username);
        card.setUserId(user.getId());

        return cardDao.createCard(card);
    }

    @RequestMapping(path = "/edit-card/{id}", method = RequestMethod.PUT)
    public Card updateCard(@RequestBody Card card, Principal principal) {
        if (!canSeeCard(principal, card.getCardId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to edit card" + card.getCardId());
        }
        return cardDao.updateCard(card);
    }

    @RequestMapping(path = "/delete-card/{cardId}", method = RequestMethod.DELETE)
    public boolean deleteCard(@PathVariable int cardId, Principal principal) {
        if (!canSeeCard(principal, cardId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to edit card" + cardId);
        }
        return cardDao.deleteCard(cardId);
    }

    @RequestMapping(path = "/cards", method = RequestMethod.GET)
    public List<Card> allCards(Principal principal) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            if (user.isAdmin()) {
                return cardDao.getAllCards();
            } else {
                return cardDao.getCardsByUserId(user.getId());
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to get all cards");
        }
    }

    // A user can see a card if they're an admin, or they made the card.
    public boolean canSeeCard(Principal principal, int cardId) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            Card card = cardDao.getCardById(cardId);
            return user.isAdmin() || card.getUserId() == user.getId();
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Cannot connect to server", e);
        }
    }
}