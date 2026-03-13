import { motion } from 'framer-motion';
import { 
  Car, 
  DollarSign, 
  TrendingUp, 
  Users,
  Activity,
  ArrowUpRight,
  Eye
} from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    {
      title: "Total Vehicles",
      value: "142",
      change: "+12%",
      isPositive: true,
      icon: Car,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Total Value Listed",
      value: "$4.2M",
      change: "+5.4%",
      isPositive: true,
      icon: DollarSign,
      color: "text-brand",
      bg: "bg-brand/10",
      borderColor: "border-brand/20"
    },
    {
      title: "Active Inquiries",
      value: "84",
      change: "-2%",
      isPositive: false,
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Total Impressions",
      value: "45.2K",
      change: "+24%",
      isPositive: true,
      icon: Eye,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    }
  ];

  const recentActivity = [
    { id: 1, action: "New listing added", details: "2023 Porsche 911 GT3", time: "10 mins ago", type: "add" },
    { id: 2, action: "Price updated", details: "2021 BMW M4 Competition", time: "2 hours ago", type: "update" },
    { id: 3, action: "Vehicle sold", details: "2022 Mercedes-Benz G63", time: "5 hours ago", type: "sell" },
    { id: 4, action: "New listing added", details: "2024 Audi RS6 Avant", time: "1 day ago", type: "add" },
    { id: 5, action: "Category modified", details: "Added 'Crossover' to Body Types", time: "1 day ago", type: "system" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2 tracking-wide">Dashboard Overview</h1>
          <p className="text-white/60">High-level metrics and recent activity across your platform.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2 w-fit">
          <Activity className="w-4 h-4" /> Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass p-6 rounded-3xl border ${stat.borderColor} relative overflow-hidden group hover:bg-white/[0.03] transition-colors`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center border ${stat.borderColor} shadow-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${stat.isPositive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {stat.change} <TrendingUp className={`w-3 h-3 ${!stat.isPositive && "transform rotate-180"}`} />
                </span>
              </div>
              
              <div>
                <p className="text-white/50 text-sm font-semibold tracking-wider uppercase mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white font-heading">{stat.value}</h3>
              </div>
              
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none transform group-hover:scale-110 duration-500">
                <Icon className="w-32 h-32" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Split Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Placeholder for Main Chart/Visualization */}
        <div className="lg:col-span-2 glass rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Platform Traffic</h2>
            <select className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/70 focus:outline-none focus:border-brand/50">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center bg-white/[0.01]">
            <div className="text-center">
              <Activity className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 font-medium tracking-wide">Chart visualization placeholder</p>
              <p className="text-white/20 text-xs mt-1">Implement with Recharts or Chart.js</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <button className="text-brand text-xs font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-2.5 before:w-px before:bg-white/10">
            {recentActivity.map((log) => {
              let dotColor = "bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]";
              if (log.type === 'add') dotColor = "bg-brand shadow-[0_0_10px_rgba(0,255,102,0.4)]";
              if (log.type === 'sell') dotColor = "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]";
              if (log.type === 'update') dotColor = "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]";

              return (
                <div key={log.id} className="relative pl-8 group">
                  <div className={`absolute left-[7px] w-1.5 h-1.5 rounded-full top-2 ${dotColor} group-hover:scale-150 transition-transform`} />
                  
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{log.action}</p>
                    <p className="text-xs text-white/60 mb-1">{log.details}</p>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{log.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOverview;
