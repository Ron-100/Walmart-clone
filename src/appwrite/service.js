import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'

class Service {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid)
        this.account = new Account(this.client)
    }

    async signup({name,email,password}){
        try {
            return await this.account.create(ID.unique(), email , password, name)
        } catch (error) {
            console.log(` The problem in signup ${error} `)
            throw error
        } 
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            console.log(` The problem in login ${error} `)
            throw error
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log(` The problem in logout ${error} `)
            throw error
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            // console.log(` The problem in getCurrentUser ${error} `)
            // throw error
            if (error) {
                null
            }            
        }
    }

    async createJWT() {
        try {
            return await this.account.createJWT();
        } catch (error) {
            console.log(` The problem in createJWT ${error} `)
            throw error;
        }
    }

}


const service = new Service();

export default service;