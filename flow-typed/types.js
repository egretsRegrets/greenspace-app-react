// @flow

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

declare type farmerParticipationLevel = 'Solo Farmer' | 'Co-Farmer' | 'Helping Hand';

export type Greenspace = {
  id: string,
  name: string,
  images?: Array<string>,
  address: string,
  description: string,
  farmerDesired: boolean,
  farmerParticipation: farmerParticipationLevel,
  landownerID: string
};

declare type ActionType = 'SET_TEST_PHRASE';

declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

export type Action = ActionT<'SET_TEST_PHRASE', string>;
