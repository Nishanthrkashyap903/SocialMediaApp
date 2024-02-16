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
            return await this.storage.deleteFile(conf.appWriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite server :: deleteFile :: error", error);
            return false;
        }
    }

    async deleteLikedPost(likedId){
        try {
            return await this.database.deleteDocument(conf.appWriteDatabaseId, conf.appWritePostsLikedCollectionId, likedId);
        } catch (error) {
            console.log("Appwrite server :: deleteLikedFile :: error", error);
            return false;
        }
    }

    async createPost({UserId,Title,Content,PostImageID,Name}) {
        console.log({UserId,Title,Content,PostImageID,Name})
        try {
           
            return await this.database.createDocument(conf.appWriteDatabaseId, conf.appWritePostsCollectionId, ID.unique(), {
                UserId,
                Title,
                Content,
                PostImageID,
                Name,
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

    async createLikedPost({PostId,UserId}){
        try {
            return await this.database.createDocument(conf.appWriteDatabaseId,
                conf.appWritePostsLikedCollectionId, 
                ID.unique(), {
                PostId,
                UserId,
            })
        } catch (error) {
            console.log("Appwrite server :: createLikedPost :: error", error);
            return false;
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

    async getAllPosts(){
        try {
            return await this.database.listDocuments(conf.appWriteDatabaseId,
                conf.appWritePostsCollectionId
                )
        } catch (error) {
            console.log("Appwrite server :: getAllPost :: error", error);
            return false;
        }
    }

    async getPost(
        documentId
    ){
        try {
            return await this.database.getDocument(conf.appWriteDatabaseId,
                conf.appWritePostsCollectionId, 
                documentId
                )
        } catch (error) {
            console.log("Appwrite server :: getPost :: error", error);
            return false;
        }
    }

    //TODO: Create a function to update Liked Post

    async getLikedPost(
        {
            name,
            value,
        }
    ){
        console.log("value",value);
        try {
            return await this.database.listDocuments(conf.appWriteDatabaseId,
                conf.appWritePostsLikedCollectionId, 
                [Query.equal(name,[value])]
                )
        } catch (error) {
            console.log("Appwrite server :: getLikedPost :: error", error);
            return false;
        }
    }

    async updatePost(
        documentId
        ,like
    ){
        
        try {
            return await this.database.updateDocument(conf.appWriteDatabaseId,
                conf.appWritePostsCollectionId, 
                documentId,
                {
                    Likes: like
                }
                )
        } catch (error) {
            console.log("Appwrite server :: updatePost :: error", error);
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
