import { Briefcase, Users, Star } from "lucide-react";

export function JobOpeningsBanner() {
  return (
    <div className="relative rounded-lg overflow-hidden mb-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      <div className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        {/* Text on the left */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-1">We're Hiring!</h3>
          <p className="text-sm text-gray-700 max-w-md">
            Join a passionate team that’s building impactful products every day.
            Discover new opportunities and grow with us.
          </p>
        </div>

        {/* Icons on the right */}
        <div className="flex gap-4 pr-2">
          <Briefcase className="w-6 h-6 text-indigo-500" />
          <Users className="w-6 h-6 text-purple-500" />
          <Star className="w-6 h-6 text-pink-500" />
        </div>
      </div>
    </div>
  );
}
