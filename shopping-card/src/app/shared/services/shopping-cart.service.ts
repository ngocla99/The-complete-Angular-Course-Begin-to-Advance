import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
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

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.collection('shopping-carts').doc(cartId).valueChanges();
  }

  private getItem(cartId: string, productId: any) {
    return this.db
      .collection('shopping-carts')
      .doc(cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.id);

    return result.id;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    console.log(cartId, product.id);
    let item$ = this.getItem(cartId, product.id);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) item$.update({ quantity: item.quantity + 1 });
        else item$.set({ product: product, quantity: 1 });
      });
  }
}
