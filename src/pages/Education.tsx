/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Lightbulb, 
  BookOpen, 
  LifeBuoy, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Target,
  ArrowRight,
  Quote,
  Users,
  CheckCircle2
} from 'lucide-react';

export default function Education() {
  const categories = [
    { id: 'basics', name: 'Saving Basics', icon: BookOpen },
    { id: 'committee', name: 'Committee 101', icon: Users },
    { id: 'tips', name: 'Money Tips', icon: Lightbulb },
    { id: 'goals', name: 'Setting Goals', icon: Target },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="bg-brand-mint/50 rounded-[2.5rem] p-8 lg:p-16 border border-brand-soft-green relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-brand-navy leading-tight">
            Learn to <span className="text-brand-green italic">Master</span> Your Money.
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Financial freedom starts with knowledge. Explore our curated resources on saving, 
            investing, and how the traditional Committee system works for you.
          </p>
          <div className="mt-8 flex items-center gap-4">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-300" />
                ))}
             </div>
             <p className="text-sm font-bold text-brand-navy">Joined by 10k+ learners in Pakistan</p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 lg:top-0 h-48 w-48 lg:h-96 lg:w-96 text-brand-green/10 opacity-50">
           <GraduationCap className="w-full h-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
           <section>
              <h2 className="text-3xl mb-8 flex items-center gap-3">
                 <BookOpen className="text-brand-green" />
                 Understand the Committee System
              </h2>
              <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
                 <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-brand-navy mb-4">What is a ROSCA (Committee)?</h3>
                    <p>
                       In Pakistan, the "Committee" system (Rotating Savings and Credit Association) is a popular way to save money collectively. 
                       A group of trusted people (friends, family, or colleagues) agree to contribute a fixed amount of money every month into a central pool.
                    </p>
                    <div className="my-6 p-6 bg-brand-navy text-white rounded-2xl relative overflow-hidden">
                       <Quote className="absolute top-2 right-2 text-white/10 w-16 h-16" />
                       <p className="font-medium italic relative z-10">
                          "Each month, the entire pool is given to one member of the group. This rotation continues until every member has received the payout."
                       </p>
                    </div>
                    <p>
                       It's effectively an interest-free loan for those who receive the payout early, 
                       and a disciplined savings plan for those who receive it later.
                    </p>
                 </div>
              </div>
           </section>

           <section>
              <h2 className="text-3xl mb-8 flex items-center gap-3">
                 <TrendingUp className="text-brand-green" />
                 Why Saving Matters
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                   { title: 'Emergency Fund', desc: 'Unexpected medical bills or repairs in Karachi? Your savings are your safety net.' },
                   { title: 'Debt-Free Large Purchases', desc: 'Planning to buy a Honda 125? A committee helps you avoid high-interest bike loans.' },
                   { title: 'Goal Achievement', desc: 'Saving for your sibling\'s wedding or school fees in Lahore becomes easier with a group.' },
                   { title: 'Peace of Mind', desc: 'Financial stress is real. Having a plan brings clarity and calm to your life.' },
                 ].map((item, i) => (
                   <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-brand-green transition-colors group">
                      <h4 className="font-bold text-brand-navy mb-2 group-hover:text-brand-green transition-colors">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </section>

           <section>
              <div className="bg-brand-navy p-10 rounded-[2.5rem] text-white">
                 <h2 className="text-3xl font-bold mb-6 italic">Success Story</h2>
                 <p className="text-xl text-slate-300 leading-relaxed mb-8">
                   "As a student in Islamabad, I couldn't afford a laptop for my degree. I joined a Rs. 2,000 monthly committee with 10 friends. 
                   In just 5 months, I got the payout of Rs. 20,000 and bought my used MacBook. I'm still saving 
                   with WeSave to pay for my final year project!"
                 </p>
                 <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-slate-700" />
                    <div>
                       <p className="font-bold">Ahmed Raza</p>
                       <p className="text-sm text-slate-500">Student, NUST</p>
                    </div>
                 </div>
              </div>
           </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-brand-navy mb-6">Learning Path</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Introduction to WeSave', progress: 100 },
                   { name: 'The Committee Math', progress: 45 },
                   { name: 'Security & Trust', progress: 0 },
                   { name: 'Budgeting 101', progress: 0 },
                 ].map((module, i) => (
                   <div key={i} className="p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm text-brand-navy">{module.name}</span>
                        {module.progress === 100 ? (
                           <CheckCircle2 size={16} className="text-brand-green" />
                        ) : (
                           <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-green" style={{ width: `${module.progress}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-brand-mint p-8 rounded-3xl border border-brand-soft-green">
              <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-brand-green mb-6 shadow-sm">
                 <LifeBuoy size={24} />
              </div>
              <h4 className="text-xl font-bold text-brand-navy mb-2">Need Help?</h4>
              <p className="text-sm text-slate-500 mb-6">Our financial advisors are available for 1-on-1 calls to help you plan your savings.</p>
              <button className="w-full bg-brand-navy text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                 Book a Call <ArrowRight size={18} />
              </button>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-bold mb-4">Popular Resources</h4>
              <ul className="space-y-3">
                 {['Inflation Hedge Tips', 'Zakat Calculations', 'Eid Savings Plan', 'Wedding Budget Excel'].map(res => (
                   <li key={res} className="flex items-center gap-2 text-sm text-brand-green font-semibold cursor-pointer hover:underline">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-green" /> {res}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
