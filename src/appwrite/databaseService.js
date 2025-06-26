import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // async createPost({title, slug, content, featuredImage, status, userId}){
    //     try {
    //         return await this.databases.createDocument(
    //             conf.appwriteDatabaseid,
    //             conf.appwriteCollectionid,
    //             slug,
    //             {
    //                 title,
    //                 content,
    //                 featuredImage,
    //                 status,
    //                 userId,
    //             }
    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: createPost :: error", error);
    //     }
    // }

    async createPost({title, postImage ,userId,userName}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                ID.unique(),
                {
                    title,
                    postImage,
                    userId,
                    userName
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    // async updatePost(slug, {title, content, featuredImage, status}){
    //     try {
    //         return await this.databases.updateDocument(
    //             conf.appwriteDatabaseid,
    //             conf.appwriteCollectionid,
    //             slug,
    //             {
    //                 title,
    //                 content,
    //                 featuredImage,
    //                 status,

    //             }
    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: updatePost :: error", error);
    //     }
    // }
    async updatePost(prePostID,{title,postImage,userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                prePostID,
                {
                    title,
                    postImage,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    // async deletePost(slug){
    //     try {
    //         await this.databases.deleteDocument(
    //             conf.appwriteDatabaseid,
    //             conf.appwriteCollectionid,
    //             slug
            
    //         )
    //         return true
    //     } catch (error) {
    //         console.log("Appwrite serive :: deletePost :: error", error);
    //         return false
    //     }
    // }
    async deletePost(postid){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                postid
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }
    
    // async getPost(slug){
    //     try {
    //         return await this.databases.getDocument(
    //             conf.appwriteDatabaseid,
    //             conf.appwriteCollectionid,
    //             slug
    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: getPost :: error", error);
    //         return false
    //     }
    // }

    async getPost(urlId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                urlId
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    // async getPosts(queries = [Query.equal("status", "active")]){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseid,
    //             conf.appwriteCollectionid,
    //             queries,
    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: getPosts :: error", error);
    //         return false
    //     }
    // }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteStorageid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteStorageid,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    // getFilePreview(fileId){
    //     return this.bucket.getFilePreview(
    //         conf.appwriteStorageid,
    //         fileId
    //     )
    // }
    
    getFileview(fileId){
        return this.bucket.getFileView(
            conf.appwriteStorageid,
            fileId
        )
    }
}


const dbservice = new DatabaseService()
export default dbservice