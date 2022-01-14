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
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {}
}
