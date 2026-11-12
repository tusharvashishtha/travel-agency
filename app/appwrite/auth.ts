import { ID, OAuthProvider, Query } from "appwrite";
import { account, database, appwriteConfig } from "~/appwrite/client";
import { redirect } from "react-router";

export const isUserAdmin = (userOrEmail?: { email?: string; name?: string } | string | null): boolean => {
    if (!userOrEmail) return false;
    const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail.email;
    const name = typeof userOrEmail === 'object' ? userOrEmail?.name : undefined;
    const adminEmails = ['vashishthatushar004@gmail.com'];

    if (email && adminEmails.includes(email.toLowerCase())) return true;
    if (name && name.toLowerCase().includes('tushar')) return true;
    return false;
};

export const getExistingUser = async (id: string) => {
    try {
        const { documents, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", id)]
        );
        if (total > 0) {
            const userDoc = documents[0];
            if (isUserAdmin({ email: userDoc.email, name: userDoc.name })) {
                userDoc.status = 'admin';
            }
            return userDoc;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const storeUserData = async () => {
    try {
        const user = await account.get();
        if (!user) throw new Error("User not found");

        const { providerAccessToken } = (await account.getSession("current")) || {};
        const profilePicture = providerAccessToken
            ? await getGooglePicture(providerAccessToken)
            : null;

        const isAdmin = isUserAdmin({ email: user.email, name: user.name });

        const createdUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email: user.email,
                name: user.name,
                imageUrl: profilePicture,
                joinedAt: new Date().toISOString(),
                status: isAdmin ? 'admin' : 'user',
            }
        );

        if (!createdUser.$id) redirect("/sign-in");
        return createdUser;
    } catch (error) {
        console.error("Error storing user data:", error);
        return null;
    }
};

const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=photos",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch Google profile picture");

        const { photos } = await response.json();
        return photos?.[0]?.url || null;
    } catch (error) {
        console.error("Error fetching Google picture:", error);
        return null;
    }
};

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/`,
            `${window.location.origin}/404`
        );
    } catch (error) {
        console.error("Error during OAuth2 session creation:", error);
    }
};

export const logoutUser = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

export const getUser = async () => {
    try {
        const user = await account.get();
        if (!user) return redirect("/sign-in");

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal("accountId", user.$id),
                Query.select(["name", "email", "imageUrl", "joinedAt", "accountId", "status"]),
            ]
        );

        if (documents.length > 0) {
            const userDoc = documents[0];
            if (isUserAdmin({ email: userDoc.email || user.email, name: userDoc.name || user.name })) {
                userDoc.status = 'admin';
            }
            return userDoc;
        }

        return redirect("/sign-in");
    } catch (error: any) {
        if (error?.code !== 401 && error?.type !== 'general_unauthorized_scope') {
            console.error("Error fetching user:", error);
        }
        return null;
    }
};

export const getAllUsers = async (limit: number, offset: number) => {
    try {
        const { documents: users, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.limit(limit), Query.offset(offset)]
        )

        if(total === 0) return { users: [], total };

        return { users, total };
    } catch (e) {
        console.log('Error fetching users')
        return { users: [], total: 0 }
    }
}