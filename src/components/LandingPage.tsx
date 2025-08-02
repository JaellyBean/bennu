import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Brain,
  Focus,
  BarChart3,
  Clock,
  Palette,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Bennu</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                AI-Powered Task Manager
              </Badge>
            </div>
            <Button onClick={onGetStarted} className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Badge
              variant="outline"
              className="flex items-center gap-2 px-4 py-2"
            >
              <Sparkles className="h-4 w-4" />
              Designed for Neurodivergent Minds
            </Badge>
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Task Management That
            <br />
            Actually Works for You
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Bennu uses AI to understand your unique patterns and helps you
            organize, prioritize, and complete tasks in a way that works with
            your brain, not against it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Target className="h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Built for Your Success</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed with your needs in mind, from executive
            functioning support to sensory-friendly interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">
                  Smart Task Organization
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                AI-driven categorization and priority setting based on your
                patterns and executive functioning needs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Palette className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Distraction-Free UI</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clean, adjustable interface with visual cues and color coding to
                enhance focus and reduce overwhelm.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Adaptive Reminders</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Personalized notification system that adjusts based on your
                responsiveness and focus patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Focus className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Focus Mode</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Timer-based work sessions with built-in breaks, customized for
                neurodivergent needs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-lg">
                  Progress Visualization
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visual representations of accomplishments to provide motivation
                and dopamine triggers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle className="text-lg">Personalized Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                AI learns your preferences and adapts the system to work better
                with your unique cognitive style.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Productivity?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of neurodivergent individuals who have found their
              perfect task management system.
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2 mx-auto"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <Target className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Bennu</span>
            <Badge variant="outline">AI-Powered Task Manager</Badge>
          </div>
          <p className="text-center text-muted-foreground mt-4">
            Empowering neurodivergent minds to achieve their goals.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
