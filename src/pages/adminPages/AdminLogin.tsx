import { useState } from 'react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication logic here
    console.log('Login attempt with:', email, password);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-brand-gradient tracking-wider mb-2">NEXERA</h1>
          <p className="text-white/60 text-sm tracking-widest uppercase font-medium">Command Center</p>
        </div>

        <div className="glass p-8 rounded-3xl border border-glass-border shadow-2xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-50" />

          <h2 className="text-2xl font-bold text-white mb-6">Authorized Access Only</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Admin Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand/50 focus:bg-white/10 transition-colors"
                placeholder="admin@nexera.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand/50 focus:bg-white/10 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-transparent text-brand focus:ring-brand/50 focus:ring-offset-bg-dark" />
                <span className="text-white/60 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-brand hover:text-brand-hover transition-colors font-medium">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-brand text-black font-bold rounded-xl mt-4 hover:bg-brand-hover hover:shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all duration-300"
            >
              Initialize Link
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-white/40 text-xs">
              Secure 256-bit encrypted connection. <br/>All access attempts are logged.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
