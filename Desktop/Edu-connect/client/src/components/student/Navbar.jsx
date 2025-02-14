// import React, { useContext } from 'react'
// import { assets } from '../../assets/assets'
// import { Link } from 'react-router-dom'
// import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
// import { AppContext } from '../../context/AppContext'
// const Navbar = () => {

//     const {navigate, isEducator} =useContext(AppContext)
//     const isCourseListPage = location.pathname.includes('/course-list');

//     const {openSignIn} = useClerk()
//     const {user} = useUser()
//   return (
//     <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' :
//     'bg-cyan-100/70'}`}>

//       <img onClick={()=> navigate('/')} src={assets.logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />
//       <div className='hidden md:flex items-center gap-5 text-gray-500'>
//         <div className='flex items-center gap-5'>
//         { user &&
//         <>
//         <button onClick={()=> {navigate('/educator')}} className='cursor-pointer'>{isEducator? 'Educator Dashboard' : 'Become Educator'}</button>
//         |    <Link to='/my-enrollments'>My Enrollments</Link>
//         </>
//         }
//         </div>
//         {user ? <UserButton/> :
//             <button onClick={()=> openSignIn()} className='bg-blue-600 text-white px-5 py-2
//          rounded-full'>Create Account</button>}
//         </div>
        
//         {/* for phone screen */}
//         <div className='md:hidden flex items-center sm:gap-5 texi-gray-500 texi-gray-500'>
//             <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
//                 { user &&
//                 <>
//                     <button onclick={()=> {navigate('/educator')}}>{isEducator? 'Educator Dashboard' : 'Become Educator'}</button>
//                 |   <Link to='/my-enrollments'>My Enrollments</Link>
//                 </>
//                 }
//             </div>
//             {
//                 user ? <UserButton/>
//                 :<button onClick={()=>openSignIn()}><img src={assets.user_icon} alt=""/></button>
//             }
//         </div>
        
//     </div>
//   )
// }

// export default Navbar




import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
    const { isEducator } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isCourseListPage = location.pathname.includes('/course-list');

    const [user, setUser] = useState(null);
    const [showAuth, setShowAuth] = useState(false);
    const [authType, setAuthType] = useState('login'); // 'login' or 'register'
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    // Load user from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleAuthSubmit = () => {
        if (!credentials.email || !credentials.password) {
            alert('Please enter both email and password.');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (authType === 'register') {
            // Check if user already exists
            const existingUser = users.find(u => u.email === credentials.email);
            if (existingUser) {
                alert('User already registered. Please login.');
                return;
            }

            // Register new user
            const newUser = { email: credentials.email, password: credentials.password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration successful! You can now log in.');
            setAuthType('login'); // Switch to login after successful registration
            setCredentials({ email: '', password: '' });
        } else {
            // Login
            const storedUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
            if (!storedUser) {
                alert('Invalid email or password. Please try again.');
                return;
            }

            localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
            setUser(storedUser);
            alert('Login successful!');
            setShowAuth(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setUser(null);
        alert('You have been logged out.');
    };

    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
            isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
        }`}>
            <img 
                onClick={() => navigate('/')} 
                src={assets.logo} 
                alt="Logo" 
                className='w-28 lg:w-32 cursor-pointer' 
            />

            {/* Navigation */}
            <div className='flex items-center gap-5 text-gray-500'>
                {user && (
                    <>
                        <button onClick={() => navigate('/educator')}>
                            {isEducator ? 'Educator Dashboard' : 'Become Educator'}
                        </button>
                        | <Link to='/my-enrollments'>My Enrollments</Link>
                    </>
                )}

                {user ? (
                    <button onClick={handleLogout} 
                    // className='bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer'>
                    className='bg-blue-600 text-white px-5 py-2 rounded-full transition duration-300 hover:bg-blue-700 hover:shadow-lg cursor-pointer'>
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => setShowAuth(true)}
                        // className='bg-blue-600 text-white px-5 py-2 rounded- cursor-pointerfull'
                        className='bg-blue-600 text-white px-5 py-2 rounded-full transition duration-300 hover:bg-blue-700 hover:shadow-lg cursor-pointer'
                    >
                        Login / Register
                    </button>
                )}
            </div>

            {/* Authentication Modal */}
            {showAuth && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
                        <h2 className='text-xl font-bold mb-4'>{authType === 'login' ? 'Login' : 'Register'}</h2>
                        <input
                            type='email'
                            placeholder='Email'
                            value={credentials.email}
                            onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                            className='w-full border p-2 mb-2'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={credentials.password}
                            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                            className='w-full border p-2 mb-4'
                        />
                        <button onClick={handleAuthSubmit} className='w-full bg-blue-600 text-white p-2 rounded-md'>
                            {authType === 'login' ? 'Login' : 'Register'}
                        </button>
                        <p className='text-center mt-3 text-sm'>
                            {authType === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <span className='text-blue-600 cursor-pointer' onClick={() => setAuthType(authType === 'login' ? 'register' : 'login')}>
                                {authType === 'login' ? 'Register' : 'Login'}
                            </span>
                        </p>
                        <button onClick={() => setShowAuth(false)} className='mt-4 block mx-auto text-gray-500'>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;










// import React, { useContext } from 'react'
// import { assets } from '../../assets/assets'
// import { Link } from 'react-router-dom'
// import { AppContext } from '../../context/AppContext'

// const Navbar = () => {
//     const { navigate, isEducator, user, logout } = useContext(AppContext)
//     const isCourseListPage = location.pathname.includes('/course-list')

//     return (
//         <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
//             isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
//         }`}>
//             <img 
//                 onClick={() => navigate('/')} 
//                 src={assets.logo} 
//                 alt="Logo" 
//                 className='w-28 lg:w-32 cursor-pointer' 
//             />
            
//             <div className='hidden md:flex items-center gap-5 text-gray-500'>
//                 <div className='flex items-center gap-5'>
//                     {user && (
//                         <>
//                             <button 
//                                 onClick={() => navigate('/educator')} 
//                                 className='cursor-pointer'
//                             >
//                                 {isEducator ? 'Educator Dashboard' : 'Become Educator'}
//                             </button>
//                             <span>|</span>
//                             <Link to='/my-enrollments'>My Enrollments</Link>
//                         </>
//                     )}
//                 </div>
//                 {user ? (
//                     <div className='flex items-center gap-3'>
//                         <span>Hi, {user.name}</span>
//                         <button 
//                             onClick={logout}
//                             className='bg-blue-600 text-white px-5 py-2 rounded-full'
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className='flex gap-3'>
//                         <button 
//                             onClick={() => navigate('/login')}
//                             className='bg-blue-600 text-white px-5 py-2 rounded-full'
//                         >
//                             Login
//                         </button>
//                         <button 
//                             onClick={() => navigate('/register')}
//                             className='bg-gray-600 text-white px-5 py-2 rounded-full'
//                         >
//                             Register
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Mobile view */}
//             <div className='md:hidden flex items-center sm:gap-5 text-gray-500'>
//                 {user ? (
//                     <div className='flex items-center gap-2'>
//                         <button onClick={logout}>
//                             <img src={assets.user_icon} alt="Logout" className='w-8'/>
//                         </button>
//                     </div>
//                 ) : (
//                     <div className='flex gap-2'>
//                         <button onClick={() => navigate('/logins')}>
//                             <img src={assets.user_icon} alt="Login" className='w-8'/>
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Navbar

