import { Game, GameOptions, DefaultGameOptions } from './Game'



export enum Position {
  lodden = 'lodden',
  plr1 = 'plr1',
  plr2 = 'plr2',
}

export class Registration {
  private lodden?: string
  private plr1?: string
  private plr2?: string
  private game?: Game
  private options: GameOptions

  constructor(playerId: string, position: Position, options: RegistrationOptions = DefaultGameOptions) {
    this.options = options

    this.register(playerId, position)
  }

  public register = async (playerId: string, position: Position): Promise<Game|null> => {
    this[Position[position]] = playerId

    const didStart = this.lodden && this.plr1 && this.plr2

    return didStart
      ? this.startGame() 
      : null
  }

  public getGame = (): Game => {
    if (!this.game) {
      throw new Error('no game exists')
    }
    return this.game
  }

  public isGameStarted = () => !!this.game

  private startGame = (): Game => {
    if (!(this.lodden && this.plr1 && this.plr2)) throw new Error('Cannot start game without 3 players')
    
    this.game = new Game(this.lodden, this.plr1, this.plr2, this.options)
    
    return this.game
  }
}
