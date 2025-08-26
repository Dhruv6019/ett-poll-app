import React from "react";
import Navbar from "@/components/Navbar";
import FrontendPoll from "@/components/FrontendPoll";
import Footer from "@/components/Footer";

const FrontendPollPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <FrontendPoll />
      </div>
      <Footer />
    </div>
  );
};

export default FrontendPollPage;