import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  create(product: any) {
    return this.db.collection('products').add(product);
  }

  getAll() {
    return this.db.collection('products').snapshotChanges();
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
