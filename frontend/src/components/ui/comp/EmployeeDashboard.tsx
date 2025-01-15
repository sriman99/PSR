//%%%%%%%%%%%%%%##############################################

import { useState, useEffect } from 'react';
import { EditRideDialog } from './EditRideDialoc'; // Add this line to import the EditRideDialog component
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserNav } from './admincomp/UserNav';
import { Search } from './admincomp/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import {
  MapPin,
  Car,
  AlertCircle,
  Users,
  Activity,
  Calendar as CalendarIcon,
  Plus,
  DollarSign,
  TrendingUp,
  Clock,
  MapPinned,
  PhoneCall,
  Mail,
  CreditCard,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronRight,
  PieChart,
  LineChart as LineChartIcon,
  Component
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Ensure this import is at the top of the file
import { DriverDetailsDialog } from './DriverDetailsDialog';

const API_URL = 'http://localhost:8000';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface RideCreate {
  Ride_name: string;
  start_location: string;
  start_time: string;
  end_location: string;
  end_time: string;
  ride_discription: string;
  available_seats: number;
  cost: number;
  booked_by?: { employee_id: string; employee_name: string }[];
  
}
interface RideData {
  _id: string;
  Employee_Id: string;
  created_by: string;
  Ride_name: string;
  start_location: string;
  start_time: string;
  end_location: string;
  end_time: string;
  available_seats: number;
  cost: number;
  status: string;
  ride_discription: string;
  booked_by: { employee_id: string; employee_name: string }[];
}

