import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export default class DetailsComponent implements OnInit {
  // @Input({ alias: 'id' }) productId!: number;
  productId = input<number>(0, { alias: 'id' });

  product!: Signal<Product | undefined>;
  private readonly productsSvc = inject(ProductService);
  private readonly _sanitizer = inject(DomSanitizer);
  cartStore = inject(CartStore); // para modificar el carrito
  starsArray: number[] = new Array(5).fill(0);

  ngOnInit(): void {
    this.product = this.productsSvc.getProductById(this.productId())
  }

  onAddToCart(): void {  
    this.cartStore.addToCart(this.product() as Product)
  }

  generateSVG(index: number): SafeHtml {
    let svgContet = null;
    const rate = this.product()?.rating.rate as number;

    if (index + 1 <= Math.floor(rate)) { // lleno
      svgContet = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#eab308" d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"/></svg>
      `;
    } else if (index < rate) { // mitad
      svgContet = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#eab308" d="m12 14.925l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"/></svg>
      `;
    } else { //vacio
      svgContet = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#eab308" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25"/></svg>
      `;
    }

    return this._sanitizer.bypassSecurityTrustHtml(svgContet);
  }

}
