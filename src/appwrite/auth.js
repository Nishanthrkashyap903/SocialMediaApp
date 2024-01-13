import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        
        this.account=new Account(this.client);
    }
    async createAccount({emailAddress,password,fullName}){
        try{
            const newAccount=await this.account.create(ID.unique(),emailAddress,password,fullName);
            console.log("newAccount",newAccount);
            if(newAccount){
                return this.login({emailAddress,password});
            }
            else{
                return newAccount;
            }
        }
        catch(error)
        {
            console.log('appwrite::createAccount::error',error);
        }
    }
    async login({emailAddress,password}){
        console.log(emailAddress,password)
        try {
            return await this.account.createEmailSession(emailAddress,password)
        } 
        catch (error) {
            console.log('appwrite::login::error',error);
        }
        return null;
    }

    async getUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log('appwrite:: getUser::error',error);
        }
        return null;
    }
    async logout(){
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log('appwrite:: logout::error',error);
        }
    }
}

const authService=new AuthService();
export default authService;
