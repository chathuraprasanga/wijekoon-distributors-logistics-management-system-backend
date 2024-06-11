import bunyan from "bunyan";

export const log = bunyan.createLogger({
    name: `wijekoon-distributors-api-server-${process.env.env ? process.env.env : "DEV"}`,
});
