import {Outlet, redirect, useLoaderData} from "react-router";
import {getExistingUser, storeUserData} from "~/appwrite/auth";
import {account} from "~/appwrite/client";
import RootNavbar from "../../../components/RootNavbar";

export async function clientLoader() {
    try {
        const user = await account.get();

        if(!user.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);
        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (e) {
        return redirect('/sign-in')
    }
}

const PageLayout = () => {
    const user = useLoaderData();

    return (
        <div className="bg-light-200">
            <RootNavbar user={user} />
            <Outlet context={{ user }} />
        </div>
    )
}
export default PageLayout
