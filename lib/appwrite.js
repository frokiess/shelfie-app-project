import { Client, Account, Avatars, Databases } from 'appwrite';

export const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69164a22000f379b6554')

export const account = new Account(client)
export const avatars = new Avatars(client) 
export const databases = new Databases(client)

