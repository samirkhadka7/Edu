// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = () => {
//     const newUser = { email, password };
//     localStorage.setItem('user', JSON.stringify(newUser));
//     alert('Registration successful');
//     navigate('/login');
//   };

//   return (
//     <div className='flex flex-col items-center mt-10'>
//       <h1 className='text-2xl mb-5'>Register</h1>
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
//       <button onClick={handleRegister} className='bg-gray-600 text-white px-5 py-2 rounded-full'>
//         Register
//       </button>
//     </div>
//   );
// };

// export default Register;
