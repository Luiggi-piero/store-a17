import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  // @Input({required: true})   product: Product;
  product = input.required<Product>(); // este input es una signal

  @Output() addToCartEvent = new EventEmitter<Product>();

  onAddToCart(): void{
    this.addToCartEvent.emit(this.product())
  }
}
