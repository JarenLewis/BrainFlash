package com.techelevator.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DeckDto {
    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    public DeckDto(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}