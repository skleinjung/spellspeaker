///<reference path="../message/message.component.ts"/>
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';

import {Game} from '../../model/game';
import {GameService} from '../../service/game.service';
import {Rules} from '../../model/rules';
import {RulesService} from '../../service/rules.service';
import {MessageService} from '../../service/message-service';
import {Card} from '../../model/card';
import {AddedToRitualStateChange, StateChange} from '../../model/state-change';
import {ActionResult} from '../../model/action-result';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.shared.css', './game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  constructor(private messageService: MessageService,
              private gameService: GameService,
              private rulesService: RulesService,
              private route: ActivatedRoute,
              private location: Location
  ) {}

  @Input() private _game: Game;
  private _stateChanges: StateChange[];
  private _animationsStarted: boolean;

  userInput: string;
  rules: Rules;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.gameService.getGame(+params.get('id')))
      .subscribe(game => {
        this.game = game;
      });

    this.rulesService.getRules().subscribe(rules => this.rules = rules);
  }

  // https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp/31989462#31989462
  range(start, end, step, offset): number[] {

    const len = (Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1;
    const direction = start < end ? 1 : -1;
    const startingPoint = start - (direction * (offset || 0));
    const stepSize = direction * (step || 1);

    return Array(len).fill(0).map(function(_, index) {
      return startingPoint + (stepSize * index);
    });
  }

  get game(): Game {
    return this._game;
  }

  set game(value: Game) {
    this._game = value;
    this.animationsStarted = false;
    setTimeout(() => {
      this.animationsStarted = true;
    }, 250);
  }

  get animationsStarted(): boolean {
    return this._animationsStarted;
  }

  set animationsStarted(value: boolean) {
    this._animationsStarted = value;
  }

  get stateChanges(): StateChange[] {
    return this._stateChanges;
  }

  set stateChanges(value: StateChange[]) {
    this._stateChanges = value;

    if (this._stateChanges && this._stateChanges.length > 0) {
      let message = '';
      for (let i = 0; i < this._stateChanges.length; i++) {
        message += '<div>' + this._stateChanges[i].message + '</div>';
      }

      if (message !== '') {
        this.messageService.showInformation(message);
      }
    }
  }

  get maximumHealth(): number {
    return this.rules.maximumHealth;
  }

  get maximumMana(): number {
    return this.rules.maximumMana;
  }

  get logText(): string {
    let text = '';
    for (let i = 0; i < this.game.log.length; i++) {
      if (i !== 0) {
        text += '\n';
      }

      text += this.game.log[i];
    }

    return text;
  }

  isMyTurn(): boolean {
    return this.game.activePlayerColor === this.game.currentUserColor;
  }

  isMarketSelectionEnabled(): boolean {
    return this.isMyTurn() && (this.game.inputRequest.type === 'CardFromMarket');
  }

  getMarketSelectionPrompt(): string {
    if (!this.isMarketSelectionEnabled()) {
      return null;
    }

    return this.game.inputRequest.prompt;
  }

  getSelectedCardFromMarket(): Card {
    for (let i = 0; i < this.game.market.length; i++) {
      const card = this.game.market[i];
      if (card.selected) {
        return card;
      }
    }
    return null;
  }

  confirmMarketSelection(): void {
    this.processActionResult(this.gameService.selectCardFromMarket(this.game.id, this.getSelectedCardFromMarket()));
  }

  isHandSelectionEnabled(): boolean {
    return this.isMyTurn() && this.game.inputRequest.type === 'CardFromHand';
  }

  getHandSelectionPrompt(): string {
    if (!this.isHandSelectionEnabled()) {
      return null;
    }

    return this.game.inputRequest.prompt;
  }

  getSelectedCardFromHand(): Card {
    for (let i = 0; i < this.game.hand.length; i++) {
      const card = this.game.hand[i];
      if (card.selected) {
        return card;
      }
    }
    return null;
  }

  confirmHandSelection(): void {
    if (this.game.inputRequest.type === 'CardFromHand') {
      this.processActionResult(this.gameService.selectCardFromHand(this._game.id, this.getSelectedCardFromHand()));
    } else {
      this.messageService.showError('Unknown inputRequest type: ' + this.game.inputRequest.type);
    }
  }

  confirmUserInput(): void {
    this.processActionResult(this.gameService.submitUserInput(this._game.id, this.userInput));
  }

  completeRitual(): void {
    this.processActionResult(this.gameService.completeRitual(this._game.id));
  }

  processActionResult(observable: Observable<ActionResult>): void {
    observable.finally(() => {
      window.scrollTo(0, 0);
      this.userInput = null;
    })
      .subscribe(result => {
        this.stateChanges = result.stateChanges;
        this.game = result.game;
      });
  }

  getUpdatedRitualCards(whichPlayer: string): string[] {
    const result = [];
    if (this.stateChanges) {
      for (let i = 0; i < this.stateChanges.length; i++) {
        const stateChange = this.stateChanges[i];
        if (stateChange.type === 'AddedToRitual') {
          const addedToRitualChange = <AddedToRitualStateChange> stateChange;
          if (addedToRitualChange.player === whichPlayer) {
            result.push(addedToRitualChange.card);
          }
        }
      }
    }

    return result;
  }


  // save(): void {
  //   this.creatureTypeService.update(this.creatureType)
  //     .then(() => this.goBack());
  // }
}

