import ActionTypes from '../actionTypes';

import type {MeteoriteLanding} from '../../types';
type MapBox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};
type SearchData = {
  query: string;
  enabled: boolean;
  minMass?: number;
  maxMass?: number;
  minYear?: number;
  maxYear?: number;
  favoritesOnly?: boolean;
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
  search: SearchData;
  filteredItems: Array<MeteoriteLanding>;
}

interface Action {
  type: string;
  payload?: any;
}

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
  search: {query: '', enabled: false},
  filteredItems: [],
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

const doFilter = (
  data: Array<MeteoriteLanding>,
  {query, minMass, maxMass, minYear, maxYear, favoritesOnly}: SearchData,
  favorites: Array<string>,
): Array<MeteoriteLanding> =>
  data.filter(
    ({id, name, year = 0, mass = 0}) =>
      !(
        !new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig').test(
          name,
        ) ||
        (minYear && new Date(year).getTime() < minYear) ||
        (maxYear && new Date(year).getTime() > maxYear) ||
        (minMass && mass < minMass) ||
        (maxMass && mass > maxMass) ||
        (favoritesOnly && favorites.indexOf(id) === -1)
      ),
  );

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
    case ActionTypes.data.search:
      const newSearchQuery: SearchData = {
        ...state.search,
        query: data.query,
        enabled: data?.query?.length > 0,
      };
      const filteredItems: Array<MeteoriteLanding> = doFilter(
        state.landings,
        newSearchQuery,
        state.favorites,
      );
      return {
        ...state,
        search: newSearchQuery,
        filteredItems: filteredItems,
      };
    case ActionTypes.data.filter:
      const filterQuery: SearchData = {
        ...state.search,
        ...data,
        enabled:
          state.search?.query?.length ||
          Object.values(data).findIndex(
            val => val !== null && val !== false,
          ) !== -1,
      };
      const filtered: Array<MeteoriteLanding> = doFilter(
        state.landings,
        filterQuery,
        state.favorites,
      );
      console.log(filterQuery);
      return {
        ...state,
        search: filterQuery,
        filteredItems: filtered,
      };
    default:
      return state;
  }
}
