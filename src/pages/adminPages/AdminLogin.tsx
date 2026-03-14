import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/apiServices/authApiService';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/sessionStorageUtils';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await login(values);
      console.log('Login Response:', response.data);
      
      if (response.data.success) {
        toast.success(response.data.message || 'Access Authorized');
        
        if (response.data.token) {
          setToken(response.data.token);
        }
        
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        toast.error(message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };


  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Admin Identity is required'),
    password: Yup.string()
      .min(6, 'Passcode must be at least 6 characters')
      .required('Passcode is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });




  

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row font-sans text-white overflow-hidden">
      
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop" 
            alt="Admin Interface" 
            className="w-full h-full object-cover opacity-40 grayscale-[50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-heading font-black tracking-widest text-brand-gradient">NEXERA</h1>
          <p className="text-white/50 text-sm tracking-[0.3em] mt-2 uppercase font-medium">Command Center</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-md"
        >
          <div className="glass p-6 rounded-2xl border border-white/10 mb-8 backdrop-blur-xl">
            <ShieldCheck className="w-8 h-8 text-brand mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure Access Gateway</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              You are entering a high-security administrative zone. All actions are monitored, recorded, and strictly audited globally.
            </p>
          </div>
          <div className="flex gap-4 items-center text-xs text-brand tracking-wider font-mono">
            <span>SYS.VER: 4.9.2</span>
            <span className="w-1 h-1 bg-brand/40 rounded-full" />
            <span>NODE: ALPHA-7</span>
            <span className="w-1 h-1 bg-brand/40 rounded-full" />
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_10px_#00ff66]" />
              STATUS: SECURE
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right side: Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative min-h-screen lg:min-h-0 container mx-auto lg:mx-0">
        {/* Ambient background glow for right side */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as any, delay: 0.1 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="lg:hidden text-center mb-10">
            <h1 className="text-4xl font-heading font-black tracking-widest text-brand-gradient mb-2">NEXERA</h1>
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium">Command Center</p>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold mb-3">Initialize Link</h2>
            <p className="text-white/50 text-sm sm:text-base">Enter your credentials to gain system access.</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-white/50 ml-1 font-semibold">Admin Identity</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${formik.touched.email && formik.errors.email ? 'text-red-500' : 'text-white/30 group-focus-within:text-brand'} transition-colors`} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-white/5 border ${formik.touched.email && formik.errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand/40'} rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 transition-all text-sm shadow-inner`}
                  placeholder="admin@nexera.sys"
                />
              </div>
              <AnimatePresence>
                {formik.touched.email && formik.errors.email && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-500 text-[10px] uppercase tracking-wider font-bold mt-1 ml-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {formik.errors.email}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs uppercase tracking-wider text-white/50 font-semibold">Passcode</label>
                <a href="#" className="text-xs text-brand hover:text-white transition-colors">Recover Access</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${formik.touched.password && formik.errors.password ? 'text-red-500' : 'text-white/30 group-focus-within:text-brand'} transition-colors`} />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-white/5 border ${formik.touched.password && formik.errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand/40'} rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 transition-all font-mono tracking-widest text-lg shadow-inner`}
                  placeholder="••••••••"
                />
              </div>
              <AnimatePresence>
                {formik.touched.password && formik.errors.password && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-500 text-[10px] uppercase tracking-wider font-bold mt-1 ml-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {formik.errors.password}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !formik.isValid || !formik.dirty}
              className="w-full py-4 relative group overflow-hidden bg-brand flex items-center justify-center gap-2 text-black font-bold rounded-2xl mt-8 hover:bg-brand-hover hover:shadow-[0_0_30px_rgba(0,255,102,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-sm tracking-widest">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AUTHENTICATING...
                </span>
              ) : (
                <>
                  <span className="relative z-10 text-sm tracking-wider">AUTHORIZE ENTRY</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Mobile Footer Status */}
          <div className="lg:hidden mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-2">
             <div className="flex items-center gap-2 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_10px_#00ff66]" />
                STATUS: SECURE
            </div>
            <p className="text-white/30 text-[10px] uppercase font-mono tracking-widest text-center mt-2">
              SYS.VER: 4.9.2 | NODE: ALPHA-7
            </p>
          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default AdminLogin;
