const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionid: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteStorageid: String(import.meta.env.VITE_APPWRITE_STORAGE_ID)
};

export default conf;
