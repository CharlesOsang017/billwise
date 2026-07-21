import React from 'react';
import { ShieldCheck, Zap, BarChart3, Smartphone, Globe, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      name: 'Bank-grade Security',
      description: 'Your financial data is protected with 256-bit AES encryption. We never store your banking credentials, utilizing industry-standard OAuth tokens.',
      icon: Lock,
    },
    {
      name: 'AI Financial Insights',
      description: 'Our intelligent engine analyzes your transaction history to provide personalized recommendations, potential savings, and a unique health score.',
      icon: BarChart3,
    },
    {
      name: 'Automated Reminders',
      description: 'Set custom alert preferences. Get notified via Push, SMS, or Email at intervals you choose so you never miss a due date again.',
      icon: Smartphone,
    },
    {
      name: 'Global Integrations',
      description: 'Connect seamlessly with over 10,000 financial institutions worldwide, including major banks, credit unions, and mobile money services like M-Pesa.',
      icon: Globe,
    },
    {
      name: 'Instant Bill Settlement',
      description: 'Pay your bills directly from the dashboard with one click. Our lightning-fast payment rails ensure your obligations are settled instantly.',
      icon: Zap,
    },
    {
      name: 'Privacy First',
      description: 'Your data belongs to you. We strictly adhere to privacy standards and do not sell your personal financial information to third parties.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32 animate-fade-in">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary tracking-wide uppercase">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to master your money
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            BillWise is packed with intelligent tools designed to give you absolute peace of mind and complete control over your financial obligations.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        
        <div className="mt-24 text-center">
          <Link
            to="/register"
            className="inline-flex rounded-md bg-primary px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
          >
            Start your free account today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
