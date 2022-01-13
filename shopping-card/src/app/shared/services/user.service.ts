import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as auth from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  save(user: auth.UserInfo) {
    this.db
      .collection('users')
      .doc(user.uid)
      .update({
        name: user.displayName,
        email: user.email,
      })
      .then(() => {
        console.log('user saved successfully');
      })
      .catch((reason: any) => console.log('user save failed:', reason));
  }

  get(uid: string) {
    return this.db.collection('users').doc(uid);
  }
}
