let stripe = Stripe("pk_test_N2Kfa6ezxQc8rld0adGzibAV00OLGaocEP");

// Basic Checkout
async function startCheckout() {
    console.log("checkout started");
    const { error } = await stripe.redirectToCheckout({
        items: [{ sku, quantity: 1 }],

        successUrl: "https://localhost:5000/success",
        cancelUrl: "https://localhost:5000/error"
    });

    if (error) {
        alert("our payment system is broken!");
    }
}
