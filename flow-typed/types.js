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

declare type farmingExperienceLevel = 'expert' | 'intermediate' | 'novice';
export type farmingSkills =
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
  userName: string,
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

export type FarmerBrief = {
  userName: string,
  id: string,
  bio: string,
  profileImage: string,
  community: string,
  properties?: Array<string>,
  experience: farmingExperienceLevel,
  skills?: Array<farmingSkills>
};

export type GreenspaceOwnerBrief = {
  id: string,
  userName: string,
  bio: string,
  profileImage: string,
  email: string,
  community: string,
  ownedPropertyIDs?: Array<string>,
  desiredLandOwnerParticipation?: landOwnerParticipationLevels
};

// action types for reducers
declare type ActionType = 'SET_TEST_PHRASE';

declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

export type Action = ActionT<'SET_TEST_PHRASE', string>;
