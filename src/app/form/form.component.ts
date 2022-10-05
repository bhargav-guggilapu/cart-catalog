import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  editing = false;
  editedItemIndex: number = 0;
  editedItem: { item: string; cost: number; name: string };

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.subscription = this.itemService.editItemStarted.subscribe((index) => {
      this.editing = true;
      this.editedItemIndex = index;
      this.editedItem = this.itemService.getItem(index);
      this.form.setValue({
        item: this.editedItem.item,
        cost: this.editedItem.cost,
        name: this.editedItem.name,
      });
    });
  }

  onAddItem(formData: NgForm) {
    const itemData = formData.value;
    if (this.editing) {
      this.itemService.updateItem(this.editedItemIndex, itemData);
    } else {
      this.itemService.setItem(itemData);
    }
    formData.reset();
    this.editing = false;
  }

  onClear() {
    this.form.reset();
    this.editing = false;
  }

  onDelete() {
    this.itemService.deleteItem(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
