export interface MeteoriteLanding {
  fall: 'Fell' | 'Found';
  geolocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  id: string;
  mass: string;
  name: string;
  nameType: 'Valid';
  recclass: string;
  reclat: string;
  reclong: string;
  year: Date;
}
