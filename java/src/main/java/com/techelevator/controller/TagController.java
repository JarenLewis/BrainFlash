package com.techelevator.controller;

import com.techelevator.dao.TagDao;
import com.techelevator.exception.DaoException;

import com.techelevator.model.viewmodel.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
@RequestMapping
public class TagController {

    private TagDao tagDao;

    public TagController(TagDao tagDao) {
        this.tagDao = tagDao;
    }

    @RequestMapping(path = "/tags", method = RequestMethod.GET)
    public List<Tag> getAllTags() {

        return tagDao.getAllTags();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(path = "/tag/name/{name}", method = RequestMethod.GET)
    public Tag getTagsByName(@PathVariable String name, Principal principal) {

        try {
            return tagDao.getTagsByName(name);
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}