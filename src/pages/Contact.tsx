import React, { useState } from 'react';
import { COLLEGE_DATA } from '../data/svceData';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: 'bed', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert(`Thank you, ${formData.name}! Your inquiry has been forwarded to the administrative office.`);
      setFormData({ name: '', email: '', phone: '', course: 'bed', message: '' });
      setSubmitted(false);
    }, 600);
  };

  return (
    <div>
      {/* Banner */}
      <section className="bg-primary-gradient text-white py-12 border-b-4 border-gold">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gold-light mb-2">
            <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
            <span>/</span>
            <span>Contact Us</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Contact &amp; Admissions Help Desk</h2>
          <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl">
            Get in touch with the administrative office of {COLLEGE_DATA.name}.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact Information & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="font-heading text-navy text-xl font-bold border-b border-slate-100 pb-3">
                  Institutional Campus
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-bg text-gold flex items-center justify-center text-sm flex-shrink-0">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <strong className="block text-navy font-bold">Postal Address</strong>
                      <span>{COLLEGE_DATA.address.fullText}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-sm flex-shrink-0">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <strong className="block text-navy font-bold">Telephone &amp; Mobile</strong>
                      <span>{COLLEGE_DATA.contact.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm flex-shrink-0">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <strong className="block text-navy font-bold">Email</strong>
                      <span>{COLLEGE_DATA.contact.email}</span>
                      <span className="block text-slate-400 text-xs">{COLLEGE_DATA.contact.altEmail}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm flex-shrink-0">
                      <i className="fa-solid fa-clock"></i>
                    </div>
                    <div>
                      <strong className="block text-navy font-bold">Office Hours</strong>
                      <span>{COLLEGE_DATA.contact.officeHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campus Photo */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src="assets/images/college.jpeg"
                  alt="SVCE Campus"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="font-heading text-navy text-xl font-bold">
                    Send Us an Inquiry / Feedback
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">
                    Fill out the form below and our administrative office will respond promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Interested Course</label>
                      <select
                        value={formData.course}
                        onChange={e => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg outline-none bg-white text-slate-700"
                      >
                        <option value="bed">Bachelor of Education (B.Ed)</option>
                        <option value="deled">Diploma in Elementary Education (D.El.Ed)</option>
                        <option value="general">General Administrative Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Your Message / Query *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message or inquiry here..."
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitted}
                    className="btn-gold w-full sm:w-auto"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>{submitted ? 'Sending Inquiry...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
