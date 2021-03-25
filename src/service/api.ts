
import jsonData from '../constant/data.json';
import { Pagination, TransactionItem } from '../types/transaction';

export const getTransactions = (perPage: number, current: number) => {
    return new Promise<Pagination>((resolve, reject) => {
        setTimeout(() => {
            let transactions: TransactionItem[] = jsonData.slice(perPage * (current-1), perPage * current);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            // eslint-disable-next-line array-callback-return
            const data: Pagination = {
                pageSize: perPage,
                current: current,
                total: jsonData.length,
                rows: transactions
            }
            resolve(data);
        }, 200);
    });
};

export const addTransaction = (item: TransactionItem) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 200);
    })
}