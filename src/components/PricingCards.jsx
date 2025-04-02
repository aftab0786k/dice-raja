import { useState } from 'react';

const PricingCards = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-teal-600 via-emerald-500 to-cyan-400 p-1 rounded-[2.5rem] shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
      <div className="relative bg-gray-900/30 backdrop-blur-xl rounded-[2.3rem] p-8 overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-[conic-gradient(from_230deg_at_50%_50%,hsl(180,100%,25%)_0%,hsl(145,70%,45%)_50%,hsl(165,80%,45%)_100%)] opacity-30 animate-gradient-rotate"></div>
        
        {/* Glowing Border */}
        <div className="absolute inset-0 rounded-[2.3rem] border border-white/10 pointer-events-none"></div>
        
        {/* Floating Elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>

        <div className="relative z-10 space-y-6">
          {/* Premium Badge */}
          <div className="flex items-center justify-between">
            <span className="bg-gradient-to-r from-lime-300 to-emerald-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 16l-6.18 3.02L7 12.14 2 7.27l6.91-1.01L12 1z"/>
              </svg>
              VIP ACCESS
            </span>
            <button 
              onClick={handleClose}
              className="text-gray-300 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          {/* Pricing Section */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 to-emerald-300 bg-clip-text text-transparent">
              $99<span className="text-2xl">/month</span>
            </h2>
            <p className="text-gray-400 text-sm">All premium features included</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {['4K Streaming', 'Exclusive Content', 'VIP Support', 'Early Access'].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-gray-200 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={handleClose}
            className="w-full group relative bg-gradient-to-r from-cyan-400 to-emerald-500 hover:from-cyan-500 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-2">
              Get Premium Access
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </button>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -inset-24 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 animate-shine"></div>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;