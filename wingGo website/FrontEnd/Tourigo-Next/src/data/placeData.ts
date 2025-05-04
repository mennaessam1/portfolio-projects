// data/placeData.ts

import { fetchAllPlaces } from '@/api/placesApi';
import { Place } from '@/interFace/interFace';

export const getPlacesData = async (): Promise<Place[]> => {
    try {
        console.log();
        const places = await fetchAllPlaces();
        return places;
    } catch (error) {
        console.error("Error loading places:", error);
        return [];
    }
};
