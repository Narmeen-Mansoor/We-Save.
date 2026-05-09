/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Users, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Wallet className="h-8 w-8 text-brand-green" />
          <span className="text-2xl font-bold tracking-tight text-brand-navy">WeSave</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="text-sm font-semibold leading-6 text-brand-navy hover:text-brand-green transition-colors">
            Log in
          </Link>
          <Link 
            to="/signup" 
            className="rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-brand-mint/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold tracking-tight text-brand-navy sm:text-7xl leading-[1.1]">
                Save Together, <br/>
                <span className="text-brand-green italic">Grow Together.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                The smart way to manage your Committees (ROSCA) in Pakistan. Secure, simple, and social savings for everyone.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/signup"
                  className="rounded-full bg-brand-green px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
                >
                  Start Saving Now
                </Link>
                <Link to="/education" className="text-base font-semibold leading-7 text-brand-navy hover:gap-2 flex items-center gap-1 group transition-all">
                  How it works <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Hero Illustration Placeholder */}
          <div className="mt-16 lg:mt-0 flex justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/2 lg:max-w-xl">
             <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-green to-emerald-400 rounded-[2rem] blur opacity-25"></div>
                <div className="relative bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100">
                   <div className="flex flex-col gap-6 w-full sm:w-80">
                      <div className="h-10 w-32 bg-brand-mint rounded-lg animate-pulse"></div>
                      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                         <div className="flex gap-2">
                           <div className="h-8 w-8 bg-brand-green/20 rounded-full"></div>
                           <div className="space-y-2">
                              <div className="h-3 w-16 bg-slate-200 rounded"></div>
                              <div className="h-2 w-10 bg-slate-100 rounded"></div>
                           </div>
                         </div>
                         <div className="text-brand-green font-bold text-sm">Rs. 5,000</div>
                      </div>
                      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                         <div className="flex gap-2">
                           <div className="h-8 w-8 bg-brand-navy/10 rounded-full"></div>
                           <div className="space-y-2">
                              <div className="h-3 w-20 bg-slate-200 rounded"></div>
                              <div className="h-2 w-12 bg-slate-100 rounded"></div>
                           </div>
                         </div>
                         <div className="text-slate-400 font-bold text-sm">Rs. 5,000</div>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-brand-green w-3/4 rounded-full"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-green">Why WeSave?</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              Modernizing traditional Pakistan saving habits
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We take the traditional "Committee" system and bring it into the digital age with transparency and ease.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Group Committees',
                  description: 'Form savings groups with friends, family, or colleagues. Track every contribution seamlessly.',
                  icon: Users,
                },
                {
                  name: 'Financial Literacy',
                  description: 'Learn how to manage money effectively with resources tailored for the Pakistani market.',
                  icon: TrendingUp,
                },
                {
                  name: 'Secure & Private',
                  description: 'Your data is encrypted and secure. Only your group members see the committee status.',
                  icon: ShieldCheck,
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-brand-navy">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint text-brand-green">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Quick Explainer */}
      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
               <h2 className="text-3xl font-bold mb-6">How It Works</h2>
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-green flex items-center justify-center font-bold">1</div>
                     <div>
                        <h3 className="font-bold text-xl mb-1">Create a Group</h3>
                        <p className="text-slate-400">Decide the monthly contribution amount and duration.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-green flex items-center justify-center font-bold">2</div>
                     <div>
                        <h3 className="font-bold text-xl mb-1">Invite Members</h3>
                        <p className="text-slate-400">Add trusted friends and family to your savings committee.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-green flex items-center justify-center font-bold">3</div>
                     <div>
                        <h3 className="font-bold text-xl mb-1">Rotate Payouts</h3>
                        <p className="text-slate-400">Each month, one member receives the total collected pool.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
               <div className="flex items-center gap-2 mb-8">
                  <CheckCircle2 className="text-brand-green" />
                  <span className="font-medium">Perfect for:</span>
               </div>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                  <li>• Eid Shoping Fund</li>
                  <li>• Wedding Expenses</li>
                  <li>• New Bike/Car Fund</li>
                  <li>• School/Uni Fees</li>
                  <li>• Emergency Savings</li>
                  <li>• Small Biz Capital</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Wallet className="h-6 w-6 text-brand-green" />
            <span className="text-xl font-bold text-brand-navy">WeSave</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 WeSave Pakistan. Built for your financial future.</p>
        </div>
      </footer>
    </div>
  );
}
