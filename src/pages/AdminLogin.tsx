import React, { useState } from 'react';
import { authenticateAdmin } from '../services/supabase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigate: (page: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onNavigate }) => {
  const savedCreds = (() => {
    try {
      const data = localStorage.getItem('svce_saved_admin_creds');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })();

  const [email, setEmail] = useState(savedCreds?.email || '');
  const [password, setPassword] = useState(savedCreds?.password || '');
  const [rememberMe, setRememberMe] = useState(savedCreds ? true : true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlertInfo(null);

    const result = await authenticateAdmin(email.trim(), password);

    if (result.success && result.user) {
      sessionStorage.setItem('svce_admin_session', JSON.stringify({
        user: result.user,
        loggedAt: new Date().toISOString()
      }));

      // Save login info if checkbox is checked
      if (rememberMe) {
        localStorage.setItem('svce_saved_admin_creds', JSON.stringify({
          email: email.trim(),
          password: password
        }));
        localStorage.setItem('svce_remember_admin', 'true');
      } else {
        localStorage.removeItem('svce_saved_admin_creds');
        localStorage.removeItem('svce_remember_admin');
      }

      setAlertInfo({ 
        type: 'success', 
        message: result.message || 'Database Authentication Successful! Redirecting...' 
      });

      setTimeout(() => {
        onLoginSuccess();
      }, 600);
    } else {
      setAlertInfo({
        type: 'error',
        message: result.message || 'Invalid Admin credentials. Please check your Email and Password.'
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-radial-pattern">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-primary-gradient p-8 text-center text-white relative">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-slate-300 hover:text-gold-light inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Public Site
            </button>
          </div>
          <div className="w-16 h-16 rounded-full bg-navy border-3 border-gold-light mx-auto mb-3 overflow-hidden shadow-lg">
            <img src="assets/images/vivekananda.jpg" alt="SVCE Emblem" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-heading font-extrabold text-xl">Administrative Gateway</h2>
          <p className="text-xs text-slate-300 mt-1">Swami Vibekananda College of Education</p>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {alertInfo && (
            <div className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
              alertInfo.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {alertInfo.message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">Admin Email</label>
              <div className="relative flex items-center">
                <i className="fa-solid fa-envelope absolute left-3.5 text-slate-400 text-sm"></i>
                <input
                  type="email"
                  required
                  placeholder="admin@svcoledu.net.in"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-main border border-slate-300 rounded-xl outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">Password</label>
              <div className="relative flex items-center">
                <i className="fa-solid fa-lock absolute left-3.5 text-slate-400 text-sm"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-surface-main border border-slate-300 rounded-xl outline-none focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Save Login Info Checkbox */}
            <div className="flex items-center justify-between text-xs py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 hover:text-navy font-semibold group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-navy border-slate-300 cursor-pointer accent-navy"
                />
                <span className="group-hover:text-navy transition-colors">Save login info for future logins</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary-gradient text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span>Log in to Admin</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-surface-main border-t border-slate-100 text-center text-xs text-slate-500">
          <i className="fa-solid fa-shield-halved text-gold mr-1"></i> Please log in with admin credentials
        </div>

      </div>
    </div>
  );
};
