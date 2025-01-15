export interface Route {
    _id: string;
    route_name: string;
    start_location: string;
    end_location: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Driver {
    _id: string;
    name: string;
    email: string;
    phone: string;
    license_number: string;
    status: 'pending' | 'verified' | 'rejected';
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Ride {
    _id: string;
    route_id: string;
    driver_id: string;
    employee_id: string;
    start_time: string;
    end_time: string;
    status: 'booked' | 'ongoing' | 'completed' | 'cancelled';
    cost: number;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Complaint {
    _id: string;
    employee_id: string;
    route_id: string;
    complaint_text: string;
    status: 'pending' | 'resolved';
    created_at?: string;
    updated_at?: string;
  }
  
  export interface SpendingTrend {
    month: string;
    amount: number;
  }
  
  export interface RideStats {
    total_rides: number;
    completed_rides: number;
    cancelled_rides: number;
    total_spend: number;
    average_cost: number;
  }