// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));

//     if (storedUser && storedUser.email === email && storedUser.password === password) {
//       localStorage.setItem('isAuthenticated', true);
//       navigate('/dashboard');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className='flex flex-col items-center mt-10'>
//       <h1 className='text-2xl mb-5'>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className='border p-2 mb-3 w-80'
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className='border p-2 mb-5 w-80'
//       />
//       <button onClick={handleLogin} className='bg-blue-600 text-white px-5 py-2 rounded-full'>
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;
