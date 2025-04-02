import React ,{useEffect, useState} from 'react'
// import Button from './Button'; // Make sure to import the Button component

const Register = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
   useEffect(() => {
     const createSparkles = () => {
       const sparklesContainer = document.getElementById('sparkles');
       const numSparkles = 50;
 
       for (let i = 0; i < numSparkles; i++) {
         const sparkle = document.createElement('div');
         sparkle.style.left = `${Math.random() * 100}vw`;
         sparkle.style.top = `${Math.random() * 100}vh`;
         sparkle.style.animationDelay = `${Math.random() * 2}s`;
         sparkle.style.animationDelay = `${Math.random() * 2}s`;
         sparklesContainer?.appendChild(sparkle);
       }
     };
 
     createSparkles();
   }, []);
 
   const toggleMobileMenu = () => {
     setIsMobileMenuOpen(!isMobileMenuOpen);
   };
 
   return (
     <div className="bg-[#1a1a1a] font-poppins">
       <nav className="bg-black py-4">
         <div className="container mx-auto px-4 flex justify-between items-center">
           <div className="flex items-center">
             <img src="https://source.unsplash.com/50x50/daily?game" alt="Ludo King Logo" className="w-12 h-12" />
             <span className="text-white text-xl font-bold ml-2">LUDO KING</span>
           </div>
           <div className={`md:flex space-x-6 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
             {['HOME', 'ABOUT', 'FAQS', 'ADVERTISE WITH US', 'FEATURES', 'MEDIA', 'REVIEWS', 'DOWNLOAD', 'CONTACT'].map((item) => (
               <a key={item} href="#" className="text-white">
                 {item}
               </a>
             ))}
           </div>
           <button
             className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition duration-300"
           >
             PLAY NOW
           </button>
           <button
             variant="ghost"
             className="md:hidden text-white"
             onClick={toggleMobileMenu}
           >
             <i className="bi bi-list text-2xl"></i>
           </button>
         </div>
       </nav>
 
       <div className="hero-gradient min-h-screen relative overflow-hidden">
         <div className="container mx-auto px-4 py-16 relative">
           <div className="grid md:grid-cols-2 gap-8 items-center">
             <div className="text-white space-y-6">
               <div className="text-8xl font-bold">#1</div>
               <div className="text-4xl font-bold">GAME ON</div>
               <div className="text-5xl font-bold text-blue-400">GOOGLE PLAY &</div>
               <div className="text-4xl font-bold">APP STORE</div>
               <button
                 variant="secondary"
                 className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition duration-300"
               >
                 Download Now
               </button>
             </div>
             <div className="relative">
               <img src="https://source.unsplash.com/400x400/daily?dice" alt="Ludo Mascot" className="w-64 mx-auto" />
               <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                 <img src="https://source.unsplash.com/100x100/daily?crown" alt="Crown" className="w-16 crown-glow" />
               </div>
             </div>
           </div>
         </div>
         <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2">
           <i className="bi bi-dice-6 text-white text-6xl dice-animation"></i>
         </div>
         <div id="sparkles"></div>
       </div>
     </div>
   );
 };

export default Register