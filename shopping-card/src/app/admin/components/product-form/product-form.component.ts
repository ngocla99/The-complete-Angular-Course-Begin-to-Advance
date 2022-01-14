import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$!: Observable<any>;
  product: any = {};
  id!: string;
  constructor(
    private categoriesService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();

    this.id = this.route.snapshot.params['id'];
    if (this.id)
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((product) => {
          this.product = product;
        });
  }

  onSave(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  onDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);

    this.router.navigate(['/admin/products']);
  }
}
