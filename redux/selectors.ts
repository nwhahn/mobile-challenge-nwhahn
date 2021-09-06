import type {MeteoriteLanding} from '../types';
import type {RootState} from './store';

export const getLandingById = (
  {data: {landingIdIndexes, landings}}: RootState,
  id: string,
): MeteoriteLanding => landings[landingIdIndexes[id]];

export const getLandingIsFavorited = (
  {data: {favorites = []}}: RootState,
  id: string,
): boolean => favorites.indexOf(id) !== -1;
