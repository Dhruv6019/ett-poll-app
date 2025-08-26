import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultsChart from "@/components/ResultsChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, RefreshCw, BarChart3, TrendingUp, Users, ExternalLink, Trophy, Zap, Target } from "lucide-react";

const getPollData = (pollType) => {
  const defaultData = {
    frontend: {
      options: [
        { id: "react", title: "React", description: "JavaScript library for building user interfaces", votes: 245, color: "hsl(193, 95%, 68%)" },
        { id: "vue", title: "Vue.js", description: "Progressive framework for building UIs", votes: 189, color: "hsl(153, 47%, 49%)" },
        { id: "angular", title: "Angular", description: "Platform for building mobile and desktop apps", votes: 156, color: "hsl(348, 86%, 61%)" },
        { id: "svelte", title: "Svelte", description: "Cybernetically enhanced web apps", votes: 87, color: "hsl(15, 100%, 50%)" }
      ]
    },
    backend: {
      options: [
        { id: "nodejs", title: "Node.js", description: "JavaScript runtime built on Chrome's V8", votes: 312, color: "hsl(120, 100%, 25%)" },
        { id: "python", title: "Python", description: "High-level programming language", votes: 298, color: "hsl(55, 100%, 50%)" },
        { id: "java", title: "Java", description: "Object-oriented programming language", votes: 201, color: "hsl(25, 100%, 50%)" },
        { id: "csharp", title: "C#", description: "Modern language by Microsoft", votes: 167, color: "hsl(280, 100%, 50%)" }
      ]
    },
    devtools: {
      options: [
        { id: "vscode", title: "VS Code", description: "Free source-code editor by Microsoft", votes: 423, color: "hsl(210, 100%, 60%)" },
        { id: "webstorm", title: "WebStorm", description: "Powerful IDE for JavaScript development", votes: 156, color: "hsl(45, 100%, 50%)" },
        { id: "vim", title: "Vim/Neovim", description: "Highly configurable text editor", votes: 134, color: "hsl(120, 50%, 40%)" },
        { id: "sublime", title: "Sublime Text", description: "Sophisticated text editor", votes: 89, color: "hsl(30, 100%, 50%)" }
      ]
    }
  };
  
  const storageKey = `poll_${pollType}`;
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  return defaultData[pollType] || { options: [] };
};

