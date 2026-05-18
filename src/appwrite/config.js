import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Permission, Role, Query } from "appwrite";

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


    async getPost(slug){
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,    //conf.tableId,
                rowId: slug // review later, related to userId which is ID.unique()
            })
        } catch (error) {
           console.log("Appwrite service :: getPost() :: ", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal('status','active')]){ // Default parameter used here
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
    
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {title, content, featuredImage, status, userId}
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


    // Storage Services

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

// async getFileView(fileId){
//         try {
//             console.log("Try Appwrite service :: getFileView() :: ", fileId)
//             //  return await this.storage.getFilePreview(
//             //     conf.appwriteBucketId,
//             //     fileId,
//             // )
//             console.log(await this.storage.getFileView({
//                 bucketId: conf.appwriteBucketId,
//                 fileId: fileId,
//             }));
            
//             return await this.storage.getFileView({
//                 bucketId: conf.appwriteBucketId,
//                 fileId: fileId,
//             })
//         } catch (error) {
//             console.log("Catch Appwrite service :: getFileView() :: ", error);
//             return false
//         }
//     }
   

    
    async getFilePreview(fileId){
        try {
            console.log("Appwrite service :: getFilePreview() :: ", fileId)
            //  return await this.storage.getFilePreview(
            //     conf.appwriteBucketId,
            //     fileId,
            // )
            console.log(await this.storage.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            }));
            
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








// const client = new Client()
//     .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<YOUR_PROJECT_ID>'); // Your project ID

// const tablesDB = new TablesDB(client);

// const result = await tablesDB.getRow({
//     databaseId: conf.appwriteDatabaseId, //'<DATABASE_ID>',
//     tableId: conf.appwriteTableId, //'<TABLE_ID>',
//     rowId: ,  //'<ROW_ID>',
//     queries: [], // optional
//     transactionId:conf.  //'<TRANSACTION_ID>' // optional
// });