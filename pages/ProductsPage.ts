const { I } = inject();

export const ProductsPage = {

    AddToCart(productName: string) {
        I.click(`button[data-test="add-to-cart-${productName}"]`);
    }

}