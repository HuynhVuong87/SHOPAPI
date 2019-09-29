
import * as admin from 'firebase-admin';
import { users } from './users/routes-config';
import { invoice } from './invoice/routes-config';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const usersApi = users();
export const invoiceApi = invoice();
