import React from 'react';
import { ArrowRight, PieChart, BellRing, ShieldCheck, Sparkles, CalendarCheck, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      
      {/* Decorative Background Gradients */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          
          <div className="hidden sm:mb-8 sm:flex sm:justify-center animate-fade-in">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100/20 hover:ring-gray-900/20 dark:hover:ring-gray-100/30 transition-all backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 shadow-sm flex items-center">
              <Sparkles className="w-4 h-4 text-primary dark:text-blue-400 mr-2 animate-pulse" />
              Announcing our new AI-Powered Financial Insights. <Link to="/features" className="font-semibold text-primary dark:text-blue-400 ml-2"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl animate-fade-in" style={{animationDelay: '100ms'}}>
            Never miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 dark:from-blue-400 dark:to-indigo-300">payment</span> again
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 animate-fade-in" style={{animationDelay: '200ms'}}>
            Take the stress out of adulting. BillWise securely tracks your obligations, analyzes your cash flow, and nudges you at the perfect time so you stay in total control.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in" style={{animationDelay: '300ms'}}>
            <Link
              to="/register"
              className="rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300"
            >
              Get Started for Free
            </Link>
            <Link to="/features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white flex items-center group">
              See How It Works <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Floating Mockup UI - Glassmorphism */}
        <div className="relative mx-auto max-w-5xl mt-[-5rem] sm:mt-[-8rem] mb-20">
           <div className="rounded-2xl bg-white/40 dark:bg-gray-800/40 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 backdrop-blur-xl shadow-2xl lg:rounded-3xl animate-fade-in" style={{animationDelay: '400ms'}}>
             <div className="rounded-xl bg-white dark:bg-gray-900 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
                
                {/* Floating Notification */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-100 dark:border-gray-700 w-full md:w-72 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-2 rounded-full">
                      <BellRing className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">Upcoming Bill</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Due in 2 Days</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-gray-800 dark:text-gray-200 font-semibold">Electric Utility</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">$84.50</div>
                  </div>
                  <button className="w-full mt-4 bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400 font-semibold py-2 rounded-lg text-sm hover:bg-primary hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors">
                    Pay Now
                  </button>
                </div>

                <div className="hidden md:flex flex-col space-y-4">
                  <div className="flex items-center text-success dark:text-green-400 text-sm font-medium">
                     <CheckCircle2 className="w-5 h-5 mr-2" /> <span>Rent Paid ($1,200)</span>
                  </div>
                  <div className="flex items-center text-success dark:text-green-400 text-sm font-medium opacity-70">
                     <CheckCircle2 className="w-5 h-5 mr-2" /> <span>Internet Paid ($65)</span>
                  </div>
                  <div className="flex items-center text-success dark:text-green-400 text-sm font-medium opacity-40">
                     <CheckCircle2 className="w-5 h-5 mr-2" /> <span>Netflix Paid ($15)</span>
                  </div>
                </div>

             </div>
           </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800/30 py-24 sm:py-32 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary dark:text-blue-400">Designed for Modern Finances</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to automate your calendar.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {[
                {
                  name: 'AI-Powered Advice',
                  desc: 'Get a smart health score and personalized insights. Our AI analyzes your spending patterns to help you optimize.',
                  icon: Sparkles,
                  color: 'bg-primary dark:bg-blue-600'
                },
                {
                  name: 'Multi-channel Reminders',
                  desc: 'Never miss a bill with SMS, Email, or Push alerts based on urgency (e.g., 5-day or 2-day warning).',
                  icon: BellRing,
                  color: 'bg-orange-500'
                },
                {
                  name: 'Smart Categorization',
                  desc: 'We intelligently group your bills into categories to help you see exactly where your money goes.',
                  icon: PieChart,
                  color: 'bg-purple-600'
                },
                {
                  name: 'Bank Integration',
                  desc: 'Securely connect your local bank accounts and mobile money for seamless tracking and auto-pay.',
                  icon: ShieldCheck,
                  color: 'bg-green-600'
                }
              ].map((feature, i) => (
                <div key={i} className="relative pl-16 group hover:-translate-y-1 transition-transform duration-300">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg shadow-md ${feature.color} group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
