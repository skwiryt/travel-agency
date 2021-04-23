/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const CHANGE_DURATION_FROM = createActionName('CHANGE_DURATION_FROM');
export const CHANGE_DURATION_TO = createActionName('CHANGE_DURATION_TO');
export const ADD_TAG_FILTER = createActionName('ADD_TAG_FILTER');
export const REMOVE_TAG_FILTER = createActionName('REMOVE_TAG_FILTER');
export const ADD_REGION_FILTER = createActionName('ADD_REGION_FILTER');
export const REMOVE_REGION_FILTER = createActionName('REMOVE_REGION_FILTER');


// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDurationFrom = payload => ({ payload, type: CHANGE_DURATION_FROM });
export const changeDurationTo = payload => ({ payload, type: CHANGE_DURATION_TO });
export const addTagFilter = payload => ({ payload, type: ADD_TAG_FILTER });
export const removeTagFilter = payload => ({ payload, type: REMOVE_TAG_FILTER });
export const addRegionFilter = payload => ({ payload, type: ADD_REGION_FILTER });
export const removeRegionFilter = payload => ({ payload, type: REMOVE_REGION_FILTER });

// TODO - add other action creators

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    // TODO - handle other action types
    case CHANGE_DURATION_FROM:
      return {
        searchPhrase: statePart.searchPhrase,
        tags: statePart.tags,
        regions: statePart.regions,
        duration: {
          from: action.payload,
          to: statePart.duration.to,
        },
      };      
    case CHANGE_DURATION_TO:
      return {
        searchPhrase: statePart.searchPhrase,
        tags: statePart.tags,
        regions: statePart.regions,
        duration: {
          from: statePart.duration.from,
          to: action.payload,
        },
      };
    case ADD_TAG_FILTER:
      return {
        searchPhrase: statePart.searchPhrase,
        regions: statePart.regions,
        tags: [...statePart.tags, action.payload],
        duration: statePart.duration,        
      };

    case REMOVE_TAG_FILTER:
      return {
        searchPhrase: statePart.searchPhrase,
        regions: statePart.regions,
        tags: statePart.tags.filter(tag => tag !=action.payload),
        duration: statePart.duration,        
      };
    case ADD_REGION_FILTER:
      return {
        searchPhrase: statePart.searchPhrase,
        tags: statePart.tags,
        regions: [...statePart.regions, action.payload],
        duration: statePart.duration,        
      };

    case REMOVE_REGION_FILTER:
      return {
        searchPhrase: statePart.searchPhrase,
        tags: statePart.tags,
        regions: statePart.regions.filter(region => region !=action.payload),
        duration: statePart.duration,        
      };


    default:
      return statePart;
  }
}