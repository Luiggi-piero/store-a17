import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "@shared/models/product.interface";
import { ToastrService } from "ngx-toastr";

export interface CartStore {
    products: Product[];
    totalAmount: number;
    productsCount: number;
}

const initialState: CartStore = {
    products: [],
    totalAmount: 0,
    productsCount: 0
}

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    // acciones que se realizan luego de que ocurre un cambio en el state
    // las acciones: calcular totalAmount y productsCount
    withComputed(({ products }) => ({
        productsCount: computed(() => calculateProductCount(products())),
        totalAmount: computed(() => calculateTotalAmount(products()))
    })),

    // metodos para modificar el store/estado
    withMethods(
        ({ products, ...store }, toastrSvc = inject(ToastrService)) => ({
            addToCart(product: Product) {
                const isProductInCart = products().find((item: Product) => item.id === product.id);
                
                if (isProductInCart) {
                    isProductInCart.qty++;
                    isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price;
                    patchState(store, { products: [...products()] });
                } else {
                    patchState(store, { products: [...products(), product] })
                }

                toastrSvc.success('Producto agregado', 'STORE Angular 17');
            },
            removeFromCart(id: number) {
                const updatedProducts = products().filter(product => product.id !== id);
                patchState(store, { products: updatedProducts });
                toastrSvc.info('Producto eliminado', 'STORE Angular 17');
            },
            clearCart() {
                patchState(store, initialState);
                toastrSvc.info('Carrito eliminado', 'STORE Angular 17');
            }
        })
    )
)

function calculateTotalAmount(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price * product.qty, 0)
}

function calculateProductCount(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.qty, 0)
}