import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import SkillCard from './SkillCard';
import Button from '../../../components/ui/Button';

const RecommendedSkills = () => {
  const navigate = useNavigate();

  const recommendedSkills = [
    {
      id: 5,
      title: "Python for Data Science",
      description: "Learn Python programming specifically for data analysis, visualization, and machine learning applications.",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
      price: "$35/hour",
      isBarter: false,
      rating: 4.9,
      reviewCount: 23,
      isNew: true,
      user: {
        id: 5,
        name: "Dr. Lisa Wang",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        reputation: 1850
      },
      tags: ["Python", "Data Science", "Machine Learning", "Pandas"]
    },
    {
      id: 6,
      title: "Graphic Design Fundamentals",
      description: "Master the basics of graphic design including typography, color theory, and composition principles.",
      category: "Design",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop",
      price: "Barter",
      isBarter: true,
      rating: 4.7,
      reviewCount: 18,
      isNew: false,
      user: {
        id: 6,
        name: "Carlos Martinez",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        reputation: 1420
      },
      tags: ["Adobe", "Typography", "Color Theory", "Branding"]
    },
    {
      id: 7,
      title: "Spanish Conversation Practice",
      description: "Improve your Spanish speaking skills through structured conversation practice and cultural immersion.",
      category: "Languages",
      image: "https://images.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg?w=400&h=300&fit=crop",
      price: "$20/hour",
      isBarter: false,
      rating: 4.8,
      reviewCount: 31,
      isNew: false,
      user: {
        id: 7,
        name: "Maria Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        reputation: 2100
      },
      tags: ["Spanish", "Conversation", "Culture", "Grammar"]
    },
    {
      id: 8,
      title: "Photography Basics",
      description: "Learn the fundamentals of photography including composition, lighting, and camera settings.",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      price: "Barter",
      isBarter: true,
      rating: 4.6,
      reviewCount: 15,
      isNew: true,
      user: {
        id: 8,
        name: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/89.jpg",
        reputation: 980
      },
      tags: ["Photography", "Composition", "Lighting", "Editing"]
    }
  ];

  const handleViewAll = () => {
    navigate('/skill-marketplace-browse', { state: { filter: 'recommended' } });
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-primary mb-1">Recommended for You</h2>
          <p className="text-sm text-secondary">Based on your interests and university</p>
        </div>
        <Button
          variant="ghost"
          onClick={handleViewAll}
          className="flex items-center space-x-2"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {recommendedSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {/* Recommendation Reason */}
      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="text-sm font-medium text-primary mb-1">Why these recommendations?</h3>
            <p className="text-xs text-secondary">
              These skills are popular among Computer Science students at Stanford University and match your learning preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSkills;