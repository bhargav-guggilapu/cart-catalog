import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  itemAdded = new Subject<{ item: string; cost: number; name: string }[]>();
  editItemStarted = new Subject<number>();

  items = [
    { item: 'Apple', cost: 10, name: 'Arya' },
    { item: 'Banana', cost: 32, name: 'Bhargav' },
    { item: 'Carrrot', cost: 20, name: 'Mani' },
    { item: 'Apple', cost: 10, name: 'Arya' },
    { item: 'Banana', cost: 32, name: 'Bhargav' },
    { item: 'Carrrot', cost: 20, name: 'Mani' },
    { item: 'Apple', cost: 10, name: 'Arya' },
    { item: 'Banana', cost: 32, name: 'Bhargav' },
    { item: 'Carrrot', cost: 20, name: 'Mani' },
  ];

  getItems() {
    return [...this.items];
  }

  getItem(index: number) {
    return this.items[index];
  }

  setItem(item: { item: string; cost: number; name: string }) {
    this.items.push(item);
    this.itemAdded.next([...this.items]);
  }

  updateItem(
    index: number,
    item: { item: string; cost: number; name: string }
  ) {
    this.items[index] = item;
    this.itemAdded.next([...this.items]);
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.itemAdded.next([...this.items]);
  }

  constructor() {}
}
