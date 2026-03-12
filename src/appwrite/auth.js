import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint(URL)
            .setProject(conf.appwriteProjectId); // Your project ID
        this.account = new Account(this.client);
    }

    async createAccount(email,password,name){
        try {
            const userAccount = await this.account.create({
                        userId: ID.unique(),
                        email: email,
                        password: password,
                        name: name
    });
        if(userAccount){
            // calls another method 
            return this.login(email,password)
        }
        else {
            return userAccount;
        }

        } catch (error) {
            throw error
        }
    }

    async login(email,password){
        try {
            const result = await account.createEmailPasswordSession({
                            email: email,
                            password: password
    });
        return result;
    } 
        catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error);
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSession({ sessionId: 'current'}); // simple logout, review doc later
        } catch (error) {
            console.log("Appwrite service :: logout() :: ", error);
        }
    }
}

const authService = new AuthService();

export default authService;