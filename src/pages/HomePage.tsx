import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, Users } from 'lucide-react';
import { EVENTS, SPORTS, USERS } from '../data/mockData';
import EventCard from '../components/events/EventCard';
import UserCard from '../components/users/UserCard';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  // Get featured events and users
  const featuredEvents = EVENTS.slice(0, 3);
  const featuredUsers = USERS.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect <span className="text-green-400">Sports Partner</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl opacity-90">
            Connect with local athletes, join sports events, and elevate your game with the perfect match for your skill level and interests.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/events">
              <Button 
                variant="secondary" 
                size="lg"
                leftIcon={<Calendar className="h-5 w-5" />}
              >
                Discover Events
              </Button>
            </Link>
            <Link to="/buddies">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                leftIcon={<Users className="h-5 w-5" />}
              >
                Find Buddies
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L48 45.7C96 41.3 192 32.7 288 27.2C384 21.7 480 19.3 576 25.8C672 32.3 768 47.7 864 52.5C960 57.3 1056 51.7 1152 43.3C1248 35 1344 24 1392 18.5L1440 13V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How SportsBuddy Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Finding your next sports partner or activity is easy with our simple three-step process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-6 text-blue-600">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Find Sports & Activities</h3>
              <p className="text-gray-600">
                Browse through various sports categories and discover activities happening near you
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-green-100 p-4 rounded-full mb-6 text-green-600">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Connect with Buddies</h3>
              <p className="text-gray-600">
                Find and connect with sports enthusiasts who match your skill level and interests
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-orange-100 p-4 rounded-full mb-6 text-orange-600">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Join Events</h3>
              <p className="text-gray-600">
                Participate in local sports events or create your own to find more buddies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Events</h2>
              <p className="text-gray-600">Join upcoming sports events in your area</p>
            </div>
            <Link to="/events">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Sports Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore Sports Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find activities and buddies for your favorite sports
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SPORTS.map(sport => (
              <Link 
                key={sport.id} 
                to={`/events?sport=${sport.name}`}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-3 text-blue-600">
                  <span className="text-xl">{sport.name.charAt(0)}</span>
                </div>
                <span className="font-medium text-gray-800">{sport.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Buddies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Buddies</h2>
              <p className="text-gray-600">Connect with sports enthusiasts near you</p>
            </div>
            <Link to="/buddies">
              <Button variant="outline">Find More Buddies</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Sports Buddy?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of sports enthusiasts already connecting and playing together
          </p>
          <Link to="/signup">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;