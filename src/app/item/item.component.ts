import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit, OnDestroy {
  items: { item: string; cost: number; name: string }[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.subscription = this.itemService.itemAdded.subscribe(
      (items: { item: string; cost: number; name: string }[]) => {
        this.items = items;
      }
    );
  }

  onEditItem(index: number) {
    console.log('cklic');
    this.itemService.editItemStarted.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
