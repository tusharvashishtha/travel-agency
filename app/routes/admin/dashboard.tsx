import {Header, StatsCard, TripCard} from "../../../components";
import {getAllUsers, getUser} from "~/appwrite/auth";
import type { Route } from './+types/dashboard';
import {getTripsByTravelStyle, getUserGrowthPerDay, getUsersAndTripsStats} from "~/appwrite/dashboard";
import {getAllTrips} from "~/appwrite/trips";
import {parseTripData} from "~/lib/utils";
import {
    Category,
    ChartComponent,
    ColumnSeries,
    DataLabel, SeriesCollectionDirective, SeriesDirective,
    SplineAreaSeries,
    Tooltip
} from "@syncfusion/ej2-react-charts";
import {ColumnDirective, ColumnsDirective, GridComponent, Inject} from "@syncfusion/ej2-react-grids";
import {allTrips as sampleTrips, dashboardStats as defaultStats, tripXAxis, tripyAxis, users as defaultUsers, userXAxis, useryAxis} from "~/constants";
import {redirect} from "react-router";

export const clientLoader = async () => {
    try {
        const [
            user,
            dashboardStats,
            trips,
            userGrowth,
            tripsByTravelStyle,
            allUsers,
        ] = await Promise.all([
            getUser(),
            getUsersAndTripsStats(),
            getAllTrips(4, 0),
            getUserGrowthPerDay(),
            getTripsByTravelStyle(),
            getAllUsers(4, 0),
        ]);

        const parsedTrips = trips?.allTrips ? trips.allTrips.map(({ $id, tripDetails, imageUrls }) => ({
            id: $id,
            ...parseTripData(tripDetails),
            imageUrls: imageUrls ?? []
        })) : [];
        const allTrips = parsedTrips.length > 0 ? parsedTrips : (sampleTrips as unknown as Trip[]);

        const mappedUsers: UsersItineraryCount[] = (allUsers?.users && allUsers.users.length > 0)
            ? allUsers.users.map((u) => ({
                imageUrl: u.imageUrl || '/assets/images/david.webp',
                name: u.name,
                count: u.itineraryCount ?? Math.floor(Math.random() * 10),
            }))
            : defaultUsers.map((u) => ({
                imageUrl: u.imageUrl,
                name: u.name,
                count: Number(u.itineraryCreated) || 5,
            }));

        return {
            user: user || { id: '1', name: 'Tushar Vashishtha', email: 'vashishthatushar004@gmail.com', dateJoined: '2025-01-01', imageUrl: '/assets/images/david.webp', status: 'admin' },
            dashboardStats: dashboardStats?.totalUsers > 0 ? dashboardStats : defaultStats,
            allTrips,
            userGrowth: userGrowth?.length > 0 ? userGrowth : [
                { day: "Mon", count: 12 },
                { day: "Tue", count: 19 },
                { day: "Wed", count: 28 },
                { day: "Thu", count: 32 },
                { day: "Fri", count: 45 },
            ],
            tripsByTravelStyle: tripsByTravelStyle?.length > 0 ? tripsByTravelStyle : [
                { travelStyle: "Adventure", count: 42 },
                { travelStyle: "Culture", count: 35 },
                { travelStyle: "Relaxation", count: 28 },
                { travelStyle: "Luxury", count: 19 },
            ],
            allUsers: mappedUsers
        };
    } catch (e) {
        return {
            user: { id: '1', name: 'Tushar Vashishtha', email: 'vashishthatushar004@gmail.com', dateJoined: '2025-01-01', imageUrl: '/assets/images/david.webp', status: 'admin' },
            dashboardStats: defaultStats,
            allTrips: sampleTrips as unknown as Trip[],
            userGrowth: [
                { day: "Mon", count: 12 },
                { day: "Tue", count: 19 },
                { day: "Wed", count: 28 },
                { day: "Thu", count: 32 },
                { day: "Fri", count: 45 },
            ],
            tripsByTravelStyle: [
                { travelStyle: "Adventure", count: 42 },
                { travelStyle: "Culture", count: 35 },
                { travelStyle: "Relaxation", count: 28 },
                { travelStyle: "Luxury", count: 19 },
            ],
            allUsers: defaultUsers.map((u) => ({
                imageUrl: u.imageUrl,
                name: u.name,
                count: Number(u.itineraryCreated) || 5,
            }))
        };
    }
};


