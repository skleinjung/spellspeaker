package com.thrashplay.spellspeaker.effect;

import com.thrashplay.spellspeaker.effect.SpellEffect;

/**
 * @author Sean Kleinjung
 */
public class Noop implements SpellEffect {
    @Override
    public void execute() {
        // do nothing
    }
}
