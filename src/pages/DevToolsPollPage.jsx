import React from "react";
import Navbar from "@/components/Navbar";
import DevToolsPoll from "@/components/DevToolsPoll";
import Footer from "@/components/Footer";

const DevToolsPollPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <DevToolsPoll />
      </div>
      <Footer />
    </div>
  );
};

export default DevToolsPollPage;