// This function groups the sales in salesRecords by region and then computes their average sales using a helper function
function regionalSalesSummary(salesRecords) {
    summary = salesRecords.reduce((acc, { region, salesperson, salesAmount }) => {
        if (!acc[region]) {
          acc[region] = { totalSales: 0, salespeople: new Set(), sales: 0 };
        }
        
        acc[region].totalSales += salesAmount;
        acc[region].salespeople.add(salesperson);
        acc[region].sales++;
        return acc;
    }, {});

    result = formatSalesSummary(summary);
    return result;
}
  
// This function converts the summary set to an array and computes its average sales
function formatSalesSummary(summary) {
    return Object.entries(summary).map(([region, data]) => ({
      region,
      totalSales: data.totalSales,
      averageSales: data.totalSales / data.sales,
      salespeople: [...data.salespeople],
    }));
};

// This is the main testing function
function main() {
    const salesRecords = [
        { region: "North", salesperson: "John", salesAmount: 5000, date: "2024-01-15" },
        { region: "South", salesperson: "Alice", salesAmount: 7000, date: "2024-01-20" },
        { region: "North", salesperson: "John", salesAmount: 3000, date: "2024-02-10" },
        { region: "North", salesperson: "Doe", salesAmount: 4000, date: "2024-03-05" }
    ];
      
    let result = regionalSalesSummary(salesRecords);
    console.log(result);
}

main();