// import React, { useState } from 'react';

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     state: '',
//     city: '',
//     terms: false,
//     policy: false,
//   });

//   const toggleAuthMode = () => setIsLogin(!isLogin);
  
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(isLogin ? 'Login Data:' : 'Sign Up Data:', formData);
//     if (!isLogin) alert('Sign Up Successful!');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-950 via-purple-700 to-cyan-400 flex items-center justify-center p-4">
//       <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md">
//         <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-700 mb-4">Ludo King</h1>
//         <h2 className="text-2xl font-semibold text-center text-white mb-6">
//           {isLogin ? 'Gamer Login' : 'Gamer Sign Up'}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
//           <div className="flex flex-wrap gap-4 w-full">
//             {!isLogin && (
//               <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-style" placeholder="Enter your name" required />
//             )}
//             <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-style" placeholder="Enter your email" required />
//             {!isLogin && (
//               <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-style" placeholder="Enter your phone number" required />
//             )}
//             <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-style" placeholder="Enter your password" required />
//             {!isLogin && (
//               <>
//                 <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-style" placeholder="Enter your state" required />
//                 <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-style" placeholder="Enter your city" required />
//               </>
//             )}
//           </div>

//           {!isLogin && (
//             <div className="flex flex-col gap-2 w-full">
//               <label className="flex items-center text-white">
//                 <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="mr-2" required />
//                 I agree to the <span className="text-purple-300 hover:underline">Terms & Conditions</span>
//               </label>

//               <label className="flex items-center text-white">
//                 <input type="checkbox" name="policy" checked={formData.policy} onChange={handleChange} className="mr-2" required />
//                 I agree to the <span className="text-purple-300 hover:underline">User Policy</span>
//               </label>
//             </div>
//           )}

//           <button type="submit" className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold transition duration-300">
//             {isLogin ? 'Login' : 'Sign Up'}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <button onClick={toggleAuthMode} className="text-purple-300 hover:text-purple-400 underline">
//             {isLogin ? 'Create an account' : 'Already have an account? Login'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// // Tailwind CSS styles (add in your CSS or component):
// // .input-style { @apply w-full px-4 py-2 bg-white bg-opacity-20 border border-transparent rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500; }
