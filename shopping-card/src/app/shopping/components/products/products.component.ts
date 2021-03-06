import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription!: Subscription;

  categoryId!: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.subscription = this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return this.route.queryParams;
        })
      )
      .subscribe((params) => {
        this.categoryId = params['category'];

        this.filteredProducts = this.categoryId
          ? this.products.filter(
              (product) => product.category === this.categoryId
            )
          : this.products;
      });

    (await this.shoppingCartService.getCart()).subscribe((cart) => {
      console.log(cart);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
