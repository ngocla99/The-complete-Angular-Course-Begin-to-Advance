import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() showAction!: boolean;
  @Input('shopping-cart') shoppingCart!: any;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    // let item = this.shoppingCart.items[this.product.id];
    let item;
    return item ? item : 0;
    // return 0;
  }
}
