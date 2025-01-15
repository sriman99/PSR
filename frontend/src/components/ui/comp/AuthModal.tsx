// import { useState, useRef } from 'react';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { FaGoogle, FaGithub } from 'react-icons/fa';
// import axios from 'axios';
// import authphoto from '@/assets/authphoto.jpg'; // Adjust the path as necessary

// const BACK_END_URL = 'http://localhost:8000';

// export function AuthModal() {
//   const [isSignup, setIsSignup] = useState(false); // Toggle between Signup/Login
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'employee', // Default role for signup
//   });
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showMessage, setShowMessage] = useState(false);

//   const dialogRef = useRef<HTMLDialogElement>(null); // Reference to the dialog

//   // Handle input change for signup form
//   const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle input change for login form
//   const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setLoginData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Signup form submission
//   const handleSignup = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//       };
//       const response = await axios.post(`${BACK_END_URL}/auth/signup`, payload);
//       const data = response.data as { access_token: string; role: string, name: string, user_id: string };
//       if (data.access_token) {
//         localStorage.setItem('access_token', data.access_token);
//         localStorage.setItem('role', data.role);
//         localStorage.setItem('name', data.name);
//         localStorage.setItem('user_id', data.user_id);        
//         setSuccessMessage('Signup Successful! Please log in.');
//         setShowMessage(true);
//         setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.detail || 'An error occurred');
//     }
//   };

//   // Login form submission
//   const handleLogin = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const payload = new URLSearchParams();
//       payload.append('username', loginData.email); // Backend expects "username"
//       payload.append('password', loginData.password);

//       const response = await axios.post(
//         `${BACK_END_URL}/auth/login`,
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded', // Ensure content type is correct
//           },
//         }
//       );

//       const data = response.data as { access_token: string; role: string, name: string, user_id: string };
//       if (data.access_token) {
//         localStorage.setItem('access_token', data.access_token);
//         localStorage.setItem('role', data.role);
//         localStorage.setItem('name', data.name);
//         localStorage.setItem('user_id', data.user_id);
//         setSuccessMessage('Login Successful!');
//         setShowMessage(true);
//         setTimeout(() => {
//           setShowMessage(false);
//           dialogRef.current?.close(); // Close the modal after login
//         }, 3000); // Close after 3 seconds
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.detail || 'An error occurred');
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="text-white hover:bg-gray-950 hover:text-white">
//           Login / Sign Up
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[500px] md:max-w-[800px] transition-all duration-300 w-[950px] h-[580px]">
//         <div className="hidden md:block absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-l-lg">
//           <img
//             src={authphoto}
//             alt="Authentication Illustration"
//             className="h-full object-cover"
//           />
//         </div>

//         <div className="md:ml-[35%] p-6">
//           <DialogHeader>
//             <DialogTitle className="text-2xl font-semibold">
//               {isSignup ? 'Create an Account' : 'Welcome Back'}
//             </DialogTitle>
//             <DialogDescription>
//               {isSignup
//                 ? 'Create your account to access amazing features.'
//                 : 'Login to continue where you left off.'}
//             </DialogDescription>
//           </DialogHeader>

//           {/* Success/Failure Message */}
//           {showMessage && (
//             <div className="w-full text-center mb-4 p-2 bg-green-500 text-white rounded-md animate__animated animate__fadeIn animate__delay-1s">
//               {successMessage}
//             </div>
//           )}

//           {/* Error message */}
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           {/* Form */}
//           <form onSubmit={isSignup ? handleSignup : handleLogin} className="grid gap-6 py-4">
//             {/* Name (only for Signup) */}
//             {isSignup && (
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">Name</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleSignupInputChange}
//                   placeholder="Enter your name"
//                   className="col-span-3"
//                   required
//                 />
//               </div>
//             )}

//             {/* Email */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={isSignup ? formData.email : loginData.email}
//                 onChange={isSignup ? handleSignupInputChange : handleLoginInputChange}
//                 placeholder="Enter your email"
//                 className="col-span-3"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="password" className="text-right">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={isSignup ? formData.password : loginData.password}
//                 onChange={isSignup ? handleSignupInputChange : handleLoginInputChange}
//                 placeholder="Enter your password"
//                 className="col-span-3"
//                 required
//               />
//             </div>

//             {/* Role (only for Signup) */}
//             {isSignup && (
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="role" className="text-right">Role</Label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleSignupInputChange}
//                   className="col-span-3 border px-4 py-2 rounded-xl text-white bg-gray-800"
//                   required
//                 >
//                   <option value="employee">Employee</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//             )}

//             {/* Submit Button */}
//             <DialogFooter>
//               <Button
//                 type="submit"
//                 className="w-[200px] align-middle justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition-all duration-300"
//               >
//                 {isSignup ? 'Sign Up' : 'Login'}
//               </Button>
//             </DialogFooter>
//           </form>

