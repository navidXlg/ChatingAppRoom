import { Client, Databases, Account } from 'appwrite';
export const PROJECT_ID = "6536f6e72dd1c96d12f7";
export const DATABASE_ID = "65375dde7539817d1fcc";
export const COLLECTION_ID = "65375e1e57200d6c2a9a"



const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);


export const account = new Account(client);
export const databases = new Databases(client);
export default client;
