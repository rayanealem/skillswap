import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const trendingSkills = [
    {
      id: 1,
      title: "React Development",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      price: "$25/hour",
      isBarter: false,
      user: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        reputation: 4.8
      },
      trending: true
    },
    {
      id: 2,
      title: "UI/UX Design",
      category: "Design",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop",
      price: "Barter",
      isBarter: true,
      user: {
        name: "Alex Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        reputation: 4.9
      },
      trending: true
    },
    {
      id: 3,
      title: "Data Analysis",
      category: "Analytics",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=300&fit=crop",
      price: "$30/hour",
      isBarter: false,
      user: {
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        reputation: 4.7
      },
      trending: true
    },
    {
      id: 4,
      title: "Digital Marketing",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      price: "Barter",
      isBarter: true,
      user: {
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        reputation: 4.6
      },
      trending: true
    }
  ];

  const handleSkillClick = (skillId) => {
    navigate('/skill-detail-view', { state: { skillId } });
  };

  const handleViewAll = () => {
    navigate('/skill-marketplace-browse', { state: { filter: 'trending' } });
  };

  return (
    <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">Trending Skills</h2>
          <p className="text-secondary">Discover the most popular skills this week</p>
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

      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {trendingSkills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => handleSkillClick(skill.id)}
            className="flex-shrink-0 w-72 bg-surface border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-elevation-2 transition-all duration-200 animate-scale-hover"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={skill.image}
                alt={skill.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} />
                  <span>Trending</span>
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  skill.isBarter 
                    ? 'bg-accent text-white' :'bg-primary text-white'
                }`}>
                  {skill.price}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                  {skill.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-primary mb-3 line-clamp-1">
                {skill.title}
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image
                    src={skill.user.avatar}
                    alt={skill.user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-secondary">{skill.user.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="var(--color-warning)" />
                  <span className="text-sm font-medium text-warning">
                    {skill.user.reputation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;