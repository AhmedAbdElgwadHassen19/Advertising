import { Client ,Account} from 'appwrite';

const client = new Client ()
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('6740917d00137fbe1a47')

export const account = new Account

export default {client, account }