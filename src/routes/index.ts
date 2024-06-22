import { getWelcomeMessage } from "../controllers";
import { getPermissions } from "../controllers/permission_controller";
import {
    getAllCheques,
    createCheque,
    getAllPendingChequesController,
    getAllChequesByCustomerIdController,
} from "../controllers/cheque_controller";
import {
    findAllWarehousesController,
    createWarehouseController,
    deleteWarehouseController,
    updateWarehouseController,
} from "../controllers/warehouse_controller";
import {
    createJobRoleController,
    getJobRolesController,
    updateJobRoleController,
    searchJobRolesByNameController,
    deleteJobRoleController,
} from "../controllers/job_role_controller";
import {
    getAllCompletedTripsController,
    getAllTrips,
    updateTrip,
} from "../controllers/trip_controller";
import {
    createProductController,
    deleteProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
} from "../controllers/product_controller";
import {
    createSupplierOrderRequestController,
    deleteSupplierOrderRequestController,
    getAllConfirmedSupplierOrderRequestsController,
    getAllSupplierOrderRequestsController,
    getSupplierOrderRequestByIdController,
    updateSupplierOrderRequestController,
    updateSupplierOrderRequestStatusController,
} from "../controllers/supplier_order_request_controller";
import {
    createSupplierOrderController,
    deleteSupplierOrderController,
    getAllSupplierOrdersController,
    updateSupplierOrderController,
} from "../controllers/supplier_order_model";
import {
    createEmployeeController,
    deleteEmployeeByIdController,
    getAllEmployeesController,
    getEmployeeByIdController,
    getEmployeesWithJobRoleDriverController,
    updateEmployeeByIdController,
} from "../controllers/employee_controller";
import {
    createCustomerController,
    customerLoginController,
    deleteCustomerController,
    getAllCustomersController,
    getCustomerByIdController,
    updateCustomerController,
} from "../controllers/customer_ontroller";
import {
    createUserController,
    forgotPasswordController,
    getAllUsersController,
    loginUserController,
} from "../controllers/user_controller";
import { authenticateToken } from "../util/authMiddleware";
import {
    createCustomerOrderRequestController,
    getAllCustomerOrderRequestsController,
    getConfirmedCustomerOrderRequestsController,
    getCustomerOrderRequestByIdController,
    getCustomerOrderRequestsByCustomerIdController,
    updateCustomerOrderRequestController,
    updateCustomerOrderRequestStatusController,
} from "../controllers/customer_order_request_controller";
import {
    createCustomerOrderController,
    getAllCustomerOrdersController,
    getCustomerOrderController,
    getCustomerOrdersByCustomerIdController,
    updateCustomerOrderStatusController,
} from "../controllers/customer_order_controller";
import {
    createCustomerPaymentController,
    deleteCustomerPaymentController,
    getAllCustomerPaymentByCustomerIdController,
    getAllCustomersPaymentsController,
    getCustomerPaymentByIdController,
    updateCustomerPaymentController,
} from "../controllers/customer_payment_controller";
import {
    createSupplierController,
    deleteSupplierController,
    getAllSuppliersController,
    getSupplierByIdController,
    updateSupplierController,
} from "../controllers/supplier_controller";
import {
    createSupplierPaymentController,
    deleteSupplierPaymentByIdController,
    getAllSupplierPaymentsController,
    getSupplierPaymentByIdController,
    updateSupplierPaymentByIdController,
} from "../controllers/supplier_payment_controller";
import {
    createVehicleController,
    deleteVehicleByIdController,
    findAllVehiclesController,
    getAllActiveVehicleLorriesController,
    updateVehicleController,
} from "../controllers/vehicle_controller";
import {
    createExpenses,
    getAllExpenses,
    updateExpenses,
} from "../controllers/expenses_controller";
import { getSummaryDetailsController } from "../controllers/dashboard_controller";

