import {appwriteConfig, database} from "~/appwrite/client";
import {Query} from "appwrite";

export const getAllTrips = async (limit: number, offset: number) => {
    try {
        const allTrips = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            [Query.limit(limit), Query.offset(offset), Query.orderDesc('$createdAt')]
        )

        return {
            allTrips: allTrips?.documents || [],
            total: allTrips?.total || 0,
        }
    } catch (error) {
        return { allTrips: [], total: 0 }
    }
}

export const getTripById = async (tripId: string) => {
    try {
        const trip = await database.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            tripId
        );

        return trip?.$id ? trip : null;
    } catch (error) {
        return null;
    }
}