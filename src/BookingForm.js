import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './BookingForm.css';

const BookingForm = () => {
  const location = useLocation();
  const selectedHorse = location.state?.horse || '';

  const [formData, setFormData] = useState({
    horse: selectedHorse.name || '',
    origin: selectedHorse.origin || '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [isTimeValid, setIsTimeValid] = useState(true);

  useEffect(() => {
    if (selectedHorse) {
      setFormData((prevData) => ({
        ...prevData,
        horse: selectedHorse.name,
        origin: selectedHorse.origin,
      }));
    }
  }, [selectedHorse]);

  useEffect(() => {
    if (formData.date) {
      generateTimeSlots(new Date(formData.date));
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'time') {
      validateTime(value);
    }
  };

  const generateTimeSlots = (date) => {
    const day = date.getDay();
    let slots = [];

    if (day >= 1 && day <= 5) { // Monday to Friday
      for (let i = 9; i < 24; i++) { // 3 PM to 12 AM
        slots.push(`${i < 10 ? '0' : ''}${i}:00`);
      }
    } else if (day === 6) { // Saturday
      for (let i = 15; i < 24; i++) { // 3 PM to 12 AM
        slots.push(`${i < 10 ? '0' : ''}${i}:00`);
      }
    } else if (day === 0) { // Sunday (Holiday)
      slots.push("Happy Holiday");
    }

    setTimeSlots(slots);
  };

  const validateTime = (time) => {
    setIsTimeValid(timeSlots.includes(time));
  };

  const generateGoogleCalendarLink = () => {
    const { horse, origin, date, time} = formData;

    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + (60 * 60 * 1000)); // Assuming 1 hour duration

    const startDate = startTime.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = endTime.toISOString().replace(/-|:|\.\d+/g, '');

    const calendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Horse+Riding+Session&dates=${startDate}/${endDate}&details=You+have+booked+a+horse+riding+session+for+${horse}+(${origin})+on+${date}+at ${time}.&location=&sf=true&output=xml`;
    
    return calendarURL;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isTimeValid) {
      toast.error('Please select a valid time slot.');
      return;
    }

    // Generate Google Calendar link
    const calendarURL = generateGoogleCalendarLink();

    // Display notification
    toast.success(
      `Booking confirmed for ${formData.horse} (${formData.origin})! Thank you, ${formData.name}.`,
      {
        position: "top-center",
        autoClose: 5000,
      }
    );

    // Optionally, you can reset the form after submission
    setFormData({
      horse: '',
      origin: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
    });

    // Open Google Calendar link in a new tab
    window.open(calendarURL, '_blank');
  };

  return (
    <div className="booking-form">
      <h2>Book a Horse Ride</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Horse:
          <select name="horse" value={formData.horse} onChange={handleChange} required>
            <option value="">Select a horse</option>
            <option value="Warmbloods">Warmbloods</option>
            <option value="American Quarter Horse">American Quarter Horse</option>
            <option value="Andalusian horse">Andalusian horse</option>
            <option value="Friesian">Friesian</option>
          </select>
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          Time:
          <select name="time" value={formData.time} onChange={handleChange} required>
            <option value="">Select a time</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn-primary" disabled={!isTimeValid}>Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
