// @flow

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

declare type farmerParticipationLevel = 'solo Farmer' | 'co-Farmer' | 'helping hand';
declare type greenspaceTags = 'backyard' | 'front-yard' | 'full-yard' | 'large plot' | 'micro plot';
declare type cropTypes = 'fruits' | 'vegetables' | 'herbs' | 'ornamental';

export type Greenspace = {
  id: string,
  name: string,
  mainImage?: string,
  images?: Array<string>,
  address: string,
  description: string,
  tags: Array<greenspaceTags>,
  farmerDesired: boolean,
  farmerParticipation: farmerParticipationLevel,
  landownerID: string,
  plannedCrops: Array<cropTypes>
};

declare type farmingExperienceLevel = 'Expert' | 'Intermediate' | 'Novice';
declare type farmingSkills =
  | 'Fruits'
  | 'Vegetables'
  | 'Herbs'
  | 'Farming Education'
  | 'Home Gardening'
  | 'Sustainability'
  | 'Organic'
  | 'CSA'
  | 'Farmers Market';
declare type landOwnerParticipationLevels = 'hands-off' | 'helping hand' | 'co-farmer';

export type User = {
  id: string,
  landOwner: boolean,
  farmer: boolean,
  name: string,
  bio: string,
  profileImage: string,
  email: string,
  community: string,
  ownedPropertyIDs?: Array<string>,
  desiredLandOwnerParticipation?: landOwnerParticipationLevels,
  farmingPropertyIDs?: Array<string>,
  farmingExperienceLevel?: farmingExperienceLevel,
  farmingSkills?: Array<farmingSkills>,
  desiredPlotSize?: string
};

declare type ActionType = 'SET_TEST_PHRASE';

declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

export type Action = ActionT<'SET_TEST_PHRASE', string>;
