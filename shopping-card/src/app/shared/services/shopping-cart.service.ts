import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFirestore) {}

  private create() {
    return this.db
      .collection('shopping-carts')
      .add({ dateCreated: new Date().getTime() });
  }

  private getCart(cartId: string) {
    return this.db.collection('shopping-carts').doc(cartId).valueChanges();
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.id);

    return result.id;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCart();

    let item$ = this.db.collection('shopping-carts').doc(cartId);

    item$.take(1).subscribe(item);
  }
}
