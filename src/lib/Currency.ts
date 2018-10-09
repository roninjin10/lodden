import BigNumber from "bignumber.js";
class BN {
  fuck = 'FUCK'
}


export enum BaseCurrencyTypes {
  WEI = 'WEI',
  CENTS = 'CENTS',
}

export enum CurrencyType {
  WEI = 'WEI',
  ETHER = 'ETHER',
  CENTS = 'CENTS',
  USD = 'USD',
}

export interface ICurrency<T extends CurrencyType> {
  type: T
  amount: BigNumber
}

export interface ICurrencyStringNumberOrBN<T extends CurrencyType> {
  type: T
  amount: BigNumber|string|number
}

export class Currency<T extends CurrencyType> implements ICurrency<T> {
  private _currency: ICurrency<T>
  
  constructor(currency: ICurrency<T>)
  constructor(type: T, amount: BigNumber|string|number) 
  constructor(...args: any[]) {
    const currency: ICurrencyStringNumberOrBN<T> = args.length === 1
      ? args[0]
      : {
        type: args[0],
        amount: args[1]
      }
    
    this._currency = Currency.asICurrency(currency)
  }

  get currency(): ICurrency<T> {
    return this._currency
  }

  get type(): T {
    return this._currency.type
  }

  get amount(): BigNumber {
    return this._currency.amount
  }

  get amountBN(): BN {
    return new BN()
  }

  get amountStr(): string {
    return this.amount.toString()
  }

  // todo overload this function so exchange rate is provided when needed.
  public to(toType: CurrencyType, exchangeRate: BigNumber): Currency<any> {
    this._validateTo(toType, exchangeRate)

    if (this.type === toType) {
      return this
    }


     return new Currency(toType, this.amount.times(exchangeRate))
  }

  static ETHER = (amount: BigNumber | string | number) => new Currency(CurrencyType.ETHER, amount)
  static WEI = (amount: BigNumber | string | number) => new Currency(CurrencyType.WEI, amount)
  static USD = (amount: BigNumber | string | number) => new Currency(CurrencyType.USD, amount)
  static CENTS = (amount: BigNumber | string | number) => new Currency(CurrencyType.CENTS, amount)

  public setExchangeRates = (usdRate: () => BigNumber) => {
    // pass in the exchange rate callback that enables usd to eth type exchange rates
    // usd to usd or eth to eth (e.g. 1 ETH to WEI) is valid without this function being called
  }

  private _validateTo(toType: CurrencyType, exchangeRate?: BigNumber): void {
  }
  
  static removeMethods<T extends CurrencyType>(currency: ICurrency<T>) {
    return {
      type: currency.type,
      amount: currency.amount,
    }
  }

  static asICurrency<T extends CurrencyType>(currency: ICurrencyStringNumberOrBN<T>): ICurrency<T> {
    const type = currency.type 

    const amount: BigNumber = currency.amount instanceof BigNumber
      ? currency.amount
      : new BigNumber(currency.amount)
    
    return {type, amount}
  }
}
