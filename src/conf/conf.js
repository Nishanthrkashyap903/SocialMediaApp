const conf={
    appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWritePostsCollectionId:String(import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID),
    appWriteProfilePostsCollectionId:String(import.meta.env.VITE_APPWRITE_PROFILE_POSTS_COLLECTION_ID),
    appWritePostsLikedCollectionId : String(import.meta.env.VITE_APPWRITE_POSTS_LIKED_COLLECTION_ID),
    appWriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteEditorId: String(import.meta.env.VITE_APPWRITE_EDITOR_ID),
}

export default conf;