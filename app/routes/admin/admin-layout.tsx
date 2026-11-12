import {Outlet, redirect} from "react-router";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import {MobileSidebar, NavItems} from "../../../components";
import {account} from "~/appwrite/client";
import {getExistingUser, isUserAdmin, storeUserData} from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();

        if(!user.$id) return redirect('/sign-in');

        let existingUser: any = await getExistingUser(user.$id);
        if (!existingUser?.$id) {
            existingUser = await storeUserData();
        }

        const isAdmin = isUserAdmin({ email: user.email, name: user.name }) || existingUser?.status === 'admin';

        if (!isAdmin) {
            return redirect('/');
        }

        return existingUser ? { ...existingUser, status: 'admin' } : { status: 'admin', name: user.name, email: user.email };
    } catch (e) {
        console.log('Error in clientLoader', e)
        return redirect('/sign-in')
    }
}

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <MobileSidebar />

            <aside className="w-full max-w-[270px] hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>
            </aside>

            <aside className="children">
                <Outlet />
            </aside>
        </div>
    )
}
export default AdminLayout
