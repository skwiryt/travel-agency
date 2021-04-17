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


// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDurationFrom = payload => ({ payload, type: CHANGE_DURATION_FROM });
export const changeDurationTo = payload => ({ payload, type: CHANGE_DURATION_TO });
export const addTagFilter = payload => ({ payload, type: ADD_TAG_FILTER });
export const removeTagFilter = payload => ({ payload, type: REMOVE_TAG_FILTER });

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
        duration: {
          from: action.payload,
          to: statePart.duration.to,
        },
      };      
    case CHANGE_DURATION_TO:
      return {
        searchPhrase: statePart.searchPhrase,
        tags: statePart.tags,
        duration: {
          from: statePart.duration.from,
          to: action.payload,
        },
      };
    case ADD_TAG_FILTER:
      return {
        searchPhrase: statePart.searchPhrase,
        tags: [...statePart.tags, action.payload],
        duration: statePart.duration,        
      };

    case REMOVE_TAG_FILTER:
      return {
        searchPhrase: statePart.searchPhrase,
        tags: statePart.tags.filter(tag => tag !=action.payload),
        duration: statePart.duration,        
      };


    default:
      return statePart;
  }
}