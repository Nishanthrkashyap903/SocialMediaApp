import { Client, ID, Storage, Databases, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {

    client=new Client();;
    storage;
    database;
    constructor() { 
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.storage = new Storage(this.client);
        this.database = new Databases(this.client);
    }

    async uploadPost(file) {
        try {
            const result=await this.storage.createFile(conf.appWriteBucketId, ID.unique(), file);
            return result;
        } catch (error) {
            console.log("Appwrite server :: uploadFile :: error", error);
            return false;
        }
    }

    async deletePost(fileId) {
        try {
            await this.storage.deleteFile(conf.appWriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite server :: deleteFile :: error", error);
            return false;
        }
    }

    async createPost({UserId,Title,Content,PostImageID,Likes},) {
        try {
            await this.database.createDocument(conf.appWriteDatabaseId, conf.appWritePostsCollectionId, ID.unique(), {
                UserId,
                Title,
                Content,
                PostImageID,
                Likes,
            })
        } catch (error) {
            console.log("Appwrite server :: createPost :: error", error);
        }
    }

    async createProfilePost({UserId,ProfileImageId,Name,EmailId}){
        try {
            return await this.database.createDocument(conf.appWriteDatabaseId,
                conf.appWriteProfilePostsCollectionId, 
                ID.unique(), {
                UserId,
                ProfileImageId,
                Name,
                EmailId,
            })
        } catch (error) {
            console.log("Appwrite server :: createProfilePost :: error", error);
        }
    }

    async getProfilePosts({
        name,
        value,
    }){
        try {
            return await this.database.listDocuments(conf.appWriteDatabaseId,
                conf.appWriteProfilePostsCollectionId,[Query.equal(name,[value])]
                )
        } catch (error) {
            console.log("Appwrite server :: getProfilePost :: error", error);
            return false;
        }
    }

    async updateProfilePosts({documentId,ProfileImageId,Name}){
        try {
            return await this.database.updateDocument(conf.appWriteDatabaseId,conf.appWriteProfilePostsCollectionId,documentId,{
                ProfileImageId,
                Name,
            }) 
        } catch (error) {
            console.log("Appwrite server :: updateProfilePosts :: error", error);
            return false;
        }
    }

    getProfileImagePreview(ProfileImageID){
        return this.storage.getFilePreview(conf.appWriteBucketId,ProfileImageID);
    }
}

const service = new Service();

export default service;
