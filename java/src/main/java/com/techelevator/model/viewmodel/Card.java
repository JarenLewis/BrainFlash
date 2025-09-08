package com.techelevator.model.viewmodel;

import java.util.List;

public class Card {

   private String front;
   private String back;
   private  int cardId;
   private int userId;
   private List<Tag> tags;
   private boolean isVisual;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Card(String front, String back, int cardId, int userId, List<Tag> tags, boolean isImage) {
        this.front = front;
        this.back = back;
        this.cardId = cardId;
        this.userId = userId;
        this.tags = tags;
        this.isVisual = isImage;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public Card() {
    }

    public String getFront() {
        return front;
    }

    public void setFront(String front) {
        this.front = front;
    }

    public String getBack() {
        return back;
    }

    public void setBack(String back) {
        this.back = back;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public boolean isVisual() {
        return isVisual;
    }

    public void setVisual(boolean visual) {
        isVisual = visual;
    }
}