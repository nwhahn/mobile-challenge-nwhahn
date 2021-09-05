import {MeteoriteLanding} from './reducers/data.reducer';
import type {RootState} from './store';

export const getLandingById = (
  {data: {landingIdIndexes, landings}}: RootState,
  id: string,
): MeteoriteLanding => landings[landingIdIndexes[id]];
