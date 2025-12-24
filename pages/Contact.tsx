
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    eventType: 'Wedding',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to /api/contact
      // In a real environment, this would be: 
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form Submitted to Placeholder API:', formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4">Get in Touch</h1>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Whether you're planning a wedding, a corporate event, or a personal portrait session, we'd love to hear your story.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8">Studio Information</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl h-fit">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Visit Our Studio</h3>
                    <p className="text-zinc-500">123 Artisan Way, Studio City<br />Los Angeles, CA 91604</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl h-fit">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Call Us</h3>
                    <p className="text-zinc-500">+1 (555) 000-LUMI</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl h-fit">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email Inquiries</h3>
                    <p className="text-zinc-500">hello@Artworld Photography.studio</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl h-fit">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Studio Hours</h3>
                    <p className="text-zinc-500">Mon - Fri: 9am - 6pm<br />Sat: By Appointment Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
               <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Interactive Map Loading...</p>
                  </div>
               </div>
               <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover opacity-30 dark:opacity-10 grayscale"
                alt="Studio Location"
               />
            </div>
          </div>

          {/* Form */}
          <div className="bg-zinc-50 dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                <h2 className="text-3xl font-serif font-bold mb-4">Message Received</h2>
                <p className="text-zinc-500 mb-8">Thank you for reaching out, {formData.firstName}. Our team will review your inquiry and get back to you within 24 hours.</p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ firstName: '', lastName: '', email: '', eventType: 'Wedding', message: '' });
                  }}
                  className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input 
                      required 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-zinc-400 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input 
                      required 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-zinc-400 transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-zinc-400 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event Type</label>
                  <select 
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                  >
                    <option>Wedding</option>
                    <option>Portrait Session</option>
                    <option>Corporate Event</option>
                    <option>Commercial</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea 
                    required 
                    rows={5} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-zinc-400 transition-all" 
                    placeholder="Tell us about your event..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Processing... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Send Inquiry <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
