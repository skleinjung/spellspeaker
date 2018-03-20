package com.thrashplay.spellspeaker.config.rules;

import com.thrashplay.spellspeaker.config.RitualConstructionRule;
import com.thrashplay.spellspeaker.model.Card;
import com.thrashplay.spellspeaker.model.CardType;
import com.thrashplay.spellspeaker.model.Errors;
import com.thrashplay.spellspeaker.model.Ritual;

/**
 * @author Sean Kleinjung
 */
public class OnlyOneEffectTypeRule implements RitualConstructionRule {
    @Override
    public void validateRitualAddition(Errors errors, Ritual ritual, Card card) {
        if (card.getType() == CardType.EffectRune && !"None".equals(ritual.getEffect())) {
            errors.add("A ritual may only have one effect rune.");
        }
    }
}
