export interface Subscription {
    id: number;
    code: string;
    subscriberId: number;
    price: number;
    discountValue: number;
    startDate: string;
    endDate: string;
    isDeleted: boolean;
}