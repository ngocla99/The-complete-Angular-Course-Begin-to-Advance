import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  create(product: any) {
    return this.db.collection('products').add(product);
  }

  getAll() {
    return this.db
      .collection('products')
      .snapshotChanges()
      .pipe(
        map((response: any[]) =>
          response.map((data, i) => {
            return {
              position: i + 1,
              id: data.payload.doc.id,
              ...data.payload.doc.data(),
            };
          })
        )
      );
  }

  get(productId: string) {
    return this.db.collection('products').doc(productId).valueChanges();
  }

  update(productId: string, product: any) {
    return this.db.collection('products').doc(productId).update(product);
  }

  delete(productId: string) {
    return this.db.collection('products').doc(productId).delete();
  }
}
