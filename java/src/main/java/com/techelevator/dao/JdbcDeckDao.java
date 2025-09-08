package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.viewmodel.Deck;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcDeckDao implements DeckDao{
    private final JdbcTemplate jdbcTemplate;
    private final CardDao cardDao;

    public JdbcDeckDao(JdbcTemplate jdbcTemplate, CardDao cardDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.cardDao = cardDao;
    }

    @Override
    //ADMIN
    public List<Deck> getAllDecks() {
        List<Deck> decks = new ArrayList<>();
        String sql = "SELECT deck_id, user_id, description, title FROM deck;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Deck deck = mapRowToDeck(results);
                decks.add(deck);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return decks;
    }

    @Override
    public List<Deck> getDecksByUsername(String username) {
        List<Deck> decks = new ArrayList<>();
        String sql = "SELECT deck_id, user_id, description, title " +
                "FROM deck " +
                "JOIN deck ON deck.user_id = users.user_id " +
                "WHERE username = ?;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next()) {
                Deck deck = mapRowToDeck(results);
                decks.add(deck);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return decks;
    }

    @Override
    public Deck getDeckByDeckId(int deckId) {
        Deck decks = null;
        String sql = "SELECT deck_id, user_id, description, title FROM deck WHERE deck_id = ?;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, deckId);
            if (results.next()) {
                decks = mapRowToDeck(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return decks;
    }

    @Override
    public List<Deck> getDecksByUserId(int userId) {
        List<Deck> decks = new ArrayList<>();
        String sql = "SELECT user_id, deck_id, description, title FROM deck WHERE user_id = ?;";

        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                Deck deck = mapRowToDeck(results);
                decks.add(deck);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return decks;
    }

    @Override
    public Deck getDescription(String description) {
        Deck deck = null;
        String sql = "SELECT description, title, deck_id, user_id FROM deck;";

        try{
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, description);
            if (rowSet.next()) {
                deck = mapRowToDeck(rowSet);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException ("Unable to connect to server or database", e);
        }
        return deck;
    }

    @Override
    public Deck getTitle(String title) {
        Deck deck = null;
        String sql = "SELECT title, description, deck_id, user_id FROM deck;";

        try{
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, title);
            if (rowSet.next()) {
                deck = mapRowToDeck(rowSet);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return deck;
    }

    @Override
    public Deck createDeck(Deck newDeck) {
        Deck createdDeck = null;
        String sql = "INSERT INTO deck (title, description, user_id) VALUES (?, ?, ?) RETURNING deck_id;";
        try{
            int newDeckId = jdbcTemplate.queryForObject(sql, int.class, newDeck.getTitle(),
                    newDeck.getDescription(),
                    newDeck.getUserId());
            createdDeck = getDeckByDeckId(newDeckId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        } catch(NullPointerException e) {
            throw new DaoException("Unable to create deck.", e);
        }
        return createdDeck;
    }

    @Override
    public Deck deleteDeck(int deckId) {
        Deck deckToDelete = getDeckByDeckId(deckId);
        String sql = "DELETE FROM deck WHERE deck_id = ?;";

        try {
            jdbcTemplate.update(sql, deckId);
            return deckToDelete;
        } catch (DataAccessException e) {
            throw new DaoException("Unable to delete.", e);
        }
    }

    @Override
    public Deck updateDeck(Deck updatedDeck) {
        Deck updateDecks = null;
        String sql = "UPDATE deck " +
                "SET title = ?, description = ? " +
                "WHERE deck_id = ?;";

        try {
            int rowsAffected = jdbcTemplate.update(sql, updatedDeck.getTitle(), updatedDeck.getDescription(), updatedDeck.getDeckId());

            if (rowsAffected == 0) {
                throw new DaoException("Zero rows affected, expected at least one");
            }
            updateDecks = getDeckByDeckId(updatedDeck.getDeckId());

        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return updateDecks;
    }

    @Override
    public Deck addCardToDeck(int deckId, int cardId) {
        String sqlSelect = "SELECT * FROM card_deck " +
                "WHERE deck_id = ? AND card_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sqlSelect, deckId, cardId);
            if (!results.next()) {
                String sqlInsert = "INSERT INTO card_deck (deck_id, card_id) " +
                        "VALUES (?, ?);";
                jdbcTemplate.update(sqlInsert, deckId, cardId);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Cannot connect to database", e);
        }
        return getDeckByDeckId(deckId);
    }

    @Override
    public Deck removeCardFromDeck(int deckId, int cardId) {
        String sqlSelect = "SELECT * FROM card_deck " +
                "WHERE deck_id = ? AND card_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sqlSelect, deckId, cardId);
            if (results.next()) {
                String sqlDelete = "DELETE FROM card_deck " +
                        "WHERE deck_id = ? AND card_id = ?;";
                jdbcTemplate.update(sqlDelete, deckId, cardId);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Cannot connect to database", e);
        }
        return getDeckByDeckId(deckId);
    }

    private Deck mapRowToDeck(SqlRowSet rs) {
        Deck deck = new Deck();
        deck.setUserId(rs.getInt("user_id"));
        deck.setDeckId(rs.getInt("deck_id"));
        deck.setDescription(rs.getString("description"));
        deck.setTitle(rs.getString("title"));
        deck.setCards(cardDao.getCardsByDeckId(deck.getDeckId()));

        return deck;
    }
}