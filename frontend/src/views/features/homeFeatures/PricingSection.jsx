import React, { memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock, Star, BookOpen, BarChart, Calendar, Laptop, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PricingSection = () => {
  const navigate = useNavigate();
  const handleClick = useCallback((hash, sessionType) => {
    navigate(`/?sessionType=${sessionType}#${hash}`);

    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'instant' });
        }
      }, 500);
    }
  }, []);

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Affordable Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Quality education at reasonable rates with flexible packages
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 py-12 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Book a Demo Session</CardTitle>
              <div className="text-3xl font-bold">₹50</div>
              <CardDescription>One-time 30-minute session</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>30-minute personalized demo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-primary" />
                  <span>Live walkthrough of tools & platform</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Understand teaching style & process</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>Ask questions & clarify doubts</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleClick('contact', 'demo')}>
                Book Demo
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regular Weekly Class</CardTitle>
              <div className="text-3xl font-bold">₹Custom </div>
              <CardDescription>Billed weekly (2 sessions/week, 1 hour each)</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>2x 60-minute sessions per week</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Personalized one-on-one instruction</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Weekly practice materials & homework</span>
                </li>
                <li className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-primary" />
                  <span>Progress tracking & feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Flexible scheduling</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleClick('contact', 'enrollment')}>
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default memo(PricingSection);
