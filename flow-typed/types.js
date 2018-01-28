// @flow

import {SET_GREENSPACES_FILTERS, SET_FARMERS_FILTERS} from '../js/actions';

declare
var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

declare type farmerParticipationLevel = 'solo Farmer' | 'co-Farmer' | 'helping hand';
export type greenspaceTags = 'backyard' | 'front-yard' | 'full-yard' | 'large plot' | 'micro plot';
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

export type farmingExperienceLevel = 'expert' | 'intermediate' | 'novice';
export type farmingSkills = |
  'fruits' |
  'vegetables' |
  'herbs' |
  'farming education' |
  'home gardening' |
  'sustainability' |
  'organic' |
  'CSA' |
  'farmers market';
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

export type UserFilteredEntities = Array<FarmerBrief> | Array<Greenspace>;

// types for filters

export type Filters = 'greenspaces';

export type FilterProp = {
  filters: Array<string>,
  titles: Array<string>,
  options: {
    [filter: string]: Array<string>
  },
  optionsText?: {
    [filter: string]: Array<string>
  },
  binaryFilters?: Array<string>,
  binaryFilterProps?: {
    [binaryFilter: string]: {
      btnText: string
    }
  }
}

export type FiltersProps = {
  [filterCat: string]: FilterProp
};

export type genFilters = {
  [filterType: string]: {
    [filter: string]: boolean
  }
}

export type greenspacesFilters = {
  farmerDesired: {
    yes: boolean,
    no: boolean
  },
  plotSize: {
    initial: boolean,
    largePlot: boolean,
    microPlot: boolean,
    backyard: boolean,
    frontyard: boolean,
    fullyard: boolean
  }
};

// shape of params object passed from Filters component through its parent to its to-store-dispatch via resolveFiltersState()
export type resolveFiltersParams = {
  filter: string,
  filterType: string,
  filterState: genFilters
}

// action types for reducers
declare type ActionType = SET_GREENSPACES_FILTERS | SET_FARMERS_FILTERS;

declare type ActionT < A: ActionType, P > = {|
  type: A,
  payload: P 
|};

export type Action = ActionT<SET_GREENSPACES_FILTERS, greenspacesFilters> | ActionT<SET_FARMERS_FILTERS, genFilters> ;