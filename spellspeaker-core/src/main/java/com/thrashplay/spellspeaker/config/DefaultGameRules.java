package com.thrashplay.spellspeaker.config;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thrashplay.spellspeaker.config.rules.OnlyOneEffectTypeRule;
import com.thrashplay.spellspeaker.config.rules.OnlyOneElementRule;
import com.thrashplay.spellspeaker.config.rules.RuneNameIsUniqueRule;
import org.springframework.stereotype.Component;

/**
 * @author Sean Kleinjung
 */
@Component
public class DefaultGameRules implements GameRules {
    @Override
    public int getMaximumHealth() {
        return 40;
    }

    @Override
    public int getMaximumMana() {
        return 30;
    }

    @Override
    public int getTicksPerPhase() {
        return 30;
    }

    @Override
    public int getMarketSize() {
        return 5;
    }

    @Override
    public int getInitialHandSize() {
        return 5;
    }

    @Override
    public int getMaximumHandSize() {
        return 10;
    }

    @Override
    public int getMaximumAfflictions() {
        return 10;
    }

    @Override
    @JsonIgnore
    public RitualConstructionRules getRitualConstructionRules() {
        return new RitualConstructionRules()
                .addRule(new RuneNameIsUniqueRule())
                .addRule(new OnlyOneElementRule())
                .addRule(new OnlyOneEffectTypeRule());
    }

    @Override
    public int getChillCastingTimeIncrease() {
        return 1;
    }

    @Override
    public int getBurningDamage() {
        return 2;
    }

    @Override
    public int getShockManaCostIncrease() {
        return 1;
    }

    @Override
    public int getChillDecayRate() {
        return 0;
    }

    @Override
    public int getBurningDecayRate() {
        return -1;
    }

    @Override
    public int getShockDecayRate() {
        return 0;
    }
}
