import {Outlet, redirect, useLoaderData} from "react-router";
import {getExistingUser, isUserAdmin, storeUserData} from "~/appwrite/auth";
import {account} from "~/appwrite/client";
import RootNavbar from "../../../components/RootNavbar";

export async function clientLoader() {
    try {
        const user = await account.get();

        if(!user.$id) return redirect('/sign-in');

        let existingUser: any = await getExistingUser(user.$id);
        if (!existingUser?.$id) {
            existingUser = await storeUserData();
        }

        if (isUserAdmin({ email: user.email, name: user.name })) {
            if (existingUser) existingUser.status = 'admin';
        }

        return existingUser || { status: 'admin', name: user.name, email: user.email };
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
