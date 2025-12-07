const { I } = inject();

export const CartPage = {

    DeleteFromCart(productName: string) {
        I.click(`button[data-test="remove-${productName}"]`);
    },

    DeleteFromCartByIndex(index: number) {
        I.click(`(//button[contains(@data-test, "remove-")])[${index}]`);
    }
}