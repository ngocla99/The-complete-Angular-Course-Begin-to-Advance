import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFirestore) {}

  getCategories() {
    return this.db
      .collection('categories', (query) => query.orderBy('name'))
      .snapshotChanges();
  }
}
