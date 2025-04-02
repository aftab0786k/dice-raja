import React from "react";
import Footer from "./Footer";
import ImageCarousel from "./ImageCarousel";
import Header from "./Header";
import LudoWinners from "./LudoWinners";
import BuySellTokens from "./BuySellTokens";

const Navbar = () => {
  const navbarStyles = {
    container: {
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Oxanium', 'Rajdhani', sans-serif",
      overflow: "hidden",
      position: "relative",
    },
    main: {
      padding: "1rem",
      flex: "1",
      maxWidth: "1400px",
      margin: "0 auto",
      width: "100%",
      position: "relative",
      // zIndex: 2,
    },
    sectionCard: {
      background: "linear-gradient(145deg, rgba(30, 40, 70, 0.9) 0%, rgba(15, 30, 60, 0.95) 100%)",
      // padding: "1rem",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      backdropFilter: "blur(8px)",
      position: "relative",
      overflow: "hidden",
    },
    sectionCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 40px rgba(255, 215, 0, 0.25)",
      border: "1px solid rgba(255, 215, 0, 0.4)",
    },
    upcomingSection: {
      background: "linear-gradient(145deg, rgba(30, 40, 70, 0.9) 0%, rgba(20, 30, 60, 0.95) 100%)",
      padding: "2.5rem",
      borderRadius: "16px",
      border: "1px solid rgba(255, 105, 0, 0.3)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      margin: "3rem auto",
      position: "relative",
      overflow: "hidden",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      textTransform: "uppercase",
      background: "linear-gradient(90deg, #ff8a00 0%, #ff0058 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 15px rgba(255, 105, 0, 0.5)",
      letterSpacing: "1.5px",
      position: "relative",
      display: "inline-block",
      fontFamily: "'Rajdhani', sans-serif",
    },
    titleUnderline: {
      position: "absolute",
      bottom: "-8px",
      left: "0",
      width: "100%",
      height: "3px",
      background: "linear-gradient(90deg, #ff8a00 0%, #ff0058 100%)",
      borderRadius: "3px",
    },
    carouselContainer: {
      margin: "2.5rem auto",
      background: "linear-gradient(180deg, rgba(255, 105, 0, 0.1) 0%, transparent 100%)",
      borderBottom: "1px solid rgba(255, 215, 0, 0.15)",
      position: "relative",
    },
    glowEffect: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "radial-gradient(circle at 50% 50%, rgba(255, 105, 0, 0.1) 0%, transparent 70%)",
      pointerEvents: "none",
      // zIndex: 1,
    },
    hexagonPattern: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      overflow: "hidden",
      // zIndex: 1,
      opacity: "0.1",
      backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHBhdGggZD0iTTAgNTBMMjUgMTI1TDc1IDEyNUwxMDAgNTBMNzUgLTI1TDI1IC0yNUwwIDUwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')",
    },
    cornerAccent: {
      position: "absolute",
      width: "150px",
      height: "150px",
      border: "2px solid rgba(255, 215, 0, 0.3)",
      // zIndex: 1,
    },
    topLeft: {
      top: "0",
      left: "0",
      borderRight: "none",
      borderBottom: "none",
      borderTopLeftRadius: "16px",
    },
    topRight: {
      top: "0",
      right: "0",
      borderLeft: "none",
      borderBottom: "none",
      borderTopRightRadius: "16px",
    },
    bottomLeft: {
      bottom: "0",
      left: "0",
      borderRight: "none",
      borderTop: "none",
      borderBottomLeftRadius: "16px",
    },
    bottomRight: {
      bottom: "0",
      right: "0",
      borderLeft: "none",
      borderTop: "none",
      borderBottomRightRadius: "16px",
    },
  };

  return (
    <div style={navbarStyles.container}>
      {/* Hexagon Pattern Background */}
      <div style={navbarStyles.hexagonPattern}></div>

      {/* Enhanced Header */}
      <Header
        style={{
          background: "linear-gradient(90deg, rgba(26, 26, 46, 0.95) 0%, rgba(21, 33, 62, 0.95) 100%)",
          padding: "1.25rem 2.5rem",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Image Carousel */}
      <div style={navbarStyles.carouselContainer}>
        <div style={navbarStyles.glowEffect}></div>
        <div className="max-w-7xl mx-auto">
          <ImageCarousel />
        </div>
      </div>

      <main style={navbarStyles.main}>
        {/* Cards Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative z-10"
            style={navbarStyles.sectionCard}
          >
            <div style={navbarStyles.glowEffect}></div>
            <div style={{...navbarStyles.cornerAccent, ...navbarStyles.topLeft}}></div>
            <div style={{...navbarStyles.cornerAccent, ...navbarStyles.bottomRight}}></div>
            <LudoWinners />
          </div>
          <div
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative z-10"
            style={navbarStyles.sectionCard}
          >
            <div style={navbarStyles.glowEffect}></div>
            <div style={{...navbarStyles.cornerAccent, ...navbarStyles.topRight}}></div>
            <div style={{...navbarStyles.cornerAccent, ...navbarStyles.bottomLeft}}></div>
            <BuySellTokens />
          </div>
        </section>

        {/* Upcoming Matches */}
        <section style={navbarStyles.upcomingSection}>
          <div style={navbarStyles.glowEffect}></div>
          <div style={{...navbarStyles.cornerAccent, ...navbarStyles.topLeft}}></div>
          <div style={{...navbarStyles.cornerAccent, ...navbarStyles.bottomRight}}></div>
          <h2 style={navbarStyles.title}>
            UPCOMING MATCHES
            <span style={navbarStyles.titleUnderline}></span>
          </h2>
          <div className="flex items-center justify-center p-8 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-xl border border-orange-400/30 shadow-lg relative z-10 backdrop-blur-sm">
            <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
              COMING SOON...
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        style={{
          background: "linear-gradient(to top, rgba(26, 26, 46, 0.95) 0%, rgba(21, 33, 62, 0.95) 100%)",
          padding: "2.5rem",
          borderTop: "1px solid rgba(255, 215, 0, 0.2)",
          boxShadow: "0 -4px 30px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 100,
        }}
      />

      {/* Global Animation Styles */}
      <style jsx global>{`
        @font-face {
          font-family: 'Oxanium';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/oxanium/v8/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G81JfHK5W5qJ4A.woff2) format('woff2');
        }
        
        @font-face {
          font-family: 'Rajdhani';
          font-style: normal;
          font-weight: 500;
          src: url(https://fonts.gstatic.com/s/rajdhani/v10/LDIxapCSOBg7S-QT7p4GM-aUWA.woff2) format('woff2');
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Oxanium', sans-serif;
          background: #1a1a2e;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Navbar;