//           {/* Social Authentication */}
//           <div className="mt-4">
//             <p className="text-center text-sm text-gray-500">Or continue with</p>
//             <div className="flex justify-center space-x-4 mt-4">
//               <Button
//                 variant="outline"
//                 className="flex items-center space-x-2 hover:bg-gray-100 transition-all duration-300"
//               >
//                 <FaGoogle className="text-xl" />
//                 <span>Google</span>
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex items-center space-x-2 hover:bg-gray-100 transition-all duration-300"
//               >
//                 <FaGithub className="text-xl" />
//                 <span>GitHub</span>
//               </Button>
//             </div>
//           </div>

//           {/* Toggle Login/Signup */}
//           <div className="mt-6 text-center">
//             <Button
//               variant="link"
//               className="text-blue-500 hover:underline"
//               onClick={() => setIsSignup(!isSignup)}
//             >
//               {isSignup
//                 ? 'Already have an account? Login'
//                 : "Don't have an account? Sign Up"}
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import authphoto from '@/assets/authphoto.jpg';

const BACK_END_URL = 'http://localhost:8000';

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BACK_END_URL}/auth/signup`, formData);
      const data = response.data;
      
      toast({
        title: "Success!",
        description: "Account created successfully. Please log in.",
        duration: 3000,
      });

      // Reset form and switch to login
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'employee',
      });
      setIsSignup(false);
      
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.response?.data?.detail || 'An error occurred',
      });
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const payload = new URLSearchParams();
      payload.append('username', loginData.email);
      payload.append('password', loginData.password);

      const response = await axios.post(
        `${BACK_END_URL}/auth/login`,
        payload,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, role, name, user_id } = response.data as { access_token: string; role: string; name: string; user_id: string };
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('user_id', user_id);
      
      setIsAuthenticated(true);
      setIsOpen(false);

      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
        duration: 3000,
      });

      // Redirect based on role
      navigate(role === 'admin' ? '/admin1' : '/employee');
      
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: err.response?.data?.detail || 'Invalid credentials',
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
    toast({
      title: "Logged out",
      description: "Successfully logged out",
      duration: 3000,
    });
  };

  if (isAuthenticated) {
    return (
      <Button 
        onClick={handleLogout}
        variant="outline"
        className="text-white hover:bg-red-600 hover:text-white transition-colors duration-300"
      >
        Logout
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="text-white hover:bg-gray-950 hover:text-white transition-all duration-300"
        >
          Login / Sign Up
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] md:max-w-[800px] transition-all duration-300 w-[950px] h-[580px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-l-lg overflow-hidden"
        >
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
            src={authphoto}
            alt="Authentication Illustration"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:ml-[35%] p-6"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {isSignup ? 'Create an Account' : 'Welcome Back'}
            </DialogTitle>
            <DialogDescription>
              {isSignup
                ? 'Create your account to access amazing features.'
                : 'Login to continue where you left off.'}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            <motion.form
              key={isSignup ? 'signup' : 'login'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={isSignup ? handleSignup : handleLogin}
              className="grid gap-6 py-4"
            >
              {/* Form fields */}
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleSignupInputChange}
                    className="col-span-3"
                    required
                  />
                </motion.div>
              )}

              {/* Email and Password fields */}
              <motion.div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={isSignup ? formData.email : loginData.email}
                  onChange={isSignup ? handleSignupInputChange : handleLoginInputChange}
                  className="col-span-3"
                  required
                />
              </motion.div>

              <motion.div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={isSignup ? formData.password : loginData.password}
                  onChange={isSignup ? handleSignupInputChange : handleLoginInputChange}
                  className="col-span-3"
                  required
                />
              </motion.div>

              {/* Role selection for signup */}
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleSignupInputChange}
                    className="col-span-3 border px-4 py-2 rounded-xl text-white bg-gray-800"
                    required
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition-all duration-300"
                >
                  {isSignup ? 'Sign Up' : 'Login'}
                </Button>
              </motion.div>
            </motion.form>
          </AnimatePresence>

          {/* Social Authentication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <p className="text-center text-sm text-gray-500">Or continue with</p>
            <div className="flex justify-center space-x-4 mt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 hover:bg-gray-100 transition-all duration-300"
                >
                  <FaGoogle className="text-xl" />
                  <span>Google</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 hover:bg-gray-100 transition-all duration-300"
                >
                  <FaGithub className="text-xl" />
                  <span>GitHub</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Toggle Login/Signup */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <Button
              variant="link"
              className="text-blue-500 hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? 'Already have an account? Login'
                : "Don't have an account? Sign Up"}
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}