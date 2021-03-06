package com.thrashplay.spellspeaker.command;

import com.thrashplay.spellspeaker.model.InputType;
import com.thrashplay.spellspeaker.model.SpellspeakerGame;
import com.thrashplay.spellspeaker.model.User;
import com.thrashplay.spellspeaker.model.state.StateChange;

import java.util.List;

/**
 * @author Sean Kleinjung
 */
public class CompleteRitual extends AbstractCommand {
    @Override
    public List<StateChange> execute(User currentUser, SpellspeakerGame game) {
        return game.provideInput(currentUser, InputType.RitualCompletionRequest, "yes");
    }
}
