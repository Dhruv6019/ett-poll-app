import React from "react";
import Navbar from "@/components/Navbar";
import BackendPoll from "@/components/BackendPoll";
import Footer from "@/components/Footer";

const BackendPollPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <BackendPoll />
      </div>
      <Footer />
    </div>
  );
};

export default BackendPollPage;