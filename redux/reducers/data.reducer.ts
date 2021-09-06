import ActionTypes from '../actionTypes';

import type {MeteoriteLanding} from '../../types';
type MapBox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};
interface State {
  landings: Array<MeteoriteLanding>;
  // Pointer to location in landings array :)
  landingIdIndexes: {[id: string]: number};
  distinct: {
    [key in keyof MeteoriteLanding]?: Array<string>;
  };
  // Array of ids
  favorites: Array<string>;
  mapBox: MapBox;
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
  mapBox: {
    minX: 0,
    minY: 0,
    maxX: 100,
    maxY: 100,
  },
};
const generateViewBox = (data: Array<MeteoriteLanding>): MapBox => {
  let maxX = -Infinity;
  let maxY = -Infinity;
  let minX = Infinity;
  let minY = Infinity;
  data.forEach(({geolocation: {coordinates: [x, y] = [0, 0]} = {}}) => {
    // Manipulate
    if (x > maxX) {
      maxX = x;
    } else if (x < minX) {
      minX = x;
    }
    if (y > maxY) {
      maxY = y;
    } else if (y < minY) {
      minY = y;
    }
  });
  return {minX, minY, maxX, maxY};
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
        mapBox: generateViewBox(data as Array<MeteoriteLanding>),
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