export const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [newRideData, setNewRideData] = useState<RideData[]>([]);
  const [newRide, setNewRide] = useState<RideCreate>({
    Ride_name: '',
    start_location: '',
    start_time: '',
    end_location: '',
    end_time: '',
    ride_discription: '',
    available_seats: 0,
    cost: 0
  });
  // const [routes, setRoutes] = useState<{ _id: string, route_name: string, start_location: string, end_location: string, created_at: string }[]>([]);
  // const [rides, setRides] = useState<{ _id: string, route_id: string, driver_id: string, start_time: string, end_time: string, status: string, cost: number }[]>([]);
  const [rides,setRides] = useState<RideCreate[]>([]);
  const [availableRides, setAvailableRides] = useState<RideCreate[]>([]);
  const [availableDrivers, setAvailableDrivers] = useState<{ _id: string, name: string }[]>([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(Date.now() + 3600000));
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState<{
    totalRides: number;
    completedRides: number;
    totalSpend: number;
    averageCost: number;
    monthlySpending: { month: string; amount: number }[];
  }>({
    totalRides: 0,
    completedRides: 0,
    totalSpend: 0,
    averageCost: 0,
    monthlySpending: []
  });

  // Form states
  const [driverForm, setDriverForm] = useState({
    name: '',
    email: '',
    phone: '',
    license_number: ''
  });

  const [complaintForm, setComplaintForm] = useState({
    route_id: '',
    complaint_text: ''
  });

  // Loading states
  const [isLoading, setIsLoading] = useState({
    data: false,
    bookRide: false,
    submitDriver: false,
    submitComplaint: false
  });

    // Add loading state for initial data fetch
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Previous state declarations remain the same...
  
    // Add error state
    const [error, setError] = useState<string | null>(null);

    const fetchAvailableRides = async () => {
      try {
        const response = await fetch(`${API_URL}/get-avilable-rides`);
        const data = await response.json();
        setAvailableRides(data.available_rides);
      } catch (error) {
        console.error('Error fetching available rides:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch available rides"
        });
      }
    };

  const fetchData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, data: true }));
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [ridesRes, driversRes] = await Promise.all([
        // axios.get(`${API_URL}/employee/routes`, { headers }),
        axios.get(`${API_URL}/employee/rides`, { headers }),
        axios.get(`${API_URL}/employee/available-drivers`, { headers })
      ]);

      // setRoutes((routesRes.data as { routes: { _id: string, route_name: string, start_location: string, end_location: string, created_at: string }[] }).routes);
      setRides((ridesRes.data as { rides: { _id: string, route_id: string, driver_id: string, start_time: string, end_time: string, status: string, cost: number }[] }).rides.map(ride => ({
        Ride_name: ride.route_id, // Assuming route_id can be used as Ride_name
        start_location: '', // Provide appropriate value
        start_time: ride.start_time,
        end_location: '', // Provide appropriate value
        end_time: ride.end_time,
        ride_discription: '', // Provide appropriate value
        available_seats: 0, // Provide appropriate value
        cost: ride.cost
      })));
      setAvailableDrivers((driversRes.data as { available_drivers: { _id: string, name: string }[] }).available_drivers);

      // Calculate statistics
      const completedRides = (ridesRes.data as { rides: { status: string }[] }).rides.filter(ride => ride.status === 'completed');
      const totalSpend = (ridesRes.data as { rides: { cost: number }[] }).rides.reduce((acc, ride) => acc + ride.cost, 0);

      // Calculate monthly spending
      const monthlySpending = calculateMonthlySpending((ridesRes.data as { rides: { _id: string, route_id: string, driver_id: string, start_time: string, end_time: string, status: string, cost: number }[] }).rides);

      setStats({
        totalRides: (ridesRes.data as { rides: { _id: string, route_id: string, driver_id: string, start_time: string, end_time: string, status: string, cost: number }[] }).rides.length,
        completedRides: completedRides.length,
        totalSpend,
        averageCost: totalSpend / ((ridesRes.data as { rides: { _id: string, route_id: string, driver_id: string, start_time: string, end_time: string, status: string, cost: number }[] }).rides.length || 1),
        monthlySpending
      });

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch data"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, data: false }));
    }
  };

  interface Ride {
    start_time: string;
    cost: number;
  }

  interface MonthlySpending {
    month: string;
    amount: number;
  }

  const calculateMonthlySpending = (rides: Ride[]): MonthlySpending[] => {
    const monthlyData: { [key: string]: number } = {};
    rides.forEach(ride => {
      const month = format(new Date(ride.start_time), 'MMM yyyy');
      monthlyData[month] = (monthlyData[month] || 0) + ride.cost;
    });

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount: amount as number
    }));
  };

  const fetchRides = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/employee/rides`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setRides(data.rides);
    } catch (error) {
      console.error('Error fetching rides:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch rides"
      });
    }
  };

  // Add these state variables
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [selectedRide, setSelectedRide] = useState<RideCreate | null>(null);

// Add these functions
const handleEditRide = (ride: RideCreate) => {
  setSelectedRide(ride);
  setEditDialogOpen(true);
};

const handleDeleteRide = async (ridedata: RideData) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_URL}/employee/rides/${ridedata._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete ride');
    }

    toast({
      title: "Success",
      description: "Ride deleted successfully"
    });

    // Refresh rides
    fetchRides();
    fetchAvailableRides();
  } catch (error) {
    console.error('Error deleting ride:', error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to delete ride"
    });
  }
};

const handleUpdateRide = async (updatedRide: RideData) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_URL}/employee/update-ride/${updatedRide._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedRide)
    });

    if (!response.ok) {
      throw new Error('Failed to update ride');
    }

    toast({
      title: "Success",
      description: "Ride updated successfully"
    });

    // Refresh rides
    fetchRides();
    fetchAvailableRides();
  } catch (error) {
    console.error('Error updating ride:', error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to update ride"
    });
  }
};

  // // Enhanced useEffect for data loading

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:8000/employee/rides", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include auth token if required
          },
        });
        const data = await response.json();
        if (response.ok) {
          setRides(data.rides);
        } else {
          console.error("Failed to fetch rides:", data);
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    fetchRides();
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const employeeId = localStorage.getItem('user_id');

    if (!token || !employeeId) {
      navigate('/login');
      return;
    }

    const loadDashboardData = async () => {
      setIsInitialLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchRides(),
          fetchAvailableRides(),
          fetchData()
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data"
        });
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadDashboardData();

    // Set up auto-refresh interval (every 5 minutes)
    const refreshInterval = setInterval(loadDashboardData, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);







//////////////////////////// importstn //////////////
    // // Add loading states for different sections
    // const renderLoadingState = () => (
    //   <div className="flex items-center justify-center h-48">
    //     <div className="flex flex-col items-center space-y-4">
    //       <RefreshCw className="h-8 w-8 animate-spin text-primary" />
    //       <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
    //     </div>
    //   </div>
    // );
  
    // // Add error state display
    // const renderErrorState = () => (
    //   <div className="flex items-center justify-center h-48">
    //     <div className="flex flex-col items-center space-y-4">
    //       <AlertCircle className="h-8 w-8 text-destructive" />
    //       <p className="text-sm text-muted-foreground">{error}</p>
    //       <Button 
    //         variant="outline" 
    //         onClick={() => window.location.reload()}
    //       >
    //         <RefreshCw className="mr-2 h-4 w-4" />
    //         Retry
    //       </Button>
    //     </div>
    //   </div>
    // );
  
    // // Update the main render to handle loading and error states
    // if (isInitialLoading) {
    //   return (
    //     <div className="flex-1 p-8">
    //       {renderLoadingState()}
    //     </div>
    //   );
    // }
  
    // if (error) {
    //   return (
    //     <div className="flex-1 p-8">
    //       {renderErrorState()}
    //     </div>
    //   );
    // }



  const handleCreateRide = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(prev => ({ ...prev, data: true }));
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/employee/add-ride`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRide)
      });

      if (!response.ok) {
        throw new Error('Failed to create ride');
      }

      toast({
        title: "Success",
        description: "Ride created successfully"
      });

      // Reset form and refresh rides
      setNewRide({
        Ride_name: '',
        start_location: '',
        start_time: '',
        end_location: '',
        end_time: '',
        ride_discription: '',
        available_seats: 0,
        cost: 0
      });
      fetchRides();
      fetchAvailableRides();
    } catch (error) {
      console.error('Error creating ride:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create ride"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, data: false }));
    }
  };

  const handleBookRide = async (rideId: string) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/employee/book-ride/${rideId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to book ride');
      }

      toast({
        title: "Success",
        description: "Ride booked successfully"
      });

      fetchAvailableRides();
      fetchRides();
    } catch (error) {
      console.error('Error booking ride:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to book ride"
      });
    }
  };

  interface DriverForm {
    name: string;
    email: string;
    phone: string;
    license_number: string;
  }

  interface IsLoading {
    data: boolean;
    bookRide: boolean;
    submitDriver: boolean;
    submitComplaint: boolean;
  }

  const handleSubmitDriver = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading((prev: IsLoading) => ({ ...prev, submitDriver: true }));
      const token = localStorage.getItem('access_token');

      await axios.post(`${API_URL}/employee/submit-driver`, driverForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast({
        title: "Success",
        description: "Driver submitted successfully!"
      });

      setDriverForm({
        name: '',
        email: '',
        phone: '',
        license_number: ''
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.detail || "Failed to submit driver"
      });
    } finally {
      setIsLoading((prev: IsLoading) => ({ ...prev, submitDriver: false }));
    }
  };

  interface ComplaintForm {
    route_id: string;
    complaint_text: string;
  }

  interface IsLoading {
    data: boolean;
    bookRide: boolean;
    submitDriver: boolean;
    submitComplaint: boolean;
  }

  const handleSubmitComplaint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading((prev: IsLoading) => ({ ...prev, submitComplaint: true }));
      const token = localStorage.getItem('access_token');
      const userId = localStorage.getItem('userId');

      await axios.post(`${API_URL}/employee/complaints`, {
        employee_id: userId,
        route_id: complaintForm.route_id,
        complaint_text: complaintForm.complaint_text
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast({
        title: "Success",
        description: "Complaint submitted successfully!"
      });

      setComplaintForm({
        route_id: '',
        complaint_text: ''
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.detail || "Failed to submit complaint"
      });
    } finally {
      setIsLoading((prev: IsLoading) => ({ ...prev, submitComplaint: false }));
    }
  };

  // Add new loading state for ride creation
  const [isCreatingRide, setIsCreatingRide] = useState(false);



  // Render functions for different sections
  const renderOverviewStats = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        </CardHeader>
          <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRides}</div>
          <p className="text-xs text-muted-foreground">
            {stats.completedRides} completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalSpend.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Avg. ${stats.averageCost.toFixed(2)} per ride
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Rides</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rides.length}</div>
          <p className="text-xs text-muted-foreground">
            Active Rides
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Drivers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableDrivers.length}</div>
          <p className="text-xs text-muted-foreground">
            Verified drivers
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderSpendingChart = () => (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Monthly Spending Trends</CardTitle>
        <CardDescription>Your ride expenses over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={stats.monthlySpending}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderRideStatusChart = () => (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Ride Status Distribution</CardTitle>
        <CardDescription>Overview of your ride statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsPieChart>
            <Pie
              data={[
                { name: 'Completed', value: stats.completedRides },
                { name: 'Ongoing/Booked', value: stats.totalRides - stats.completedRides }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
                {COLORS.map((color: string, index: number) => (
                <Cell key={`cell-${index}`} fill={color} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );


  // Previous imports remain the same...


// Add these new state variables inside the EmployeeDashboard component
const [driverDetailsDialogOpen, setDriverDetailsDialogOpen] = useState(false);
const [selectedDriverDetails, setSelectedDriverDetails] = useState<{
  name: string;
  phone: string;
  email: string;
  status: string;
} | null>(null);
const [isLoadingDriverDetails, setIsLoadingDriverDetails] = useState(false);

// Add this new function inside the EmployeeDashboard component
const handleViewDriverDetails = async (rideId: string) => {
  try {
    setIsLoadingDriverDetails(true);
    setDriverDetailsDialogOpen(true);
    
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_URL}/employee/ride/${rideId}/driver`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch driver details');
    }
    
    const data = await response.json();
    setSelectedDriverDetails(data.driver);
  } catch (error) {
    console.error('Error fetching driver details:', error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch driver details"
    });
    setSelectedDriverDetails(null);
  } finally {
    setIsLoadingDriverDetails(false);
  }
};

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <Toaster />
      
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Employee Dashboard</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Search />
          <UserNav />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rides">Rides</TabsTrigger>
          <TabsTrigger value="book-ride">Book Ride</TabsTrigger>
          <TabsTrigger value="available-rides">Rides</TabsTrigger>
          <TabsTrigger value="submit-driver">Submit Driver</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
        </TabsList>
        {/* Add new tab content for routes */}
        <TabsContent value="rides">
          <Tabs defaultValue='create-ride' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='create-ride'>Create Ride</TabsTrigger>
              <TabsTrigger value='my-rides'>View My Rides</TabsTrigger>
            </TabsList>

            <TabsContent value='create-ride'>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Ride</CardTitle>
                  <CardDescription>Offer a new ride for others</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateRide} className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium">Ride Name</label>
                        <Input
                          value={newRide.Ride_name}
                          onChange={(e) => setNewRide({ ...newRide, Ride_name: e.target.value })}
                          placeholder="Enter ride name"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Start Location</label>
                          <Input
                            value={newRide.start_location}
                            onChange={(e) => setNewRide({ ...newRide, start_location: e.target.value })}
                            placeholder="Enter start location"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">End Location</label>
                          <Input
                            value={newRide.end_location}
                            onChange={(e) => setNewRide({ ...newRide, end_location: e.target.value })}
                            placeholder="Enter end location"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Start Time</label>
                          <Input
                            type="datetime-local"
                            value={newRide.start_time}
                            onChange={(e) => setNewRide({ ...newRide, start_time: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">End Time</label>
                          <Input
                            type="datetime-local"
                            value={newRide.end_time}
                            onChange={(e) => setNewRide({ ...newRide, end_time: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={newRide.ride_discription}
                          onChange={(e) => setNewRide({ ...newRide, ride_discription: e.target.value })}
                          placeholder="Enter ride description"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Available Seats</label>
                          <Input
                            type="number"
                            value={newRide.available_seats}
                            onChange={(e) => setNewRide({ ...newRide, available_seats: parseInt(e.target.value) })}
                            min="1"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Cost</label>
                          <Input
                            type="number"
                            value={newRide.cost}
                            onChange={(e) => setNewRide({ ...newRide, cost: parseFloat(e.target.value) })}
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading.data}>
                      {isLoading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      Create Ride
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="my-rides">
                <Tabs defaultValue="booked" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="booked">Booked Rides</TabsTrigger>
                    <TabsTrigger value="created">Created Rides</TabsTrigger>
                  </TabsList>

                  <TabsContent value="booked">
                    <Card>
                      <CardHeader>
                        <CardTitle>My Booked Rides</CardTitle>
                        <CardDescription>View rides you have booked</CardDescription>
                      </CardHeader>
                  <CardContent>
                    {rides.filter(ride => 
                      ride.booked_by?.some(booking => 
                        booking.employee_id === localStorage.getItem('employee_id')
                      )
                    ).length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                        <Car className="h-8 w-8 mb-2" />
                        <p>No booked rides found</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ride Name</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rides.filter(ride => 
                            ride.booked_by?.some(booking => 
                              booking.employee_id === localStorage.getItem('employee_id')
                            )
                          ).map((ride, index) => (
                            <TableRow key={index}>
                              <TableCell>{ride.Ride_name}</TableCell>
                              <TableCell>{ride.start_location}</TableCell>
                              <TableCell>{ride.end_location}</TableCell>
                              <TableCell>{format(new Date(ride.start_time), 'PPp')}</TableCell>
                              <TableCell>{format(new Date(ride.end_time), 'PPp')}</TableCell>
                              <TableCell>${ride.cost}</TableCell>
                              <TableCell>
                                <Badge variant={
                                  new Date(ride.start_time) > new Date() ? 'secondary' :
                                  new Date(ride.end_time) < new Date() ? 'default' : 'outline'
                                }>
                                  {new Date(ride.start_time) > new Date() ? 'Upcoming' : 
                                  new Date(ride.end_time) < new Date() ? 'Completed' : 'In Progress'}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="created">
                    <Card>
                      <CardHeader>
                        <CardTitle>Rides Created by Me</CardTitle>
                        <CardDescription>View rides you have created and their booking details</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                            {rides.filter(ride => 
                            (ride as RideData).created_by === localStorage.getItem('name')
                            ).map((ride, index) => (
                            <Card key={index} className="p-4">
                              <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-lg">{ride.Ride_name}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <MapPin className="mr-1 h-4 w-4" />
                                      {ride.start_location} → {ride.end_location}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                                      <Clock className="mr-1 h-4 w-4" />
                                      {format(new Date(ride.start_time), 'PPp')}
                                    </div>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditRide(ride)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleDeleteRide(ride as RideData)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-2">Booked Passengers</h4>
                                  {ride.booked_by && ride.booked_by.length > 0 ? (
                                    <div className="grid gap-2">
                                      {ride.booked_by.map((booking, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-muted p-2 rounded">
                                          <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-2" />
                                            <span>{booking.employee_name}</span>
                                          </div>
                                          <Badge variant="outline">{booking.employee_id}</Badge>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-muted-foreground">No bookings yet</p>
                                  )}
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    {/* Add the EditRideDialog component */}
                    {selectedRide && (
                      <EditRideDialog
                        isOpen={editDialogOpen}
                        onClose={() => setEditDialogOpen(false)}
                        ride={selectedRide}
                        onSave={handleUpdateRide}
                      />
                    )}

                    {/* Add the DriverDetailsDialog component */}
                    {/* {selectedDriverDetails && (
                      <DriverDetailsDialog
                        isOpen={driverDetailsDialogOpen}
                        onClose={() => setDriverDetailsDialogOpen(false)}
                        driver={selectedDriverDetails}
                      />
                    )}
                     */}
                     <DriverDetailsDialog
                      isOpen={driverDetailsDialogOpen}
                      onClose={() => setDriverDetailsDialogOpen(false)}
                      driverDetails={selectedDriverDetails}
                      isLoading={isLoadingDriverDetails}
                    />
                  </TabsContent>
                </Tabs>
              </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="overview">
          {renderOverviewStats()}
          
          <div className="grid gap-4 md:grid-cols-7 mt-4">
            {renderSpendingChart()}
            {renderRideStatusChart()}
          </div>
        </TabsContent>

        <TabsContent value="book-ride">
        <Card>
            <CardHeader>
              <CardTitle>Available Rides</CardTitle>
              <CardDescription>Browse and book available rides</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                  {availableRides.map((ride, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{ride.Ride_name}</h3>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              {ride.start_location} → {ride.end_location}
                            </div>
                            <div className="flex items-center mt-1">
                              <Clock className="mr-1 h-4 w-4" />
                              {format(new Date(ride.start_time), 'PPp')}
                            </div>
                          </div>
                          <div className="mt-2">
                            <Badge variant="secondary">
                              {ride.available_seats} seats available
                            </Badge>
                            <Badge variant="secondary" className="ml-2">
                              ${ride.cost}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button onClick={() => handleBookRide(ride.Ride_name)}>
                            Book Ride
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleViewDriverDetails((ride as RideData)._id)}
                          >
                            View Driver
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submit-driver">
          <Card>
            <CardHeader>
              <CardTitle>Submit Driver Details</CardTitle>
              <CardDescription>Add a new driver to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitDriver} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Driver Name</label>
                    <Input
                      value={driverForm.name}
                      onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                      placeholder="Enter driver's name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={driverForm.email}
                      onChange={(e) => setDriverForm({ ...driverForm, email: e.target.value })}
                      placeholder="driver@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      type="tel"
                      value={driverForm.phone}
                      onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">License Number</label>
                    <Input
                      value={driverForm.license_number}
                      onChange={(e) => setDriverForm({ ...driverForm, license_number: e.target.value })}
                      placeholder="Enter license number"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading.submitDriver}
                >
                  {isLoading.submitDriver ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Submit Driver
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>Submit Complaint</CardTitle>
              <CardDescription>Report any issues with routes or rides</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComplaint} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Route</label>
                  <Select
                    value={complaintForm.route_id}
                    onValueChange={(value) => setComplaintForm({ ...complaintForm, route_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a route" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* {rides.map((ride) => (
                        <SelectItem key={route._id} value={route._id}>
                          {route.route_name}
                        </SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Complaint Details</label>
                  <Textarea
                    value={complaintForm.complaint_text}
                    onChange={(e) => setComplaintForm({ ...complaintForm, complaint_text: e.target.value })}
                    placeholder="Describe your complaint..."
                    rows={4}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading.submitComplaint}
                >
                  {isLoading.submitComplaint ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <AlertCircle className="mr-2 h-4 w-4" />
                  )}
                  Submit Complaint
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;



/////////////////////////// --------------  TODO ---------------------
// // Add these imports
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// // Add this interface
// interface DriverDetails {
//   name: string;
//   phone: string;
//   email: string;
// }

// // Add these states in your component
// const [selectedRideDriver, setSelectedRideDriver] = useState<DriverDetails | null>(null);
// const [isLoadingDriver, setIsLoadingDriver] = useState(false);

// // Add this function to fetch driver details
// const fetchDriverDetails = async (rideId: string) => {
//   setIsLoadingDriver(true);
//   try {
//     const token = localStorage.getItem('access_token');
//     const response = await fetch(`${API_URL}/employee/ride/${rideId}/driver`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch driver details');
//     }
    
//     const data = await response.json();
//     setSelectedRideDriver(data.driver);
//   } catch (error) {
//     console.error('Error fetching driver details:', error);
//     toast({
//       variant: "destructive",
//       title: "Error",
//       description: "Failed to fetch driver details"
//     });
//   } finally {
//     setIsLoadingDriver(false);
//   }
// };

// // Modify the ride card in the available rides section
// {availableRides.map((ride, index) => (
//   <Card key={index} className="p-4">
//     <div className="flex items-center justify-between">
//       <div>
//         {/* ... existing ride details ... */}
//       </div>
//       <div className="flex gap-2">
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button variant="outline" onClick={() => fetchDriverDetails(ride._id)}>
//               View Details
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Ride Details</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div>
//                 <h4 className="font-medium mb-2">Ride Information</h4>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center">
//                     <MapPinned className="mr-2 h-4 w-4" />
//                     <span>From: {ride.start_location}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <MapPinned className="mr-2 h-4 w-4" />
//                     <span>To: {ride.end_location}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="mr-2 h-4 w-4" />
//                     <span>Start: {format(new Date(ride.start_time), 'PPp')}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="mr-2 h-4 w-4" />
//                     <span>End: {format(new Date(ride.end_time), 'PPp')}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <h4 className="font-medium mb-2">Driver Information</h4>
//                 {isLoadingDriver ? (
//                   <div className="flex items-center justify-center p-4">
//                     <RefreshCw className="h-4 w-4 animate-spin" />
//                   </div>
//                 ) : selectedRideDriver ? (
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center">
//                       <Users className="mr-2 h-4 w-4" />
//                       <span>Name: {selectedRideDriver.name}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <PhoneCall className="mr-2 h-4 w-4" />
//                       <span>Phone: {selectedRideDriver.phone}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <Mail className="mr-2 h-4 w-4" />
//                       <span>Email: {selectedRideDriver.email}</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="text-sm text-muted-foreground">
//                     No driver information available
//                   </p>
//                 )}
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//         <Button onClick={() => handleBookRide(ride._id)}>
//           Book Ride
//         </Button>
//       </div>
//     </div>
//   </Card>
// ))}
