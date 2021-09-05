import ActionTypes from '../actionTypes';

export interface MeteoriteLanding {
  fall: 'Fell' | 'Found';
  geolocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  id: string;
  mass: number;
  name: string;
  nameType: 'Valid';
  recclass: string;
  reclat: string;
  reclong: string;
  year: Date;
}

interface State {
  landings: Array<MeteoriteLanding>;
  // Pointer to location in landings array :)
  landingIdIndexes: {[id: string]: number};
  distinct: {
    [key in keyof MeteoriteLanding]?: Array<string>;
  };
}

type Action = {
  type: string;
  payload?: any;
};

const initialState: State = {
  landings: [],
  landingIdIndexes: {},
  distinct: {},
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
) {
  if (!action.type) {
    return state;
  }
  const data = action.payload;
  switch (action.type) {
    case ActionTypes.data.setLandings:
      return {
        landings: data as Array<MeteoriteLanding>,
        landingIdIndexes: data.reduce(
          (landings: {[id: string]: number} = {}, current, index) => {
            landings[current.id] = index;
            return landings;
          },
          {},
        ),
        values: Object.keys(data[0] as MeteoriteLanding)
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
    default:
      return state;
  }
}
