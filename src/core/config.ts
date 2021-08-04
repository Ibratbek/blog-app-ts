import { config } from "dotenv";
config();


export const PAGINATION = {
    limit: +process.env.PAGINATION_LIMIT || 10,
    order: +process.env.PAGINATION_ORDER || 0,
}