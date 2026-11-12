import {Header, TripCard} from "../../../components";
import {type LoaderFunctionArgs, useSearchParams} from "react-router";
import {getAllTrips, getTripById} from "~/appwrite/trips";
import {parseTripData} from "~/lib/utils";
import type {Route} from './+types/trips'
import {useState} from "react";
import {PagerComponent} from "@syncfusion/ej2-react-grids";
import {allTrips as sampleTrips} from "~/constants";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const limit = 8;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || "1", 10);
    const offset = (page - 1) * limit;

    const { allTrips, total } = await getAllTrips(limit, offset);

    return {
        trips: allTrips.map(({ $id, tripDetails, imageUrls }) => ({
            id: $id,
            ...parseTripData(tripDetails),
            imageUrls: imageUrls ?? []
        })),
        total
    }
}

const Trips = ({ loaderData }: Route.ComponentProps) => {
    const rawTrips = loaderData?.trips as Trip[] | [];
    const trips = (rawTrips && rawTrips.length > 0) ? rawTrips : (sampleTrips as unknown as Trip[]);
    const totalCount = loaderData?.total > 0 ? loaderData.total : trips.length;

    const [searchParams] = useSearchParams();
    const initialPage = Number(searchParams.get('page') || '1')

    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.location.search = `?page=${page}`
    }

    return (
        <main className="all-users wrapper">
            <Header
                title="Trips"
                description="View and edit AI-generated travel plans"
                ctaText="Create a trip"
                ctaUrl="/trips/create"
            />

            <section>
                <h1 className="p-24-semibold text-dark-100 mb-4">
                    Manage Created Trips
                </h1>

                <div className="trip-grid mb-4">
                    {trips.map((trip: any) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id}
                            name={trip.name}
                            imageUrl={trip.imageUrls?.[0] || '/assets/images/card-img-1.png'}
                            location={trip.itinerary?.[0]?.location ?? trip.country ?? ""}
                            tags={Array.isArray(trip.tags) ? trip.tags : [trip.interests || 'Culture', trip.travelStyle || 'Adventure']}
                            price={trip.estimatedPrice}
                        />
                    ))}
                </div>

                <PagerComponent
                    totalRecordsCount={totalCount}
                    pageSize={8}
                    currentPage={currentPage}
                    click={(args) => handlePageChange(args.currentPage)}
                    cssClass="!mb-4"
                />
            </section>
        </main>
    )
}
export default Trips
