

// import {Link} from 'react-router-dom';
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
// import { UserNav } from './admincomp/UserNav';
// import { Search } from './admincomp/search';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// export const AdminDashboard: React.FC = () => {
//   const [routes, setRoutes] = useState<any[]>([]);
//   const [rides, setRides] = useState<any[]>([]);
//   const [complaints, setComplaints] = useState<any[]>([]);
//   const [drivers, setDrivers] = useState<any[]>([]);
//   const [graph, setGraph] = useState<string | null>(null);
//   // const [routeName, setRouteName] = useState("");
//   // const [startLocation, setStartLocation] = useState("");
//   // const [endLocation, setEndLocation] = useState("");

//   useEffect(() => {
//     fetchRoutes();
//     fetchRides();
//     fetchComplaints();
//     fetchDrivers();
//     fetchGraph();
//   }, []);

//   const fetchRoutes = async () => {
//     const response = await axios.get<{ routes: any[] }>("/admin/routes", {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     setRoutes(response.data.routes);
//   };

//   const fetchRides = async () => {
//     const response = await axios.get("/admin/rides", {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     setRides((response.data as { rides: any[] }).rides);
//   };

//   const fetchComplaints = async () => {
//     try {
//       const response = await axios.get("/admin/complaints", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setComplaints((response.data as { complaints: any[] }).complaints || []);
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       setComplaints([]);
//     }
//   };

//   const fetchDrivers = async () => {
//     const response = await axios.get("/admin/pending-drivers", {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     setDrivers((response.data as { pending_drivers: any[] }).pending_drivers);
//   };

//   const fetchGraph = async () => {
//     const response = await axios.get("/admin/graph", {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     setGraph((response.data as { graph: string }).graph);
//   };

//   // const createRoute = async () => {
//   //   try {
//   //     await axios.post(
//   //       "/admin/routes",
//   //       { route_name: routeName, start_location: startLocation, end_location: endLocation },
//   //       {
//   //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   //       }
//   //     );
//   //     fetchRoutes(); // Refresh route list
//   //   } catch (error) {
//   //     console.error("Error creating route:", error);
//   //   }
//   // };
//   // const resolveComplaint = async (complaintId: string) => {
//   //   try {
//   //     await axios.put(
//   //       `/admin/complaints/${complaintId}`,
//   //       { status: "resolved" },
//   //       {
//   //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   //       }
//   //     );
//   //     fetchComplaints(); // Refresh complaints list
//   //   } catch (error) {
//   //     console.error("Error resolving complaint:", error);
//   //   }
//   // };

//   // const verifyDriver = async (driverId: string) => {
//   //   try {
//   //     await axios.put(
//   //       `/admin/verify-driver/${driverId}`,
//   //       { action: "verified" },
//   //       {
//   //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   //       }
//   //     );
//   //     fetchDrivers(); // Refresh driver list
//   //   } catch (error) {
//   //     console.error("Error verifying driver:", error);
//   //   }
//   // };

//   // const rejectDriver = async (driverId: string) => {
//   //   try {
//   //     await axios.put(
//   //       `/admin/verify-driver/${driverId}`,
//   //       { action: "rejected" },
//   //       {
//   //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   //       }
//   //     );
//   //     fetchDrivers(); // Refresh driver list
//   //   } catch (error) {
//   //     console.error("Error rejecting driver:", error);
//   //   }
//   // };

//   return (
//     <div className="flex-1 space-y-8 p-8 pt-6">
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className='text-3xl font-bold tracking-tight'>Admin Dasboard</h2>
//         <div className="flex items-center space-x-2">
//           <Search />
//           <Link to="/" className="button">Home</Link>
//           <UserNav />
//         </div>
//       </div>
//       <Tabs defaultValue='overview' className='space-y-4'>
//         <TabsList>
//           <TabsTrigger value='overview' className='text-md font-semibold'>Overview</TabsTrigger>
//           <TabsTrigger value='routes' className='text-md font-semibold'>Routes</TabsTrigger>
//           <TabsTrigger value='rides' className='text-md font-semibold'>Rides</TabsTrigger>
//           <TabsTrigger value='complaints' className='text-md font-semibold'>Complaints</TabsTrigger>
//           <TabsTrigger value='drivers' className='text-md font-semibold'>Drivers</TabsTrigger>
//           <TabsTrigger value='graph' className='text-md font-semibold'>Graph</TabsTrigger>
//         </TabsList>
//         <TabsContent value='overview' className='space-y-4'>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                 <CardTitle className='text-sm fon-medium'>
//                   Total Routes
//                 </CardTitle>
//                 {/* <CardTitle className='text-2xl font-semibold'>
//                   {routes.length}
//                 </CardTitle> */}
//               </CardHeader>
//               <CardContent>
//                 <p className='text-2xl font-bold'>{routes ? routes.length : 0}</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                 <CardTitle className='text-sm fon-medium'>
//                   Total Rides
//                 </CardTitle>
//                 {/* <CardTitle className='text-2xl font-semibold'>
//                   {rides.length}
//                 </CardTitle> */}
//               </CardHeader>
//               <CardContent>
//                 <p className='text-2xl font-bold'>{rides? rides.length:0}</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                 <CardTitle className='text-sm fon-medium'>
//                   Total Complaints
//                 </CardTitle>
//                 {/* <CardTitle className='text-2xl font-semibold'>
//                   {complaints.length}
//                 </CardTitle> */}
//               </CardHeader>
//               <CardContent>
//                 <p className='text-2xl font-bold'>{complaints.length}</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                 <CardTitle className='text-sm fon-medium'>
//                   Total Drivers
//                 </CardTitle>
//                 {/* <CardTitle className='text-2xl font-semibold'>
//                   {drivers.length}
//                 </CardTitle> */}
//               </CardHeader>
//               <CardContent>
//                 <p className='text-2xl font-bold'>{drivers ? drivers.length:0}</p>
//               </CardContent>
//             </Card>

