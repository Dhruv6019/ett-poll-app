import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/LoadingScreen";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // loading will last until 100 (~5s)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Index;