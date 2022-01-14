import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css'],
})
export class ProductsFilterComponent implements OnInit {
  categories$!: Observable<any>;
  @Input() categoryId!: string;
  constructor(private categoriesService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();
  }
}
