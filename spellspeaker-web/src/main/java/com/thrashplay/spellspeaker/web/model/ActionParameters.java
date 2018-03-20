package com.thrashplay.spellspeaker.web.model;

/**
 * @author Sean Kleinjung
 */
public class ActionParameters {
    private String action;
    private String card;
    private String userInput;

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public String getUserInput() {
        return userInput;
    }

    public void setUserInput(String userInput) {
        this.userInput = userInput;
    }
}
