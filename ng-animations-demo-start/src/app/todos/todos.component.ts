import {
  animate,
  animateChild,
  group,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { bounceOutLeftAnimation, fadeInAnimation } from '../animations';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('h1', [
            style({ transform: 'translateY(-20px)' }),
            animate(2000),
          ]),
          query('@todoAnimation', stagger(200, animateChild())),
        ]),
      ]),
    ]),

    trigger('todoAnimation', [
      transition(':enter', useAnimation(fadeInAnimation)),

      transition(':leave', [
        style({ backgroundColor: 'red' }),
        animate(1000),
        useAnimation(bounceOutLeftAnimation),
      ]),
    ]),
  ],
})
export class TodosComponent implements OnInit {
  items: any[] = [
    'Wash the dishes',
    'Call the accountant',
    'Apply for a car insurance',
  ];
  constructor() {}

  ngOnInit(): void {}

  addItem(input: HTMLInputElement) {
    this.items.splice(0, 0, input.value);
    input.value = '';
  }

  removeItem(item: string) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  animationStarted($event: any) {
    console.log($event);
  }
  animationDone($event: any) {
    console.log($event);
  }
}
