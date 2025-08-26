import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, BarChart3 } from "lucide-react";

const HeroSection = () => {
  const scrollToPoll = () => {
    const pollSection = document.getElementById('poll');
    if (pollSection) {
      pollSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-pulse-50/30 to-pulse-100/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/hero-image.jpg')] bg-cover bg-center opacity-5"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <br/><br/>
          <div className="inline-flex items-center gap-2 pulse-chip mb-6 animate-fade-in">
            <TrendingUp className="w-4 h-4" />
            Live Voting Platform
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 animate-fade-in stagger-1">
            Vote in Our
            <br />
            <span className="text-transparent bg-gradient-to-r from-pulse-500 to-pulse-600 bg-clip-text">
              Developer Polls
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in stagger-2">
            Join thousands of developers across multiple polls. Cast your votes and watch real-time results with beautiful charts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in stagger-3">
            <Button 
              size="lg" 
              className="button-primary text-lg px-8 py-4"
              onClick={() => {
                window.location.href = "/frontend-poll";
              }}
            >
              Start Voting Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="button-secondary text-lg px-8 py-4"
              onClick={() => {
                window.location.href = "/results/frontend";
              }}
            >
              View Results
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in stagger-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-pulse-100 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-pulse-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">677+</div>
              <div className="text-muted-foreground">Active Voters</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-pulse-100 rounded-full mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-pulse-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">Real-time</div>
              <div className="text-muted-foreground">Live Results</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-pulse-100 rounded-full mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-pulse-600" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">3</div>
              <div className="text-muted-foreground">Poll Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pulse-200/30 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pulse-300/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pulse-400/25 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default HeroSection;