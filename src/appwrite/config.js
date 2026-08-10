import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Permission, Role, Query } from "appwrite";

/**
 * Wraps Appwrite's TablesDB (posts) and Storage (featured images) APIs.
 * Every method returns `false` on failure instead of throwing, so callers
 * can just check truthiness rather than wrapping every call in try/catch.
 */
export class Service{
    client= new Client();
    tablesDB;
    storage;

    constructor(){
        this.client
                   .setEndpoint(conf.appwriteUrl)
                   .setProject(conf.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }


    // Posts use their slug as the Appwrite row ID, so lookups are by slug, not a separate numeric ID.
    async getPost(slug){
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug
            })
        } catch (error) {
           console.log("Appwrite service :: getPost() :: ", error);
            return false
        }
    }

    // Defaults to only 'active' posts (e.g. for public listings); pass [] to include drafts too.
    async getPosts(queries = [Query.equal('status','active')]){
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries: queries 
            })
        } catch (error) {
            console.log("Appwrite service :: getPosts() :: ", error);
            return false
        }
    }
    
    async createPost({title, slug, content, featuredImage, status, userId, userName}){
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {title, content, featuredImage, status, userId, userName}
            })
        } catch (error) {
            console.log("Appwrite service :: createPost() :: ", error);
            return false
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.tablesDB.updateRow({
               databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title, content, featuredImage, status 
                } 
            })
        } catch (error) {
            console.log("Appwrite service :: updatePost() :: ", error);
            return false
        }
    }

    async deletePost(slug){
        try {
             await this.tablesDB.deleteRow({
              databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug  
            })
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost() :: ", error);
            return false
        }
    }


    // --- Storage: featured images for posts ---

    async uploadFile(file){
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: ", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            })
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false
        }
    }

    // Returns a viewable URL for a stored image (used as post.featuredImage).
    async getFilePreview(fileId){
        try {
            return await this.storage.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
        } catch (error) {
            console.log("Appwrite service :: getFilePreview() :: ", error);
            return false
        }
    }
}

const configService = new Service();

export default configService;