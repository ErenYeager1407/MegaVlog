import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // src/appwrite/config.js

// In src/appwrite/config.js

// Change this function
async createPost({title, slug, content, featuredImage, status, userid}){
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            ID.unique(), // Use a unique ID instead of slug
            {
                title,
                content,
                featuredImage,
                status,
                userid,
                slug // Add slug as a field
            }
        )
    } catch (error) {
        console.log("Appwrite service :: createPost :: error", error);
    }
}

// In src/appwrite/config.js

async updatePost(postId, {title, slug, content, featuredImage, status}){ // postId is the unique ID now
    console.log("Data received by updatePost service:", {title, slug, content});
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            postId, // Find document by its real ID
            {
                title,
                content,
                featuredImage,
                status,
                slug, // Update the slug field
            }
        )
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error", error);
    }
}

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

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
                conf.appwriteBucketId,
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
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
    // Change the method from getFilePreview to getFileView
    return this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId
    );
}
}


const service = new Service()
export default service