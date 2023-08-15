export interface DailyLog {
    id: number;
    code: string;
    subscriptionId: number;
    checkInTime: string;
    checkOutTime: string;
    price: number;
    isDeleted: boolean;
    
  }