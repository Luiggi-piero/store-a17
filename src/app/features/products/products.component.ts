import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  template: `
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-4 mx-auto">
        <div class="flex flex-wrap -m-4">
          @for (product of products(); track $index) {
            <app-card 
              (addToCartEvent)="onAddToCart($event)"
              class="w-full p-4 lg:w-1/4 md:w-1/2" 
              [product]=product 
            />
          }
        </div>
    </div>
  </section>
  `,
  styleUrl: './products.component.scss'
})
export default class ProductsComponent {
  private readonly producSvc = inject(ProductService);
  products = this.producSvc.products; // solo para mostrar los productos
  cartStore = inject(CartStore); // para modificar el carrito

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }
}
