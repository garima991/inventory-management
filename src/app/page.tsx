"use client";

import Link from "next/link";
import React from "react";
import { BoxIcon, LightningBoltIcon, BarChartIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const CallToActionButton = ({
  text,
  onClick,
  variant = "primary",
}: {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-8 py-4 text-lg font-semibold shadow-xl transition-colors duration-300 ${
        variant === "primary"
          ? "bg-indigo-600 text-white hover:bg-indigo-500"
          : "bg-gray-900 text-indigo-400 border border-indigo-600 hover:bg-gray-800"
      }`}
    >
      {text}
    </button>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.FC<any>;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start p-8 rounded-2xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 bg-gray-900 border border-gray-800">
    <div className="flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white">
      <Icon className="h-8 w-8" />
    </div>
    <div className="mt-6">
      <h3 className="text-xl font-bold leading-7 text-white">{title}</h3>
      <p className="mt-2 text-base leading-7 text-gray-400">{description}</p>
    </div>
  </div>
);

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-950 text-white font-sans">

      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">InventoryFlow</span>
              <div className="font-bold text-2xl text-indigo-400">
                InventoryFlow
              </div>
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-300 hover:text-indigo-400"
            >
              Log in →
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold leading-6 text-indigo-400 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <div className="relative isolate overflow-hidden pt-14 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center px-6 lg:px-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Stop Guessing. <br className="hidden sm:inline" />
              Start Growing.
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-400">
              Real-time inventory management software that helps businesses
              grow faster with insights, analytics, and effortless stock
              control.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <CallToActionButton
                text="Start Free Trial"
                onClick={() => router.push("/signup")}
              />
              <CallToActionButton
                text="Try Demo"
                variant="secondary"
                onClick={() => router.push("/")}
              />
            </div>
            <div className="mt-12 text-sm text-gray-500">
              Trusted by thousands of businesses
            </div>
          </div>
        </div>

        <div className="bg-gray-950 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Features that empower your business.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-400">
                From real-time tracking to automated alerts, our tools are
                built to save you time and money.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
              <FeatureCard
                icon={BoxIcon}
                title="Real-Time Stock Tracking"
                description="Know exactly what’s in stock, what’s selling, and what you need to order instantly."
              />
              <FeatureCard
                icon={LightningBoltIcon}
                title="Automated Low-Stock Alerts"
                description="Get notified when items run low so you can reorder before running out."
              />
              <FeatureCard
                icon={BarChartIcon}
                title="Powerful Sales Analytics"
                description="Visual dashboards help you identify top products and maximize profit."
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} InventoryFlow. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
