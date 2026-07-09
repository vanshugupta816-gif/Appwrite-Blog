import Conf from "../conf/conf";
import {Client, Account, ID} from "Appwrite"

export class AuthService{
    
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(Conf.appWriteUrl)
        .setProject(Conf.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),  
                email,
                password,
                name
            })

            if (userAccount) {
                return await this.loginUser({email,password});
            } else {
                return userAccount; // this can be null so remember to handle it. 
            }
        } catch (error) {
            console.log("Appwrite AuthService :: createAccount :: error: " , error);
            throw error;
        }
    }

    async loginUser({email, password}){
        try {
            return await this.account.createEmailPasswordSession({email,password});
        } catch (error) {
            console.log("Appwrite AuthService :: loginUser :: error: " , error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite AuthService :: getCurrentUser :: error: " , error);
            return null;
        }
    }

    async logoutUser(){
        try {
            await this.account.deleteSessions(); // it will logout the user from all different devices...
            return true;
        } catch (error) {
            console.log("Appwrite AuthService :: logoutUser :: error: " , error);
            return false;
        }
    }

};

const authService = new AuthService();

export default authService;