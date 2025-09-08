package com.techelevator.dao;

import com.techelevator.model.viewmodel.Tag;

import java.util.List;

public interface TagDao {
    public Tag getTagsByName(String name);
    public List <Tag> getTagsByNames(String name);
    List<Tag> getAllTags();
    void clearTags(int cardId);
    List<Tag> getTagsByCardId(int cardId);
}