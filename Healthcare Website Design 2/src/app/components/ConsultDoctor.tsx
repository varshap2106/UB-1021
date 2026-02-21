import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, CheckCircle2, Video, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ConsultDoctor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    consultType: 'video',
    concern: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        consultType: 'video',
        concern: '',
      });
    }, 2000);
  };

  const doctors = [
    {
      name: 'Dr. Priya Sharma',
      specialization: 'Classical Ayurveda & Panchakarma',
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      rating: 4.9,
      consultations: '2000+',
    },
    {
      name: 'Dr. Rajesh Kumar',
      specialization: 'Ayurvedic Medicine & Nutrition',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      rating: 4.8,
      consultations: '1500+',
    },
    {
      name: 'Dr. Anjali Desai',
      specialization: 'Herbal Medicine & Rasayana',
      experience: '18 years',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      rating: 4.9,
      consultations: '2500+',
    },
  ];

  return (
    <section id="consult" className="py-20 bg-gradient-to-b from-white via-[#F0F4F1] to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#2D5F3F]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#4A8B5F]/15 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2D5F3F]/10 border border-[#2D5F3F]/20 mb-6">
            <Video className="w-4 h-4 text-[#2D5F3F]" />
            <span className="text-sm font-semibold text-[#1A2F1A]">Expert Consultation Available</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A2F1A] mb-6" style={{ fontFamily: 'var(--font-family-heading)' }}>
            Consult Our Certified
            <span className="block bg-gradient-to-r from-[#2D5F3F] to-[#4A8B5F] bg-clip-text text-transparent">
              Ayurvedic Practitioners
            </span>
          </h2>
          <p className="text-lg text-[#2D3E2D] max-w-3xl mx-auto leading-relaxed font-medium">
            Connect with experienced Ayurvedic doctors for personalized guidance, treatment plans, and holistic wellness support
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-[#8BA888]/20 shadow-xl hover:shadow-2xl hover:border-[#8BA888]/40 transition-all duration-500">
                {/* Doctor Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute top-0 right-1/4 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    ⭐ {doctor.rating}
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#2C3D2B] mb-2">{doctor.name}</h3>
                  <p className="text-sm text-[#8BA888] font-medium mb-1">{doctor.specialization}</p>
                  <p className="text-xs text-[#5A6B59]">{doctor.experience} experience</p>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-[#8BA888]">{doctor.consultations}</p>
                    <p className="text-xs text-[#5A6B59]">Consultations</p>
                  </div>
                  <div className="w-px bg-[#8BA888]/20" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-[#8BA888]">98%</p>
                    <p className="text-xs text-[#5A6B59]">Satisfaction</p>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white font-semibold hover:shadow-xl hover:shadow-[#8BA888]/30 transition-all duration-300 transform group-hover:scale-105"
                >
                  Book Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Consultation Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Video,
              title: 'Video Consultations',
              description: 'Connect face-to-face with experts from anywhere',
            },
            {
              icon: Calendar,
              title: 'Flexible Scheduling',
              description: 'Choose appointment times that work for you',
            },
            {
              icon: MapPin,
              title: 'In-Person Available',
              description: 'Visit our wellness centers for detailed assessment',
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#8BA888]/5 to-[#E8DCC4]/10 border border-[#8BA888]/10 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#8BA888]/20 mx-auto mb-4 flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-[#8BA888]" />
              </div>
              <h4 className="font-semibold text-[#2C3D2B] mb-2">{benefit.title}</h4>
              <p className="text-sm text-[#5A6B59]">{benefit.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Appointment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {!isSubmitted ? (
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-[#2C3D2B] mb-2">Book Your Consultation</h3>
                  <p className="text-[#5A6B59] mb-8">Fill in your details and we'll confirm your appointment</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#3D4A3C] mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8BA888]" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#8BA888]/20 focus:border-[#8BA888] focus:outline-none transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3D4A3C] mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8BA888]" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#8BA888]/20 focus:border-[#8BA888] focus:outline-none transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#3D4A3C] mb-2">
                          Phone *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8BA888]" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#8BA888]/20 focus:border-[#8BA888] focus:outline-none transition-colors"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3D4A3C] mb-2">
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8BA888]" />
                          <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#8BA888]/20 focus:border-[#8BA888] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#3D4A3C] mb-2">
                          Preferred Time *
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8BA888]" />
                          <input
                            type="time"
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#8BA888]/20 focus:border-[#8BA888] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Consultation Type */}
                    <div>
                      <label className="block text-sm font-medium text-[#3D4A3C] mb-2">
                        Consultation Type *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, consultType: 'video' })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.consultType === 'video'
                              ? 'border-[#8BA888] bg-[#8BA888]/10'
                              : 'border-[#8BA888]/20 hover:border-[#8BA888]/40'
                          }`}
                        >
                          <Video className="w-6 h-6 mx-auto mb-2 text-[#8BA888]" />
                          <p className="text-sm font-medium text-[#3D4A3C]">Video Call</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, consultType: 'in-person' })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.consultType === 'in-person'
                              ? 'border-[#8BA888] bg-[#8BA888]/10'
                              : 'border-[#8BA888]/20 hover:border-[#8BA888]/40'
                          }`}
                        >
                          <MapPin className="w-6 h-6 mx-auto mb-2 text-[#8BA888]" />
                          <p className="text-sm font-medium text-[#3D4A3C]">In-Person</p>
                        </button>
                      </div>
                    </div>

                    {/* Concern */}
                    <div>
                      <label className="block text-sm font-medium text-[#3D4A3C] mb-2">
                        Your Health Concern (Optional)
                      </label>
                      <textarea
                        value={formData.concern}
                        onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#8BA888]/20 focus:border-[#8BA888] focus:outline-none transition-colors resize-none"
                        placeholder="Describe your health concerns or questions..."
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-3 rounded-xl border-2 border-[#8BA888]/20 text-[#5A6B59] font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#8BA888] to-[#6B9468] text-white font-semibold hover:shadow-xl hover:shadow-[#8BA888]/30 transition-all"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-[#8BA888] to-[#6B9468] mx-auto mb-6 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#2C3D2B] mb-3">Appointment Requested!</h3>
                  <p className="text-[#5A6B59]">
                    We'll send you a confirmation email shortly with further details.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}