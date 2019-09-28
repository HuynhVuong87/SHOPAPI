
import * as admin from 'firebase-admin';
import { users } from './users/routes-config';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const api = users();
