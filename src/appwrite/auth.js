import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

/** Wraps Appwrite's Account API for signup/login/logout/session lookup. */
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create({
                        userId: ID.unique(),
                        email: email,
                        password: password,
                        name: name
    });
        if(userAccount){
            // Account creation doesn't start a session, so log in immediately after.
            return this.login(email,password)
        }
        else {
            return userAccount;
        }

        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
            const result = await this.account.createEmailPasswordSession({
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
            await this.account.deleteSession({ sessionId: 'current'});
        } catch (error) {
            console.log("Appwrite service :: logout() :: ", error);
        }
    }
}

const authService = new AuthService();

export default authService;