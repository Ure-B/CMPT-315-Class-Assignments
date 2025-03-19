// This function summarizes the given orders into readable summary objects.
function summarizeOrders(orders) {
    return orders.map(({id, customer, products}) => {
        const {totalAmount, categories} = products.reduce((total, { category, price, quantity }) => {
                total.totalAmount += price * quantity;
                total.categories[category] = (total.categories[category] || 0) + quantity;
                return total;
            },
            { totalAmount: 0, categories: {} }
        );

        return {
            orderId: id,
            customer,
            totalAmount,
            categories,
        };
    });
}

// This is the main testing function
function main() {
    const orders = [
        {
         id: 101, customer: "Alice",
         products: [
         { name: "Laptop", category: "Electronics", price: 1200, quantity: 1 },
         { name: "Mouse", category: "Electronics", price: 25, quantity: 2 },
         { name: "Notebook", category: "Stationery", price: 5, quantity: 5 } ]
        },
        {
         id: 102, customer: "Bob",
         products: [
         { name: "T-shirt", category: "Clothing", price: 20, quantity: 3 },
         { name: "Jeans", category: "Clothing", price: 40, quantity: 1 },
         { name: "Cap", category: "Accessories", price: 15, quantity: 2 } ]
        }
    ];

    let summary = summarizeOrders(orders);
    console.log(summary);
}

main();