import React from 'react';
import { MapPin } from 'lucide-react';
import { User, SkillLevel } from '../../types';
import Card, { CardBody, CardFooter } from '../common/Card';
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  // Helper function to get skill level badge color
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
      <div className="p-4 text-center">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
        />
        <h3 className="font-bold text-xl mb-1 text-gray-800">{user.name}</h3>
        
        <div className="flex items-center justify-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{user.location || 'No location set'}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{user.bio || 'No bio available'}</p>
      </div>
      
      <div className="px-4 pb-2 flex-grow">
        <h4 className="font-medium text-sm text-gray-500 uppercase mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm font-medium text-gray-700">{skill.sport}</span>
                <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${getSkillLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
              </div>
            ))
          ) : (
            <span className="text-sm text-gray-500">No skills listed</span>
          )}
        </div>
      </div>
      
      <CardFooter className="border-t border-gray-100">
        <Link 
          to={`/buddies/${user.id}`}
          className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Profile
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UserCard;