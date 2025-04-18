import React, { useState, useEffect } from 'react';
import { EVENTS, SPORTS } from '../data/mockData';
import { Event, SkillLevel } from '../types';
import EventCard from '../components/events/EventCard';
import { ChevronDown, Filter, MapPin, Plus, Search } from 'lucide-react';
import Button from '../components/common/Button';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EventsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(EVENTS);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevel | ''>('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique locations from events
  const locations = Array.from(new Set(EVENTS.map(event => event.location)));

  // Apply filters from URL on mount
  useEffect(() => {
    const sport = searchParams.get('sport');
    if (sport) {
      setSelectedSport(sport);
    }
  }, [searchParams]);
  
  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...events];
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sport filter
    if (selectedSport) {
      result = result.filter(event => event.sport === selectedSport);
    }
    
    // Apply skill level filter
    if (selectedSkillLevel) {
      result = result.filter(event => event.skillLevel === selectedSkillLevel);
    }
    
    // Apply location filter
    if (selectedLocation) {
      result = result.filter(event => event.location.includes(selectedLocation));
    }
    
    setFilteredEvents(result);
  }, [events, searchTerm, selectedSport, selectedSkillLevel, selectedLocation]);
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSport('');
    setSelectedSkillLevel('');
    setSelectedLocation('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sports Events</h1>
            <p className="text-gray-600">
              Discover and join events happening near you
            </p>
          </div>
          
          {isAuthenticated && (
            <Link to="/events/create" className="mt-4 md:mt-0">
              <Button 
                variant="primary" 
                leftIcon={<Plus className="h-5 w-5" />}
              >
                Create Event
              </Button>
            </Link>
          )}
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="p-4 border-b md:hidden">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full py-2 px-4 border border-gray-300 rounded-md bg-white"
            >
              <div className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                <span>Filters</span>
              </div>
              <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className={`p-4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-1">
                  Sport
                </label>
                <select
                  id="sport"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Sports</option>
                  {SPORTS.map(sport => (
                    <option key={sport.id} value={sport.name}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Level
                </label>
                <select
                  id="skillLevel"
                  value={selectedSkillLevel}
                  onChange={(e) => setSelectedSkillLevel(e.target.value as SkillLevel | '')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Levels</option>
                  {Object.values(SkillLevel).map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={resetFilters} 
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </p>
        </div>
        
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any events matching your filters.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;