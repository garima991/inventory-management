"use client";

import Link from "next/link";
import React from "react";
import {
  BoxIcon,
  LightningBoltIcon,
  BarChartIcon,
  PersonIcon,
  GlobeIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { gqlClient } from "@/services/graphql";
import { GET_CURRENT_USER, LOGIN_USER } from "@/lib/gql/queries";

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
  <div className="flex flex-col items-start p-8 rounded-2xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 bg-surface border border-default">
    <div className="flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white">
      <Icon className="h-8 w-8" />
    </div>
    <div className="mt-6">
      <h3 className="text-xl font-bold leading-7 text-default">{title}</h3>
      <p className="mt-2 text-base leading-7 text-muted">{description}</p>
    </div>
  </div>
);

const LandingPage = () => {
  const router = useRouter();

  const handleDemoLogin = async () => {
    try {
      const userCred = process.env.NEXT_PUBLIC_DEMO_USER_CRED;
      const password = process.env.NEXT_PUBLIC_DEMO_PASSWORD;
      const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, { userCred, password });
      if (data?.loginUser) {
        try {
          await gqlClient.request(GET_CURRENT_USER);
        } catch {}
        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error("Demo login failed", err);
    }
  };

  return (
    <div className="font-sans">

      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">InventoryFlow</span>
              <div className="font-bold text-2xl link-accent">
                InventoryFlow
              </div>
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6 items-center">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-muted hover:link-accent"
            >
              Log in →
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold leading-6 link-accent hover:underline"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <div className="relative isolate overflow-hidden pt-14 bg-gradient-to-br from-[var(--surface-2)] via-[var(--surface)] to-[var(--surface-2)] dark:from-[var(--surface-2)] dark:via-[var(--surface)] dark:to-[var(--surface-2)]">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center px-6 lg:px-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-default">
              Simple Inventory Management <br className="hidden sm:inline" />
              for Your Business.
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-muted">
              Track products, manage sales, and view analytics with role-based dashboards
              for Admin, Manager, and Staff. Built with Next.js, GraphQL, and Prisma.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <CallToActionButton
                text="Start Free Trial"
                onClick={() => router.push("/signup")}
              />
              <CallToActionButton
                text="Try Demo"
                variant="secondary"
                onClick={handleDemoLogin}
              />
            </div>
            <div className="mt-12 text-sm text-gray-500">
              Trusted by thousands of businesses
            </div>
          </div>
        </div>

        <div className="py-24 sm:py-32 bg-surface">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-default sm:text-4xl">
                Essential inventory management features
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                Product tracking, sales management, user roles, and analytics
                to help you manage your inventory effectively.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
              <FeatureCard
                icon={BoxIcon}
                title="Product Management"
                description="Add, edit, and track products with categories, pricing, and stock levels."
              />
              <FeatureCard
                icon={BarChartIcon}
                title="Sales Analytics"
                description="View sales by category, top products, and stock distribution with visual charts."
              />
              <FeatureCard
                icon={PersonIcon}
                title="User Management"
                description="Create and manage users with Admin, Manager, and Staff role permissions."
              />
              <FeatureCard
                icon={GlobeIcon}
                title="Multi-Tenant Architecture"
                description="Secure data isolation with tenant-aware product and user management."
              />
              <FeatureCard
                icon={LightningBoltIcon}
                title="Low Stock Monitoring"
                description="Track products with low stock levels to help with inventory planning."
              />
              <FeatureCard
                icon={UploadIcon}
                title="Image Uploads"
                description="Upload product images using Cloudinary integration for visual product management."
              />
            </div>
          </div>
        </div>

        <section className="py-20 bg-[var(--surface-2)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              <div className="col-span-1 lg:col-span-1 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-default">Built for Teams</h3>
                <p className="mt-3 text-muted">
                  Purpose-built dashboards streamline work for every role in your business.
                </p>
              </div>
              <div className="col-span-1 lg:col-span-2 grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-surface border border-default shadow-sm">
                  <div className="text-sm font-semibold text-muted">Admin</div>
                  <div className="mt-2 text-default font-bold">Full control</div>
                  <p className="mt-2 text-sm text-muted">Manage users, view company details, and access all features.</p>
                </div>
                <div className="p-6 rounded-2xl bg-surface border border-default shadow-sm">
                  <div className="text-sm font-semibold text-muted">Manager</div>
                  <div className="mt-2 text-default font-bold">Analytics focus</div>
                  <p className="mt-2 text-sm text-muted">View sales charts, top products, and stock analytics.</p>
                </div>
                <div className="p-6 rounded-2xl bg-surface border border-default shadow-sm">
                  <div className="text-sm font-semibold text-muted">Staff</div>
                  <div className="mt-2 text-default font-bold">Basic operations</div>
                  <p className="mt-2 text-sm text-muted">View products, create sales, and manage inventory.</p>
                </div>
                <div className="p-6 rounded-2xl bg-surface border border-default shadow-sm">
                  <div className="text-sm font-semibold text-muted">Authentication</div>
                  <div className="mt-2 text-default font-bold">Secure access</div>
                  <p className="mt-2 text-sm text-muted">JWT-based authentication with role-based permissions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center gap-8">
              <p className="text-sm uppercase tracking-widest text-muted">Powered by</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
                <img src="/next.svg" alt="Next.js" className="h-8" />
                <img src="/vercel.svg" alt="Vercel" className="h-8" />
                <img src="/globe.svg" alt="GraphQL" className="h-8" />
                <img src="/file.svg" alt="Prisma" className="h-8" />
                <img src="/window.svg" alt="Radix UI" className="h-8" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface">
          <div className="mx-auto max-w-3xl text-center px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-default">Ready to get started?</h3>
            <p className="mt-3 text-muted">
              Create an account and start managing your inventory with role-based access for your team.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <CallToActionButton text="Create Account" onClick={() => router.push("/signup")} />
              <CallToActionButton text="Log In" variant="secondary" onClick={() => router.push("/login")} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 py-12">
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
