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

    // Sends a recovery email with a link back to `${origin}/reset-password`.
    // Appwrite appends userId and secret as query params to that URL — the
    // secret is valid for 1 hour and is what resetPassword() below consumes.
    async forgotPassword(email){
        try {
            return await this.account.createRecovery({
                email: email,
                url: `${window.location.origin}/reset-password`
            })
        } catch (error) {
            throw error
        }
    }

    // Completes the recovery flow: userId/secret come from the reset-password
    // page's URL query params (see forgotPassword above).
    async resetPassword({userId, secret, password}){
        try {
            return await this.account.updateRecovery({
                userId: userId,
                secret: secret,
                password: password
            })
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;