const ResultsPage = () => {
  const navigate = useNavigate();
  const [allPolls, setAllPolls] = useState({});
  const [loading, setLoading] = useState(true);

  const pollConfigs = {
    frontend: {
      title: "Frontend Frameworks",
      description: "Most popular frontend frameworks and libraries",
      storageKey: "frontendPollData",
      icon: "⚛️",
      route: "/frontend-poll",
      color: "from-blue-500 to-purple-600",
      gradient: "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
    },
    backend: {
      title: "Backend Technologies",
      description: "Preferred backend technologies and frameworks",
      storageKey: "backendPollData", 
      icon: "🔧",
      route: "/backend-poll",
      color: "from-green-500 to-blue-600",
      gradient: "bg-gradient-to-r from-green-500/10 to-blue-500/10"
    },
    devtools: {
      title: "Developer Tools",
      description: "Essential development tools and editors",
      storageKey: "devToolsPollData",
      icon: "🛠️",
      route: "/devtools-poll",
      color: "from-purple-500 to-pink-600",
      gradient: "bg-gradient-to-r from-purple-500/10 to-pink-500/10"
    }
  };



  useEffect(() => {
    loadAllPollResults();
    
    // Set up storage event listener for real-time updates
    const handleStorageChange = (e) => {
      if (Object.values(pollConfigs).some(config => config.storageKey === e.key)) {
        loadAllPollResults();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handlePollUpdate = () => loadAllPollResults();
    window.addEventListener('pollDataUpdated', handlePollUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pollDataUpdated', handlePollUpdate);
    };
  }, []);

  const loadAllPollResults = async () => {
    try {
      setLoading(true);
      const polls = {};
      Object.keys(pollConfigs).forEach(key => {
        const data = getPollData(key);
        polls[key] = data;
      });
      setAllPolls(polls);
    } catch (error) {
      console.error("Error loading poll results:", error);
    } finally {
      setLoading(false);
    }
  };

  // getDefaultPollData is now handled by usePollData hook

  const getTotalVotes = (options) => {
    if (!options) return 0;
    return options.reduce((total, option) => total + option.votes, 0);
  };

  const getLeadingOption = (options) => {
    if (!options || options.length === 0) return null;
    return options.reduce((leading, option) => 
      option.votes > leading.votes ? option : leading
    );
  };

  const shareAllResults = async () => {
    const shareData = {
      title: "Developer Poll Results",
      text: "Check out the latest developer poll results across all categories!",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Results URL copied to clipboard!");
    }
  };

  const resetAllPolls = () => {
    if (window.confirm("Are you sure you want to reset all polls? This cannot be undone.")) {
      Object.values(pollConfigs).forEach(config => {
        localStorage.removeItem(config.storageKey);
      });
      loadAllPollResults();
    }
  };

  const getOverallStats = () => {
    let totalVotes = 0;
    let totalOptions = 0;
    let activePolls = 0;

    Object.keys(allPolls).forEach(pollType => {
      const poll = allPolls[pollType];
      if (poll && poll.options) {
        const votes = getTotalVotes(poll.options);
        totalVotes += votes;
        totalOptions += poll.options.length;
        if (votes > 0) activePolls++;
      }
    });

    return { totalVotes, totalOptions, activePolls };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading poll results...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const overallStats = getOverallStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-8 hover:bg-transparent hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <BarChart3 className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Developer Poll Results
                </h1>
              </div>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Comprehensive overview of all developer polls with real-time results and insights
              </p>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Total Votes
                  </Badge>
                </div>
                <CardTitle className="text-3xl mt-4">{overallStats.totalVotes.toLocaleString()}</CardTitle>
                <CardDescription className="text-base">Across all polls</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-green-500/10 rounded-xl">
                    <Target className="h-6 w-6 text-green-500" />
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Options
                  </Badge>
                </div>
                <CardTitle className="text-3xl mt-4">{overallStats.totalOptions}</CardTitle>
                <CardDescription className="text-base">Available choices</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Zap className="h-6 w-6 text-purple-500" />
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    Active Polls
                  </Badge>
                </div>
                <CardTitle className="text-3xl mt-4">{Object.keys(pollConfigs).length}</CardTitle>
                <CardDescription className="text-base">Categories</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              onClick={shareAllResults}
              className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Results
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={resetAllPolls}
              className="w-full sm:w-auto border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Reset All Polls
            </Button>
          </div>

          {/* Poll Categories Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {Object.keys(pollConfigs).map((pollType) => {
              const config = pollConfigs[pollType];
              const poll = allPolls[pollType];
              const totalVotes = getTotalVotes(poll?.options);
              const leadingOption = getLeadingOption(poll?.options);

              return (
                <Card key={pollType} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className={`h-2 ${config.gradient}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl p-3 rounded-2xl bg-muted/50">
                        {config.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{config.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {config.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-xl bg-muted/30">
                        <div className="text-2xl font-bold text-primary">{totalVotes}</div>
                        <div className="text-sm text-muted-foreground">Total Votes</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-muted/30">
                        <div className="text-2xl font-bold text-primary">{poll?.options?.length || 0}</div>
                        <div className="text-sm text-muted-foreground">Options</div>
                      </div>
                    </div>

                    {/* Leading Option */}
                    {leadingOption && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">Leading</span>
                        </div>
                        <div className="font-semibold text-lg">{leadingOption.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {leadingOption.votes} votes ({totalVotes > 0 ? ((leadingOption.votes / totalVotes) * 100).toFixed(1) : 0}%)
                        </div>
                      </div>
                    )}

                    {/* Mini Chart */}
                    <div className="h-40">
                      {poll?.options && <ResultsChart options={poll.options} />}
                    </div><br/><br/>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1"
                        onClick={() => navigate(config.route)}
                      >
                        Vote Now
                      </Button>
                      <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const element = document.getElementById(`poll-${pollType}`);
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="hover:bg-primary hover:text-primary-foreground"
                        title="View detailed results"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Results Section */}
          <div className="mb-16">
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b">
                <div className="text-center">
                  <CardTitle className="text-3xl mb-2">Complete Poll Breakdown</CardTitle>
                  <CardDescription className="text-lg">
                    Detailed analysis of all poll categories
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-12">
                  {Object.keys(pollConfigs).map((pollType) => {
                    const config = pollConfigs[pollType];
                    const poll = allPolls[pollType];
                    const totalVotes = getTotalVotes(poll?.options);

                    return (
                      <div key={pollType} id={`poll-${pollType}`} className="space-y-8">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="text-5xl">{config.icon}</span>
                            <div>
                              <h3 className="text-3xl font-bold">{config.title}</h3>
                              <p className="text-muted-foreground text-lg">{config.description}</p>
                            </div>
                          </div>
                        </div>
                        
                        {poll?.options && (
                          <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-xl font-semibold mb-4 text-center">Vote Distribution</h4>
                                <div className="h-64">
                                  <ResultsChart options={poll.options} />
                                </div>
                              </div>
                              
                              <div className="text-center p-6 rounded-2xl bg-muted/20">
                                <div className="text-3xl font-bold text-primary">{totalVotes}</div>
                                <div className="text-muted-foreground">Total votes cast</div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="text-xl font-semibold text-center mb-6">Detailed Results</h4>
                              <div className="space-y-3">
                                {poll.options
                                  .sort((a, b) => b.votes - a.votes)
                                  .map((option, index) => {
                                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                                    return (
                                      <div key={option.id} className="group">
                                        <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                                          <div className="flex items-center gap-4">
                                            <Badge 
                                              variant={index === 0 ? "default" : "secondary"}
                                              className="w-8 h-8 flex items-center justify-center text-sm font-bold"
                                            >
                                              {index + 1}
                                            </Badge>
                                            <div>
                                              <div className="font-semibold text-lg">{option.title}</div>
                                              <div className="text-sm text-muted-foreground">{option.description}</div>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <div className="text-2xl font-bold">{option.votes}</div>
                                            <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</div><br/><br/>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {pollType !== Object.keys(pollConfigs)[Object.keys(pollConfigs).length - 1] && (
                          <div className="border-t my-8"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultsPage;