import Head from 'next/head';
import React from 'react';
import {
  BoxIcon,
  LightningBoltIcon,
  BarChartIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';

// Define a a reusable component for the CTA button to keep the code DRY (Don't Repeat Yourself).
const CallToActionButton = ({ text }: { text: string }) => (
  <a
    href="#"
    className="rounded-full bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-indigo-500 transition-colors duration-300"
  >
    {text}
  </a>
);

// Define a component for a single feature card
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.FC<any>, title: string, description: string }) => (
  <div className="flex flex-col items-start p-8 rounded-2xl shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 bg-white border border-gray-100">
    <div className="flex items-center justify-center rounded-full bg-indigo-500 p-3 text-white">
      <Icon className="h-8 w-8" />
    </div>
    <div className="mt-6">
      <h3 className="text-xl font-bold leading-7 text-gray-900">{title}</h3>
      <p className="mt-2 text-base leading-7 text-gray-600">{description}</p>
    </div>
  </div>
);

// Define a component for a single testimonial card
const TestimonialCard = ({ quote, name, title }: { quote: string, name: string, title: string }) => (
  <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
    <p className="italic text-lg text-gray-700">
      "{quote}"
    </p>
    <p className="mt-4 font-bold text-gray-900">{name}</p>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

// Main landing page component
const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Inventory SaaS | Stop Guessing. Start Growing.</title>
        <meta name="description" content="All-in-one inventory management software for small to medium businesses. Get real-time stock levels, powerful analytics, and effortless control." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white text-gray-900 font-sans">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <div className="font-bold text-2xl text-indigo-600">InventoryFlow</div>
              </a>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <div className="relative isolate overflow-hidden pt-14 bg-gradient-to-br from-indigo-50 to-white">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center px-6 lg:px-8">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
                Stop Guessing. <br className="hidden sm:inline" />
                Start Growing.
              </h1>
              <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600">
                Our all-in-one inventory management software gives you real-time stock levels, powerful analytics, and effortless control. Take the guesswork out of your business and maximize your profit.
              </p>
              <div className="mt-10 flex items-center justify-center">
                <CallToActionButton text="Try a Demo →" />
              </div>
              <div className="mt-12 text-sm text-gray-500">
                Trusted by thousands of businesses
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Features that empower your business.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  From real-time tracking to automated alerts, our tools are built to save you time and money.
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-12 lg:gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <FeatureCard
                  icon={BoxIcon}
                  title="Real-Time Stock Tracking"
                  description="Know exactly what’s in stock, what’s selling, and what you need to order, instantly. Say goodbye to stockouts and excess inventory."
                />
                <FeatureCard
                  icon={LightningBoltIcon}
                  title="Automated Low-Stock Alerts"
                  description="Get notified when an item is running low so you can reorder before you run out. Never miss a sale again."
                />
                <FeatureCard
                  icon={BarChartIcon}
                  title="Powerful Sales Analytics"
                  description="Our intuitive dashboards show you your best-selling products and profit margins, empowering you to make data-driven decisions."
                />
              </div>
            </div>
          </div>

          {/* Social Proof & Testimonials Section */}
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Join thousands of businesses that trust us.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Don't just take our word for it—see what our customers have to say about us.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <TestimonialCard
                  quote="Our inventory used to be a mess. InventoryFlow saved us countless hours and helped us increase our revenue by 20%."
                  name="Jane Doe"
                  title="Owner, The Local Bookstore"
                />
                <TestimonialCard
                  quote="The real-time analytics are a game changer. We finally know what to focus on and where to cut costs."
                  name="John Smith"
                  title="Founder, Smith & Co. Manufacturing"
                />
                <TestimonialCard
                  quote="The setup was effortless, and the support team is outstanding. This is the best inventory software we've ever used."
                  name="Emily Chen"
                  title="Operations Manager, Chen's Grocers"
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Find a plan that fits your business.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Simple, transparent pricing. No hidden fees.
                </p>
              </div>
              <div className="mt-16 flex flex-col items-center justify-center gap-8 lg:flex-row">
                {/* Starter Plan */}
                <div className="flex flex-col items-start p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-gray-50 border border-gray-200 lg:w-1/3 w-full">
                  <h3 className="text-lg font-semibold text-gray-900">Starter Plan</h3>
                  <div className="mt-4 text-4xl font-bold text-gray-900">$49/mo</div>
                  <p className="mt-2 text-sm text-gray-500">Billed monthly.</p>
                  <ul className="mt-6 space-y-4 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Unlimited products
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      1 user license
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Real-time tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Low-stock alerts
                    </li>
                  </ul>
                  <a
                    href="#"
                    className="mt-8 block w-full rounded-full bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 shadow-md hover:bg-gray-100"
                  >
                    Choose Plan
                  </a>
                </div>

                {/* Pro Plan - Highlighted */}
                <div className="relative flex flex-col items-start p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white border-2 border-indigo-600 lg:w-1/3 w-full transform lg:scale-105">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase">
                    Most Popular
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">Pro Plan</h3>
                  <div className="mt-4 text-4xl font-bold text-gray-900">$99/mo</div>
                  <p className="mt-2 text-sm text-gray-500">Billed monthly.</p>
                  <ul className="mt-6 space-y-4 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Everything in Starter
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Up to 5 users
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Powerful sales analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Multi-channel integration
                    </li>
                  </ul>
                  <a
                    href="#"
                    className="mt-8 block w-full rounded-full bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition"
                  >
                    Choose Plan
                  </a>
                </div>

                {/* Enterprise Plan */}
                <div className="flex flex-col items-start p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-gray-50 border border-gray-200 lg:w-1/3 w-full">
                  <h3 className="text-lg font-semibold text-gray-900">Enterprise Plan</h3>
                  <div className="mt-4 text-4xl font-bold text-gray-900">Custom</div>
                  <p className="mt-2 text-sm text-gray-500">Contact us for pricing.</p>
                  <ul className="mt-6 space-y-4 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Everything in Pro
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Unlimited users
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center">
                      <CheckCircledIcon className="h-5 w-5 mr-2 text-green-500" />
                      Custom integrations
                    </li>
                  </ul>
                  <a
                    href="#"
                    className="mt-8 block w-full rounded-full bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 shadow-md hover:bg-gray-100"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} InventoryFlow. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
