import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { EVENTS, USERS } from '../data/mockData';
import { Event, User } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  User as UserIcon, 
  Users, 
  ArrowLeft, 
  Check, 
  Trash2, 
  Edit 
} from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import Card, { CardBody } from '../components/common/Card';

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [host, setHost] = useState<User | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is already participating
  const isParticipating = user && event?.participants.includes(user.id);
  // Check if user is the host
  const isHost = user && event?.host === user.id;

  useEffect(() => {
    // Find event by ID
    const foundEvent = EVENTS.find(e => e.id === eventId);
    if (foundEvent) {
      setEvent(foundEvent);
      
      // Find host
      const foundHost = USERS.find(u => u.id === foundEvent.host);
      if (foundHost) setHost(foundHost);
      
      // Find participants
      const foundParticipants = USERS.filter(u => foundEvent.participants.includes(u.id));
      setParticipants(foundParticipants);
    } else {
      // Event not found, redirect to events page
      navigate('/events');
    }
  }, [eventId, navigate]);

  if (!event || !host) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Convert time string to readable format
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Format duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} minutes`;
    } else if (mins === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minutes`;
    }
  };

  // Join event handler
  const handleJoinEvent = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // In a real app, this would be an API call
    console.log('Joining event:', event.id);
    
    // For demo purposes, update the local state
    if (user && event) {
      const updatedEvent = { 
        ...event, 
        participants: [...event.participants, user.id] 
      };
      setEvent(updatedEvent);
      setParticipants([...participants, user]);
    }
  };
  
  // Leave event handler
  const handleLeaveEvent = () => {
    if (!user || !event) return;
    
    // In a real app, this would be an API call
    console.log('Leaving event:', event.id);
    
    // For demo purposes, update the local state
    const updatedEvent = { 
      ...event, 
      participants: event.participants.filter(id => id !== user.id) 
    };
    setEvent(updatedEvent);
    setParticipants(participants.filter(p => p.id !== user.id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            to="/events" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Events
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 md:h-80">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {event.sport}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {event.skillLevel}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    <span>{formatTime(event.time)} ({formatDuration(event.duration)})</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    <span>{event.participants.length} / {event.maxParticipants} participants</span>
                  </div>
                </div>
                
                <div className="border-t border-b py-6 my-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">About This Event</h2>
                  <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline"
                    leftIcon={<Share2 className="h-4 w-4" />}
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: event.title,
                          text: `Check out this event: ${event.title}`,
                          url: window.location.href,
                        });
                      }
                    }}
                  >
                    Share Event
                  </Button>
                  
                  {isHost ? (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline"
                        leftIcon={<Edit className="h-4 w-4" />}
                        onClick={() => navigate(`/events/${event.id}/edit`)}
                      >
                        Edit Event
                      </Button>
                      <Button 
                        variant="danger"
                        leftIcon={<Trash2 className="h-4 w-4" />}
                        onClick={() => {
                          // In a real app, this would be an API call with confirmation
                          console.log('Delete event:', event.id);
                          navigate('/events');
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : (
                    isParticipating ? (
                      <Button 
                        variant="outline"
                        className="border-red-500 text-red-600 hover:bg-red-50"
                        onClick={handleLeaveEvent}
                      >
                        Leave Event
                      </Button>
                    ) : (
                      <Button 
                        variant="primary"
                        leftIcon={<Check className="h-4 w-4" />}
                        onClick={handleJoinEvent}
                        disabled={event.participants.length >= event.maxParticipants}
                      >
                        {event.participants.length >= event.maxParticipants ? 'Event Full' : 'Join Event'}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Info */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Event Host</h2>
                <div className="flex items-center">
                  <img 
                    src={host.avatar} 
                    alt={host.name} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{host.name}</h3>
                    <p className="text-gray-600 text-sm">{host.location}</p>
                    <Link 
                      to={`/buddies/${host.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 inline-block"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            {/* Participants */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Participants</h2>
                {participants.length > 0 ? (
                  <div className="space-y-4">
                    {participants.map(participant => (
                      <div key={participant.id} className="flex items-center">
                        <img 
                          src={participant.avatar} 
                          alt={participant.name} 
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">{participant.name}</h3>
                          <p className="text-gray-600 text-xs">{participant.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <UserIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No participants yet</p>
                  </div>
                )}
                
                <div className="mt-4 text-center text-gray-600 text-sm">
                  {event.participants.length} of {event.maxParticipants} spots filled
                </div>
              </CardBody>
            </Card>
            
            {/* Map Placeholder */}
            <Card>
              <CardBody>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
                <div className="bg-gray-200 rounded-lg h-52 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <p className="mt-3 text-gray-600">
                  {event.location}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;