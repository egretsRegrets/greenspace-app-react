// @flow

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

declare type farmerParticipationLevel = 'solo Farmer' | 'co-Farmer' | 'helping Hand';
declare type greenspaceTags = 'backyard' | 'front-yard' | 'full-yard' | 'large plot' | 'micro plot';

export type Greenspace = {
  id: string,
  name: string,
  images?: Array<string>,
  address: string,
  description: string,
  tags: Array<greenspaceTags>,
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
