package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.viewmodel.Card;
import com.techelevator.model.viewmodel.Tag;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcCardDao implements CardDao {
    private final JdbcTemplate jdbcTemplate;
    private final TagDao tagDao;

    public JdbcCardDao(JdbcTemplate jdbcTemplate, TagDao tagDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.tagDao = tagDao;
    }

    @Override
    public Card getCardById(int cardId) {
        Card card = null;
        String sql = "SELECT * FROM card WHERE card_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, cardId);
            if (results.next()) {
                card = mapRowToCard(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return card;
    }

    @Override
    @Transactional
    public Card createCard(Card newCard) {
        Card card = new Card();
        String sql = "INSERT INTO card (front, back, user_id, has_image) values (?, ?, ?, ?) RETURNING card_id;";
        int newCardId = jdbcTemplate.queryForObject(sql, int.class,
                newCard.getFront(),
                newCard.getBack(),
                newCard.getUserId(),
                newCard.isVisual());

        if (newCard.getTags() != null) {
            for (Tag tagName : newCard.getTags()) {
                int tagId = tagDao.getTagsByName(tagName.getName()).getTagId();
                linkTagToCard(newCardId, tagId);
            }
        }
        return getCardById(newCardId);
    }

    private void linkTagToCard(int cardId, int tagId) {
        String sql = "INSERT INTO card_tags (card_id, tag_id) Values (?, ?) ON CONFLICT DO NOTHING;";
        jdbcTemplate.update(sql, cardId, tagId);
    }

    @Override
    public Card updateCard(Card updatedCard) {
        Card card = null;
        String sql = "Update card SET front = ?, back = ?, has_image = ? WHERE card_id = ?;";

        jdbcTemplate.update(sql, updatedCard.getFront(), updatedCard.getBack(), updatedCard.isVisual(), updatedCard.getCardId());

        tagDao.clearTags(updatedCard.getCardId());
        if(updatedCard.getTags() !=null) {

            for (Tag tagName : updatedCard.getTags()) {
                int tagId = tagDao.getTagsByName(tagName.getName()).getTagId();
                linkTagToCard(updatedCard.getCardId(), tagId);
            }
        }
        return getCardById(updatedCard.getCardId());
    }

    @Override
    public boolean deleteCard(int cardId) {
        String sql = "DELETE FROM card Where card_id = ?;";

        return jdbcTemplate.update(sql, cardId) == 1;
    }

    @Override
    public List<Card> getCardsByDeckId(int deckId) {
        List<Card> cards = new ArrayList<>();
        String sql = "SELECT * FROM card " +
                "JOIN card_deck ON card.card_id = card_deck.card_id " +
                "WHERE card_deck.deck_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, deckId);
            while (results.next()) {
                cards.add(mapRowToCard(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Cannot connect to database", e);
        }
        return cards;
    }

    @Override
    public List<Card> getAllCards() {
        List<Card> cards = new ArrayList<>();
        String sql = "SELECT * FROM card;";
        try {
           SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
           while (results.next()) {
               cards.add(mapRowToCard(results));
           }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Cannot connect to database", e);
        }
        return cards;
    }

    @Override
    public List<Card> getCardsByUserId(int userId) {
        List<Card> cards = new ArrayList<>();
        String sql = "SELECT * FROM card WHERE user_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                cards.add(mapRowToCard(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Cannot connect to database", e);
        }
        return cards;
    }

    private Card mapRowToCard(SqlRowSet rs) {
        Card card = new Card();
        card.setCardId(rs.getInt("card_id"));
        card.setUserId(rs.getInt("user_id"));
        card.setFront(rs.getString("front"));
        card.setBack(rs.getString("back"));
        List<Tag> tags = tagDao.getTagsByCardId(card.getCardId());
        card.setTags(tags);
        card.setVisual(rs.getBoolean("has_image"));
        return card;
    }
}