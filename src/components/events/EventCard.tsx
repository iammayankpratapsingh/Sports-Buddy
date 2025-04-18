import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event, SkillLevel } from '../../types';
import Card, { CardBody, CardFooter } from '../common/Card';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get skill level badge color
  const getSkillLevelColor = (level: SkillLevel) => {
    switch (level) {
      case SkillLevel.Beginner:
        return 'bg-green-100 text-green-800';
      case SkillLevel.Intermediate:
        return 'bg-blue-100 text-blue-800';
      case SkillLevel.Advanced:
        return 'bg-purple-100 text-purple-800';
      case SkillLevel.Professional:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(event.skillLevel)}`}>
            {event.skillLevel}
          </span>
        </div>
        <div className="absolute top-0 left-0 m-2 bg-blue-600 text-white text-sm font-medium px-2 py-1 rounded">
          {event.sport}
        </div>
      </div>
      
      <CardBody className="flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">{event.title}</h3>
        <p className="text-gray-600 line-clamp-2 mb-4">{event.description}</p>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{formatDate(event.date)} • {event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm line-clamp-1">{event.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.participants.length} / {event.maxParticipants} participants</span>
        </div>
      </CardBody>
      
      <CardFooter className="border-t border-gray-100">
        <Link 
          to={`/events/${event.id}`}
          className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;