//           </div>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className='col-span-4'>
//               <CardHeader>
//                 <CardTitle>Overview</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {graph}
//               </CardContent>
//             </Card>
//             <Card className='col-span-3'>
//               <CardHeader>
//                 <CardTitle>Recent Rides</CardTitle>
//               </CardHeader>
//               <CardContent className="overflow-y-auto h-64">
//                 {rides && Array.isArray(rides) && rides.length > 0 ? (
//                   rides.map((ride, index) => (
//                     <div key={index} className="p-2 border-b">
//                       <p className="font-bold">{ride.name}</p>
//                       <p className="text-sm text-gray-500">{ride.date}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No rides available</p>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
    

//   );
// }

// ##########################################################################33
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserNav } from './admincomp/UserNav';
import { Search } from './admincomp/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Users, AlertCircle, Car, TrendingUp, Calendar, MapPin, RefreshCw, Eye } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {format} from 'date-fns';

const API_URL = 'http://localhost:8000';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <p className="font-semibold">{format(new Date(label), 'MMM dd, yyyy')}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rides, setRides] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [trends, setTrends] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedRide, setSelectedRide] = useState<any>(null);
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);
  const [stats, setStats] = useState({
    totalRides: 0,
    totalComplaints: 0,
    activeRides: 0,
    completedRides: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    const interval = window.setInterval(() => {
      fetchData();
    }, 30000);

    setRefreshInterval(interval);
    fetchData();

    return () => {
      if (refreshInterval) {
        window.clearInterval(refreshInterval);
      }
    };
  }, [navigate]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [ridesRes, complaintsRes, driversRes, trendsRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/rides`, { headers }),
        axios.get(`${API_URL}/admin/complaints`, { headers }),
        axios.get(`${API_URL}/admin/pending-drivers`, { headers }),
        axios.get(`${API_URL}/admin/trends`, { headers }),
        axios.get(`${API_URL}/admin/ride-stats`, { headers })
      ]);

      setRides((ridesRes.data as { rides: any[] }).rides || []);
      setComplaints((complaintsRes.data as { complaints: any[] }).complaints || []);
      setDrivers((driversRes.data as { pending_drivers: any[] }).pending_drivers || []);
      setTrends((trendsRes.data as { trends: any[] }).trends || []);
      setStats((statsRes.data as { totalRides: number; totalComplaints: number; activeRides: number; completedRides: number }) || {
        totalRides: 0,
        totalComplaints: 0,
        activeRides: 0,
        completedRides: 0
      });
    } catch (error: any) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('role');
        navigate('/login');
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch dashboard data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyDriver = async (driverId: string, action: 'verified' | 'rejected') => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`${API_URL}/admin/verify-driver/${driverId}`, 
        { action },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      toast({
        title: "Success",
        description: `Driver ${action === 'verified' ? 'verified' : 'rejected'} successfully!`,
        duration: 3000,
      });
      
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.detail || `Failed to ${action} driver. Please try again.`,
      });
    }
  };

  const handleResolveComplaint = async (complaintId: string) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`${API_URL}/admin/complaints/${complaintId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast({
        title: "Success",
        description: "Complaint resolved successfully!",
        duration: 3000,
      });
      
      fetchData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.detail || "Failed to resolve complaint. Please try again.",
      });
    }
  };
  //////////////////////////
  const formatTrendData = (data: any[]) => {
    return data.map(item => {
      const date = new Date(item.date);
      return {
        ...item,
        date: isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMM dd'),
      };
    });
  };

  const [selectedRide, setSelectedRide] = useState<any>(null);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <Toaster/>
      <div className="flex items-center justify-between space-y-2">
        <div className='flex items-center space-x-2'>
          <Activity className="h-8 w-8 text-primary" />
          <h2 className='text-3xl font-bold tracking-tight'>Admin Dashboard</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={fetchData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Search />
          <Link to="/" className="button">Home</Link>
          <UserNav />
        </div>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value="overview" className="text-md font-semibold">
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="rides" className="text-md font-semibold">
            <Car className="h-4 w-4 mr-2" />
            Rides
          </TabsTrigger>
          <TabsTrigger value="complaints" className="text-md font-semibold">
            <AlertCircle className="h-4 w-4 mr-2" />
            Complaints
          </TabsTrigger>
          <TabsTrigger value="drivers" className="text-md font-semibold">
            <Users className="h-4 w-4 mr-2" />
            Drivers
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value='overview'>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Rides
                </CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>{stats.totalRides}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Rides
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>{stats.activeRides}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Complaints
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>{stats.totalComplaints}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Completed Rides
                </CardTitle>
                <Badge variant="outline">{stats.completedRides}</Badge>
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold'>{stats.completedRides}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-3">
            <Card className='col-span-4 h-[450px]'>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Weekly Activity</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={fetchData}
                    className="h-8 w-8"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart 
                    data={formatTrendData(trends)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: 'hsl(var(--foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--foreground))' }}
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--foreground))' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="rides" 
                      name="Rides" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="complaints" 
                      name="Complaints" 
                      fill="hsl(var(--destructive))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Recent Rides</CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-[400px]">
                {rides.slice(0, 5).map((ride) => (
                  <div key={ride._id} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{ride.Ride_name}</h3>
                      <Badge variant={
                        ride.status === 'completed' ? 'default' :
                        ride.status === 'active' ? 'secondary' :
                        'destructive'
                      }>
                        {ride.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {ride.start_location} → {ride.end_location}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(ride.start_time).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Rides Tab */}
        <TabsContent value='rides'>
          <Card>
            <CardHeader>
              <CardTitle>Ride Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ride Name</TableHead>
                    <TableHead>Start Location</TableHead>
                    <TableHead>End Location</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Available Seats</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rides.map((ride) => (
                    <TableRow key={ride._id}>
                      <TableCell>{ride.Ride_name}</TableCell>
                      <TableCell>{ride.start_location}</TableCell>
                      <TableCell>{ride.end_location}</TableCell>
                      <TableCell>{new Date(ride.start_time).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          ride.status === 'completed' ? 'default' :
                          ride.status === 'active' ? 'secondary' :
                          'destructive'
                        }>
                          {ride.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${ride.cost.toFixed(2)}</TableCell>
                      <TableCell>{ride.available_seats}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedRide(ride)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View More
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Ride Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold">Ride Name</h4>
                                  <p>{ride.Ride_name}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Status</h4>
                                  <Badge variant={
                                    ride.status === 'completed' ? 'default' :
                                    ride.status === 'active' ? 'secondary' :
                                    'destructive'
                                  }>
                                    {ride.status}
                                  </Badge>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Start Location</h4>
                                  <p>{ride.start_location}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">End Location</h4>
                                  <p>{ride.end_location}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Start Time</h4>
                                  <p>{new Date(ride.start_time).toLocaleString()}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">End Time</h4>
                                  <p>{new Date(ride.end_time).toLocaleString()}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Cost</h4>
                                  <p>${ride.cost.toFixed(2)}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Available Seats</h4>
                                  <p>{ride.available_seats}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold">Description</h4>
                                <p className="text-sm text-muted-foreground">{ride.ride_discription}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Booked By</h4>
                                <p>{Array.isArray(ride.booked_by) ? ride.booked_by.join(', ') : 'No bookings'}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold">Created At</h4>
                                  <p>{new Date(ride.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Updated At</h4>
                                  <p>{new Date(ride.updated_at).toLocaleString()}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Complaints Tab */}
        <TabsContent value='complaints'>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Complaints Management</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={fetchData}
                  className="h-8 w-8"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Ride</TableHead>
                    <TableHead>Complaint</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complaints.map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell className="font-medium">{complaint.employee_id}</TableCell>
                      <TableCell>{complaint.ride_id}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {complaint.complaint_text}
                      </TableCell>
                      <TableCell>
                        {format(new Date(complaint.created_at), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={complaint.status === 'resolved' ? 'default' : 'destructive'}>
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {complaint.status !== 'resolved' && (
                          <Button
                            size="sm"
                            onClick={() => handleResolveComplaint(complaint._id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            Resolve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {complaints.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No complaints found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Drivers Tab */}
        <TabsContent value='drivers'>
          <Card>
            <CardHeader>
              <CardTitle>Driver Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver._id}>
                      <TableCell>{driver.name}</TableCell>
                      <TableCell>{driver.email}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.license_number}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleVerifyDriver(driver._id, 'verified')}
                        >
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleVerifyDriver(driver._id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;