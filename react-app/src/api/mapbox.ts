import { MapSearchListItemProps } from '../components/MapSearchListItem';
import secret from '../secret.json';

export const searchLocation = async (query: string, proximity: { lng: Number, lat: Number }): Promise<MapSearchListItemProps[]> => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=10&access_token=${secret.MAPBOX_API_KEY}&proximity=${proximity.lng},${proximity.lat}`
  );
  const data = await response.json();
  return data.features.map((feature: any) => ({
    mapbox_id: feature.id,
    name: feature.text,
    address: feature.place_name,
    center: { lng: feature.center[0], lat: feature.center[1] },
  }));
}