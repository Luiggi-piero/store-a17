import { HttpClient } from "@angular/common/http";
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from "@envs/environment";
// import { environment } from "environments/environment.development";
import { Product } from "@shared/models/product.interface";
import { map, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService {
    public products = signal<Product[]>([])
    private readonly _http = inject(HttpClient);
    private readonly _endPoint = environment.apiUrl;
    private readonly _injector = inject(EnvironmentInjector);

    constructor() {
        this.getProducts();
    }

    public getProducts(): void {
        this._http.get<Product[]>(`${this._endPoint}/products?sort=desc`)
            .pipe(
                map(
                    (products: Product[]) =>
                        products.map(
                            (product: Product) => ({ ...product, qty: 1 })
                        )
                ),
                tap((products: Product[]) => this.products.set(products))
            )
            .subscribe()
    }

    public getProductById(id: number) {
        const product$ = this._http.get<Product>(`${this._endPoint}/products/${id}`);
        // Convertir un observable a signal
        // return toSignal(product$)

        // runInInjectionContext: ejecuta una funcion(2do parametro) en el contexto del inyector(_injector)
        return runInInjectionContext(this._injector, () => toSignal<Product>(product$))
    }
}