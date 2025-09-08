package com.techelevator.dao;

import com.techelevator.exception.DaoException;

import com.techelevator.model.viewmodel.Tag;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
public class JdbcTagDao implements TagDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcTagDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Tag getTagsByName(String name) {
        String tagName = name.toLowerCase().trim();

        String sql = "SELECT tag_id, name FROM tags WHERE name =?;";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, tagName);

        if(results.next()) {
            return mapRowToTag(results);
        } else {
            String insertTag = "INSERT INTO tags(name) VALUES(?) RETURNING tag_id;";
            int tagId = jdbcTemplate.queryForObject(insertTag, int.class, tagName);

            Tag newTag = new Tag();
            newTag.setTagId(tagId);
            newTag.setName(tagName);

            return newTag;
        }
    }

    @Override
    public List<Tag> getAllTags() {
        String sql = "SELECT tag_id, name FROM tags;";
        List<Tag> tags = new ArrayList<>();

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while(results.next()) {
            tags.add(mapRowToTag(results));
        }
        return tags;
    }

    @Override
    public void clearTags(int cardId) {
        String sql = "DELETE FROM card_tags WHERE card_id = ?;";
        jdbcTemplate.update(sql, cardId);
    }

    @Override
    public List<Tag> getTagsByCardId(int cardId) {
        List<Tag> tags = new ArrayList<>();
        String sql = "SELECT tags.tag_id AS tag_id, name " +
                "FROM tags " +
                "JOIN card_tags ON tags.tag_id = card_tags.tag_id " +
                "WHERE card_tags.card_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, cardId);
        while (results.next()) {
            tags.add(mapRowToTag(results));
        }
        return tags;
    }

    @Override
    public List<Tag> getTagsByNames (String name) {
        List<Tag> tagsByName = new ArrayList<>();
        String sql = "Select card.*, tags.name " + "FROM card " +
                "Join card_tags ON card.card_id = card_tags.card_id " +
                "Join tags ON card_tags.tag_id = tags.tag_id " +
                "WHERE LOWER (tags.name) = LOWER(?) ?;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, name);
            while (results.next()) {
                Tag tag = new Tag();
                tag.setName(results.getString("name"));
                tag.setTagId(results.getInt("tag_id"));
                tagsByName.add(tag);
            }
        } catch (Exception e) {
            throw new DaoException("Can't retrieve tags by name", e);
        }
        return tagsByName;
    }

    private Tag mapRowToTag(SqlRowSet rs) {
        Tag tag = new Tag();
        tag.setTagId(rs.getInt("tag_id"));
        tag.setName(rs.getString("name"));

        return tag;
    }
}