export const routes = (app) => {
    app.get("/", getWelcomeMessage);

    app.get("/summary-details", getSummaryDetailsController);

    // employee routing
    app.post("/customer", createCustomerController);
    app.get("/customers", getAllCustomersController);
    app.put("/customer/:id", updateCustomerController);
    app.get("/customer/:id", getCustomerByIdController);
    app.delete("/customer/:id", deleteCustomerController);

    app.get("/customerOrderRequests", getAllCustomerOrderRequestsController);
    app.get(
        "/customerOrderRequestsConfiremed",
        getConfirmedCustomerOrderRequestsController
    );
    app.post("/customerOrderRequest", createCustomerOrderRequestController);
    app.put("/customerOrderRequest/:id", updateCustomerOrderRequestController); // update full detail required
    app.put(
        "/customerOrderRequestStatus/:id",
        updateCustomerOrderRequestStatusController
    ); // update full detail required
    app.get("/customerOrderRequest/:id", getCustomerOrderRequestByIdController);
    app.delete(
        "/customerOrderRequest/:id",
        getCustomerOrderRequestByIdController
    );

    app.get("/customerOrders", getAllCustomerOrdersController);
    app.post("/customerOrder", createCustomerOrderController);
    app.put("/customerOrderStatus/:id", updateCustomerOrderStatusController); // update full detail required
    app.get("/customerOrderById/:id", getCustomerOrderController);
    // app.delete('customerOrder/:id', deleteCustomerOrderController); // should implement

    app.get("/customerPayments", getAllCustomersPaymentsController);
    app.post("/customerPayment", createCustomerPaymentController);
    app.put("/customerPayment/:id", updateCustomerPaymentController);
    app.get("/customerPayment/:id", getCustomerPaymentByIdController);
    app.delete("/customerPayment/:id", deleteCustomerPaymentController);

    app.get("/suppliers", getAllSuppliersController);
    app.post("/supplier", createSupplierController);
    app.put("/supplier/:id", updateSupplierController);
    app.get("/supplier/:id", getSupplierByIdController);
    app.delete("/supplier/:id", deleteSupplierController);

    app.get("/products", getAllProductsController);
    app.post("/product", createProductController);
    app.put("/product/:id", updateProductController);
    app.get("/product/:id", getProductByIdController);
    app.delete("/product/:id", deleteProductController);

    app.get("/supplierOrderRequests", getAllSupplierOrderRequestsController);
    app.get(
        "/supplierOrderRequests/confirmed",
        getAllConfirmedSupplierOrderRequestsController
    );
    app.post("/supplierOrderRequest", createSupplierOrderRequestController);
    app.put(
        "/supplierOrderRequest/status/:id",
        updateSupplierOrderRequestStatusController
    ); // update full detail required
    app.put("/supplierOrderRequest/:id", updateSupplierOrderRequestController);
    app.get("/supplierOrderRequest/:id", getSupplierOrderRequestByIdController);
    app.delete(
        "/supplierOrderRequestById/:id",
        deleteSupplierOrderRequestController
    );

    app.get("/supplierOrders", getAllSupplierOrdersController);
    app.post("/supplierOrder", createSupplierOrderController);
    app.put("/supplierOrder/:id", updateSupplierOrderController);
    app.get("/supplierOrder/:id", getSupplierByIdController);
    app.delete("/supplierOrder/:id", deleteSupplierOrderController);

    app.get("/supplierPayments", getAllSupplierPaymentsController);
    app.post("/supplierPayment", createSupplierPaymentController);
    app.put("/supplierPayment/:id", updateSupplierPaymentByIdController); //
    app.get("/supplierPayment/:id", getSupplierPaymentByIdController);
    app.delete("/supplierPayment/:id", deleteSupplierPaymentByIdController);

    app.get("/permissions", getPermissions);

    app.get("/vehicles", findAllVehiclesController);
    app.get("/vehicles/active-lorries", getAllActiveVehicleLorriesController);
    app.post("/vehicle", createVehicleController);
    app.put("/vehicle/:id", updateVehicleController); //
    app.get("/vehicle/:id", getSupplierPaymentByIdController);
    app.delete("/vehicle/:id", deleteVehicleByIdController);

    app.get("/employees", getAllEmployeesController);
    app.get("/employees/drivers", getEmployeesWithJobRoleDriverController); //getting drivers
    app.post("/employee", createEmployeeController);
    app.put("/employee/:id", updateEmployeeByIdController); //
    app.get("/employee/:id", getEmployeeByIdController);
    app.delete("/employee/:id", deleteEmployeeByIdController);

    app.get("/cheques", getAllCheques);
    app.get("/cheques/pending", getAllPendingChequesController);

    app.post("/cheque", createCheque);
    app.get("/warehouses", findAllWarehousesController);
    app.post("/warehouse", createWarehouseController);
    app.delete("/warehouse/:id", deleteWarehouseController);
    app.put("/warehouse/:id", updateWarehouseController);

    app.get("/jobRoles", getJobRolesController);
    app.post("/jobRole", createJobRoleController);
    app.put("/jobRole/:id", updateJobRoleController);
    app.delete("/jobRole/:id", deleteJobRoleController);
    app.get("/jobRole", searchJobRolesByNameController);

    app.get("/trips", getAllTrips);
    app.get("/trips/completed", getAllCompletedTripsController);
    app.put("/trip/:id", updateTrip);

    app.get("/trips", getAllTrips);
    app.get("/trips/completed", getAllCompletedTripsController);
    app.put("/trip/:id", updateTrip);

    app.get("/expenses", getAllExpenses);
    app.post("/expense", createExpenses);
    app.put("/expense/:id", updateExpenses);

    app.get("/products", getAllProductsController);
    app.get("/supplierOrderRequests", getAllSupplierOrderRequestsController);
    app.get("/supplierOrders", getAllSupplierOrdersController);
    app.post("/user", createUserController);
    app.get("/users", authenticateToken, getAllUsersController);

    app.post("/login", loginUserController);
    app.post("/forgot-password", forgotPasswordController);

    // customer portal
    app.post("/customer-login", customerLoginController);
    app.post("/customer-forgot-password", customerLoginController);

    app.get("/customerOrderRequestsById/:customerId", getCustomerOrderRequestsByCustomerIdController);
    app.get("/customerOrdersById/:customerId", getCustomerOrdersByCustomerIdController);
    app.get("/customerPaymentsById/:customerId", getAllCustomerPaymentByCustomerIdController);
    app.get("/customerChequesByCustomerId/:customerId", getAllChequesByCustomerIdController);

    // app.get("*", getWelcomeMessage);
};
