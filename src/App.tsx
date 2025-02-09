import React, { useState } from 'react';
import { Compass, DollarSign } from 'lucide-react';
import type { Mood, TripRequest, TripResponse } from './types/trip';

function App() {
  const [mood, setMood] = useState<Mood>('relaxed');
  const [budget, setBudget] = useState<number>(1000);
  const [destinations, setDestinations] = useState<TripResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const moods: Mood[] = ['adventurous', 'relaxed', 'romantic', 'cultural', 'party'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const request: TripRequest = {
      mood,
      budget
    };

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/trip-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      const data: TripResponse = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Compass className="text-blue-600" />
            Trip Finder
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your mood?
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value as Mood)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {moods.map((m) => (
                  <option key={m} value={m}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your budget? ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  min="100"
                  step="100"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Finding destinations...' : 'Find My Perfect Trip'}
            </button>
          </form>
        </div>

        {destinations && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.destinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {dest.name}, {dest.country}
                  </h3>
                  <p className="text-gray-600 mb-4">{dest.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">
                      ${dest.estimatedCost.toLocaleString()}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {dest.activities.map((activity, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;