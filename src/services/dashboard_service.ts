import {
    calculateAllCustomerOrdersNetTotal,
    calculateExpensesTotals,
    countCustomerOrderRequests,
    countCustomerOrders,
    countCustomers,
    countEmployees,
    countSupplierOrderRequests,
    countSupplierOrders,
    countSuppliers,
    countVehicles,
    findWarehousesWithStockDetails,
    getTotalOutstandingAmount,
    getTotalOutstandingAmountForSuppliers,
} from "../data-access/Dashboard_repo";

export const getSummaryDetailsService = async () => {
    // Calculate revenue by awaiting the result of calculateAllCustomerOrdersNetTotal
    const revenue = await calculateAllCustomerOrdersNetTotal(); // Ensure this is awaited

    // Example calculations for other metrics (you'll need to implement these)
    // const expenses =...;
    const expenses = await calculateExpensesTotals();
    // const debit =...;
    const debit = await getTotalOutstandingAmount();
    const credit = await getTotalOutstandingAmountForSuppliers(); // const credit =...;
    const customers = await countCustomers(); // const customersCount =...;
    const suppliers = await countSuppliers(); // const suppliersCount =...;
    const employees = await countEmployees(); // const employeesCount =...;
    const vehicles = await countVehicles(); // const vehiclesCount =...;
    const customerOrderRequests = await countCustomerOrderRequests(); // const vehiclesCount =...;
    const customerOrders = await countCustomerOrders(); // const vehiclesCount =...;
    const supplierOrderRequests = await countSupplierOrderRequests(); // const vehiclesCount =...;
    const supplierOrders = await countSupplierOrders(); // const vehiclesCount =...;
    const warehouses = await findWarehousesWithStockDetails();

    // Create the payload with the calculated revenue
    const payload = {
        revenue: revenue,
        expenses: expenses,
        debit: debit,
        credit: credit,
        customers: customers,
        suppliers: suppliers,
        employees: employees,
        vehicles: vehicles,
        customerOrderRequests: customerOrderRequests,
        customerOrders: customerOrders,
        supplierOrderRequests: supplierOrderRequests,
        supplierOrders: supplierOrders,
        warehouseDetails: warehouses,
    };

    return payload;
};
