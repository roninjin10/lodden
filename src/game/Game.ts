import * as BigNumber from 'bignumber.js'
import {ICurrency} from '../lib/Currency'

export interface GameOptions {
  stake: BigNumber.BigNumber
}

export const DefaultGameOptions = {
  stake: ICurrency
}

export class Game {
  private _lodden: string
  private _plr1: string 
  private _plr2: string

  get lodden() {
    return this._lodden
  }

  get plr1() {
    return this._plr1
  }

  get plr2() {
    return this._plr2
  }

  constructor (lodden: string, plr1: string, plr2: string, options: GameOptions) {
    this._lodden = lodden
    this._plr1 = plr1
    this._plr2 = plr2 
  }
}