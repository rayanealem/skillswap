import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilityCalendar = ({ availability, timeZone }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);

  const getWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentWeek);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getAvailabilityForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availability[dateStr] || [];
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isDatePast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const nextWeek = () => {
    setCurrentWeek(prev => prev + 1);
    setSelectedDate(null);
  };

  const prevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(prev => prev - 1);
      setSelectedDate(null);
    }
  };

  const handleDateSelect = (date) => {
    if (!isDatePast(date)) {
      setSelectedDate(date);
    }
  };

  const handleTimeSlotBook = (timeSlot) => {
    console.log('Booking time slot:', timeSlot);
    // Handle booking logic here
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Availability</h3>
        <div className="flex items-center space-x-2 text-sm text-secondary">
          <Icon name="Clock" size={16} />
          <span>{timeZone}</span>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={prevWeek}
          disabled={currentWeek === 0}
          className="p-2"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <div className="text-center">
          <h4 className="font-medium text-primary">
            {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h4>
          <p className="text-sm text-secondary">
            {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
            {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
        
        <Button
          variant="ghost"
          onClick={nextWeek}
          className="p-2"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const dayAvailability = getAvailabilityForDate(date);
          const isPast = isDatePast(date);
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          const hasAvailability = dayAvailability.length > 0;

          return (
            <div key={index} className="text-center">
              {/* Day Header */}
              <div className="text-xs text-secondary mb-2 font-medium">
                {dayNames[index]}
              </div>
              
              {/* Date Button */}
              <button
                onClick={() => handleDateSelect(date)}
                disabled={isPast || !hasAvailability}
                className={`w-full aspect-square rounded-lg border transition-all duration-200 ${
                  isPast
                    ? 'bg-surface border-border text-secondary cursor-not-allowed opacity-50'
                    : !hasAvailability
                    ? 'bg-surface border-border text-secondary cursor-not-allowed'
                    : isSelected
                    ? 'bg-primary border-primary text-white' :'bg-surface border-border text-primary hover:border-primary hover:bg-primary/10'
                }`}
              >
                <div className="text-sm font-medium">
                  {date.getDate()}
                </div>
                {hasAvailability && !isPast && (
                  <div className="text-xs mt-1">
                    {dayAvailability.length} slots
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="space-y-4">
          <h4 className="font-medium text-primary">
            Available Times - {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {getAvailabilityForDate(selectedDate).map((timeSlot, index) => (
              <Button
                key={index}
                variant={timeSlot.isBooked ? "ghost" : "outline"}
                onClick={() => !timeSlot.isBooked && handleTimeSlotBook(timeSlot)}
                disabled={timeSlot.isBooked}
                className={`p-3 text-center ${
                  timeSlot.isBooked 
                    ? 'opacity-50 cursor-not-allowed' :'hover:bg-primary hover:text-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-sm font-medium">
                    {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
                  </div>
                  {timeSlot.isBooked && (
                    <div className="text-xs text-error">Booked</div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Booking Note */}
      <div className="bg-surface-secondary rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">Booking Information</p>
            <p className="text-xs text-secondary">
              Select a date to view available time slots. All times are shown in {timeZone}. 
              Sessions can be conducted online or in-person based on mutual agreement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;