const Dashboard = ({ loaderData }: Route.ComponentProps) => {
    const user = loaderData.user as unknown as User | null;
    const { dashboardStats, allTrips, userGrowth, tripsByTravelStyle, allUsers } = loaderData;

    const trips = allTrips.map((trip) => ({
        imageUrl: trip.imageUrls[0],
        name: trip.name,
        interest: trip.interests,
    }))

    const usersAndTrips = [
        {
            title: 'Latest user signups',
            dataSource: allUsers,
            field: 'count',
            headerText: 'Trips created'
        },
        {
            title: 'Trips based on interests',
            dataSource: trips,
            field: 'interest',
            headerText: 'Interests'
        }
    ]

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? 'Guest'} 👋`}
                description="Track activity, trends and popular destinations in real time"
            />

            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard
                        headerTitle="Total Users"
                        total={dashboardStats.totalUsers}
                        currentMonthCount={dashboardStats.usersJoined.currentMonth}
                        lastMonthCount={dashboardStats.usersJoined.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Total Trips"
                        total={dashboardStats.totalTrips}
                        currentMonthCount={dashboardStats.tripsCreated.currentMonth}
                        lastMonthCount={dashboardStats.tripsCreated.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Active Users"
                        total={dashboardStats.userRole.total}
                        currentMonthCount={dashboardStats.userRole.currentMonth}
                        lastMonthCount={dashboardStats.userRole.lastMonth}
                    />
                </div>
            </section>
            <section className="container">
                <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

                <div className='trip-grid'>
                    {allTrips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id.toString()}
                            name={trip.name!}
                            imageUrl={trip.imageUrls[0]}
                            location={trip.itinerary?.[0]?.location ?? ''}
                            tags={[trip.interests!, trip.travelStyle!]}
                            price={trip.estimatedPrice!}
                        />
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ChartComponent
                    id="chart-1"
                    primaryXAxis={userXAxis}
                    primaryYAxis={useryAxis}
                    title="User Growth"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="Column"
                            name="Column"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />

                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="SplineArea"
                            name="Wave"
                            fill="rgba(71, 132, 238, 0.3)"
                            border={{ width: 2, color: '#4784EE'}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>

                <ChartComponent
                    id="chart-2"
                    primaryXAxis={tripXAxis}
                    primaryYAxis={tripyAxis}
                    title="Trip Trends"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={tripsByTravelStyle}
                            xName="travelStyle"
                            yName="count"
                            type="Column"
                            name="day"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </section>

            <section className="user-trip wrapper">
                {usersAndTrips.map(({ title, dataSource, field, headerText}, i) => (
                    <div key={i} className="flex flex-col gap-5">
                        <h3 className="p-20-semibold text-dark-100">{title}</h3>

                        <GridComponent dataSource={dataSource} gridLines="None">
                            <ColumnsDirective>
                                <ColumnDirective
                                    field="name"
                                    headerText="Name"
                                    width="200"
                                    textAlign="Left"
                                    template={(props: UserData) => (
                                        <div className="flex items-center gap-1.5 px-4">
                                            <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" referrerPolicy="no-referrer" />
                                            <span>{props.name}</span>
                                        </div>
                                    )}
                                />

                                <ColumnDirective
                                    field={field}
                                    headerText={headerText}
                                    width="150"
                                    textAlign="Left"
                                />
                            </ColumnsDirective>
                        </GridComponent>
                    </div>
                ))}
            </section>
        </main>
    )
}
export default Dashboard