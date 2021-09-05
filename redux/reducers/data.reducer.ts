import ActionTypes from '../actionTypes';

import type {MeteoriteLanding} from '../../types';

interface State {
  landings: Array<MeteoriteLanding>;
  // Pointer to location in landings array :)
  landingIdIndexes: {[id: string]: number};
  distinct: {
    [key in keyof MeteoriteLanding]?: Array<string>;
  };
  // Array of ids
  favorites: Array<string>;
}

type Action = {
  type: string;
  payload?: any;
};

const initialState: State = {
  landings: [],
  landingIdIndexes: {},
  distinct: {},
  favorites: [],
};

const getDistinctValues = (
  key: keyof MeteoriteLanding,
  data: MeteoriteLanding[],
) =>
  data.reduce((distinct: Array<any> = [], {[key]: item}: MeteoriteLanding) => {
    if (distinct.indexOf(item) === -1) {
      distinct.push(item);
    }
    return distinct;
  }, []);
export default function reduceData(
  state: State = initialState,
  action: Action,
): State {
  if (!action.type) {
    return state;
  }
  const data = action.payload;
  switch (action.type) {
    case ActionTypes.data.setLandings:
      return {
        ...state,
        landings: data as Array<MeteoriteLanding>,
        landingIdIndexes: data.reduce(
          (landings: {[id: string]: number} = {}, current, index) => {
            landings[current.id] = index;
            return landings;
          },
          {},
        ),
        distinct: Object.keys(data[0] as MeteoriteLanding)
          .filter(
            key =>
              ['fall', 'recclass', 'nametype', 'mass', 'year'].indexOf(key) !==
              -1,
          )
          .reduce((distinct = {}, key) => {
            distinct[key] = getDistinctValues(
              key as keyof MeteoriteLanding,
              data,
            );
            return distinct;
          }, {}),
      };
    case ActionTypes.data.favoriteItem:
      return {
        ...state,
        favorites: [...state.favorites, data.id],
      };
    case ActionTypes.data.unfavoriteItem:
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== data.id),
      };
    default:
      return state;
  }
}
