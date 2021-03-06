package com.thrashplay.spellspeaker.config;

import com.thrashplay.spellspeaker.effect.SpellEffect;
import com.thrashplay.spellspeaker.effect.SpellEffectExecutor;
import com.thrashplay.spellspeaker.model.CardFactory;
import com.thrashplay.spellspeaker.model.SpellspeakerGame;
import com.thrashplay.spellspeaker.model.User;
import com.thrashplay.spellspeaker.repository.GameRepository;
import com.thrashplay.spellspeaker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;

/**
 * @author Sean Kleinjung
 */
@Component
public class DefaultDataPreloader {
    private CardFactory cardFactory;
    private GameRepository gameRepository;
    private UserRepository userRepository;
    private SpellEffectExecutor spellEffectExecutor;

    @Autowired
    public DefaultDataPreloader(CardFactory cardFactory, GameRepository gameRepository, UserRepository userRepository, SpellEffectExecutor spellEffectExecutor) {
        Assert.notNull(cardFactory, "cardFactory cannot be null");
        Assert.notNull(gameRepository, "gameRepository cannot be null");
        Assert.notNull(userRepository, "userRepository cannot be null");
        Assert.notNull(spellEffectExecutor, "spellEffectExecutor cannot be null");

        this.cardFactory = cardFactory;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.spellEffectExecutor = spellEffectExecutor;
    }

    @PostConstruct
    public void preloadData() {
        User blue = new User();
        if (userRepository.findOne(1L) == null) {
            blue.setId(1);
            blue.setUsername("blue");
            blue.setPassword("password");
            userRepository.save(blue);
        }

        User red = new User();
        if (userRepository.findOne(2L) == null) {
            red.setId(2);
            red.setUsername("red");
            red.setPassword("password");
            userRepository.save(red);
        }

        if (gameRepository.findOne(101L) == null) {
            gameRepository.createNewGame(blue, red);
        }
    }
}
