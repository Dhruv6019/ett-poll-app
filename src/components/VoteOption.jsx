import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp } from "lucide-react";

const VoteOption = ({
  option,
  onVote,
  hasVoted,
  isSelected,
  totalVotes
}) => {
  const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

  return (
    <div
      className={`relative overflow-hidden rounded-lg border transition-all duration-300 ${
        isSelected
          ? "border-pulse-500 bg-pulse-50 shadow-md"
          : "border-border hover:border-pulse-300 hover:shadow-sm"
      }`}
    >
      {/* Progress Bar Background */}
      {hasVoted && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-pulse-100/50 to-transparent transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      )}

      <div className="relative p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground text-lg">
                {option.title}
              </h3>
              {isSelected && (
                <CheckCircle className="w-5 h-5 text-pulse-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {option.description}
            </p>
            
            {hasVoted && (
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  {option.votes} votes
                </div>
                <div className="font-medium text-foreground">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            )}
          </div>

          <div className="ml-4 flex-shrink-0">
            <Button
              onClick={() => onVote(option.id)}
              disabled={hasVoted && !isSelected}
              variant={isSelected ? "default" : hasVoted ? "secondary" : "outline"}
              size="sm"
              className={`min-w-[80px] transition-all duration-300 ${
                isSelected
                  ? "bg-pulse-500 hover:bg-pulse-600 text-white"
                  : hasVoted
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-pulse-500 hover:text-pulse-500"
              }`}
            >
              {isSelected ? "Selected" : hasVoted ? "Voted" : "Vote"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteOption;