import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFirestore) {}

  getAll() {
    return this.db
      .collection('categories', (query) => query.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map((response: any[]) =>
          response.map((data) => {
            return {
              id: data.payload.doc.id,
              ...data.payload.doc.data(),
            };
          })
        )
      );
  }
}
