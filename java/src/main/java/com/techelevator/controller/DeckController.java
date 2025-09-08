package com.techelevator.controller;

import com.techelevator.dao.CardDao;
import com.techelevator.dao.DeckDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.dto.CardDeckDto;
import com.techelevator.model.dto.DeckDto;
import com.techelevator.exception.DaoException;
import com.techelevator.model.viewmodel.Authority;
import com.techelevator.model.viewmodel.Deck;
import com.techelevator.model.viewmodel.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
@RequestMapping
public class DeckController {

    private UserDao userDao;
    private DeckDao deckDao;
    private CardDao cardDao;
    public DeckController(DeckDao deckDao, UserDao userDao, CardDao cardDao) {
        this.deckDao = deckDao;
        this.userDao = userDao;
        this.cardDao = cardDao;
    }

    @RequestMapping(path = "/deck", method = RequestMethod.GET)
    public List<Deck> getAllDecks(Principal principal) {
        List<Deck> decks = new ArrayList<>();

        try {
            User user = userDao.getUserByUsername(principal.getName());
            if (user.isAdmin()) {
                decks = deckDao.getAllDecks();
            } else {
                decks = deckDao.getDecksByUserId(user.getId());
            }
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return decks;
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(path = "/decks/user/{userId}", method = RequestMethod.GET)
    public List <Deck> getDecksByUserId(@PathVariable int userId, Principal principal) {
        List<Deck> decks = new ArrayList<>();

        try {

            String username = principal.getName();

            User user = userDao.getUserByUsername(username);
            int authUserId = user.getId();

            decks = deckDao.getDecksByUserId(userId);

            if (authUserId != userId) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
            }
        }

        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return decks;
    }

    @RequestMapping(path = "/deck/{deckId}", method = RequestMethod.GET)
    public Deck getDeckById(Principal principal, @PathVariable int deckId) {
        Deck decks = null;

        try {
            if (!canSeeDeck(principal, deckId)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to access deck" + deckId);
            }
            decks = deckDao.getDeckByDeckId(deckId);
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return decks;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/create-deck", method = RequestMethod.POST)
    public Deck createDeck(@RequestBody @Valid DeckDto deckDto, Principal principal){

        String username = principal.getName();
        User user = userDao.getUserByUsername(username);

        int userId = user.getId();

        Deck deck = new Deck();
        deck.setTitle(deckDto.getTitle());
        deck.setDescription(deckDto.getDescription());
        deck.setUserId(userId);

        return deckDao.createDeck(deck);
    }

    @RequestMapping(path = "/edit-deck/{id}", method = RequestMethod.PUT)
    public Deck updateDeck(Principal principal, @RequestBody DeckDto deck, @PathVariable int id) {

        Deck updatedDeck = null;

        try{
            if (!canSeeDeck(principal, id)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to access deck" + id);
            }
            updatedDeck = deckDao.getDeckByDeckId(id);
            updatedDeck.setTitle(deck.getTitle());
            updatedDeck.setDescription(deck.getDescription());


            deckDao.updateDeck(updatedDeck);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        return updatedDeck;
    }

    // TODO add in check for canSeeCard as well
    @RequestMapping(path = "/edit-deck/add", method = RequestMethod.PUT)
    public Deck addCardToDeck(Principal principal, @RequestBody CardDeckDto cardDeckDto) {
        boolean canAddCard = canSeeDeck(principal, cardDeckDto.getDeckId());
        if (!canAddCard) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to add card to deck" + cardDeckDto.getDeckId());
        }
        return deckDao.addCardToDeck(cardDeckDto.getDeckId(), cardDeckDto.getCardId());
    }

    // TODO add in check for canSeeCard as well
    @RequestMapping(path = "/edit-deck/remove", method = RequestMethod.PUT)
    public Deck removeCardFromDeck(Principal principal, @RequestBody CardDeckDto cardDeckDto) {
        boolean canRemoveCard = canSeeDeck(principal, cardDeckDto.getDeckId());
        if (!canRemoveCard) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized to remove card from deck" + cardDeckDto.getDeckId());
        }
        return deckDao.removeCardFromDeck(cardDeckDto.getDeckId(), cardDeckDto.getCardId());
    }

    @RequestMapping(path = "/delete-deck/{deckId}", method = RequestMethod.DELETE)
    public Deck deleteDeck(@PathVariable int deckId) {
        return deckDao.deleteDeck(deckId);
    }

    // A user can see a deck if they're an admin, or they made the deck.
    private boolean canSeeDeck(Principal principal, int deckId) {
        try {
            User user = userDao.getUserByUsername(principal.getName());
            Deck deck = deckDao.getDeckByDeckId(deckId);
            return user.isAdmin() || deck.getUserId() == user.getId();
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Cannot connect to server", e);
        }
    }
}