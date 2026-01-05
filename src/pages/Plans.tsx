import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Plans = () => {
  const internetPlans = [
    {
      name: "Home Basic",
      speed: "30 Mbps",
      price: "₦16,125",
      period: "/month",
      features: [
        "Fiber to the Home (FTTH)",
        "Capped Data Option",
        "Data Rollover",
        "No Speed Throttling",
        "Multiple Users Supported",
        "24/7 Technical Support"
      ]
    },
    {
      name: "Home Premium",
      speed: "50 Mbps",
      price: "₦26,875",
      period: "/month",
      popular: true,
      features: [
        "Fiber to the Home (FTTH)",
        "Unlimited Data",
        "Data Rollover",
        "No Speed Throttling",
        "Up to 10 Devices",
        "Priority Support"
      ]
    },
    {
      name: "Home Ultra",
      speed: "100 Mbps",
      price: "₦43,000",
      period: "/month",
      features: [
        "Fiber to the Home (FTTH)",
        "Unlimited Data",
        "No Speed Throttling",
        "Up to 20 Devices",
        "Priority Support",
        "Free Installation"
      ]
    },
    {
      name: "Business Pro",
      speed: "Dedicated",
      price: "Custom",
      period: "",
      features: [
        "Guaranteed Bandwidth",
        "Low Latency",
        "Dedicated IP Address",
        "SLA Guarantee",
        "24/7 Premium Support",
        "Load Balancing Options"
      ]
    }
  ];

  const cloudPlans = [
    {
      name: "Cloud Starter",
      price: "₦53,750",
      period: "/month",
      features: [
        "2 vCPUs",
        "4 GB RAM",
        "100 GB SSD Storage",
        "1 TB Bandwidth",
        "Basic Support",
        "99.9% Uptime SLA"
      ]
    },
    {
      name: "Cloud Business",
      price: "₦161,250",
      period: "/month",
      popular: true,
      features: [
        "4 vCPUs",
        "8 GB RAM",
        "250 GB SSD Storage",
        "3 TB Bandwidth",
        "Priority Support",
        "99.95% Uptime SLA",
        "Automated Backups"
      ]
    },
    {
      name: "Cloud Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Custom vCPUs",
        "Custom RAM",
        "Scalable Storage",
        "Unlimited Bandwidth",
        "Dedicated Support",
        "99.99% Uptime SLA",
        "Disaster Recovery"
      ]
    }
  ];

  const hostingPlans = [
    {
      name: "Shared Hosting",
      price: "₦3,225",
      period: "/month",
      features: [
        "1 Website",
        "10 GB Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Email Accounts",
        "cPanel Access"
      ]
    },
    {
      name: "Business Hosting",
      price: "₦8,600",
      period: "/month",
      features: [
        "5 Websites",
        "50 GB Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Unlimited Email",
        "Daily Backups"
      ]
    },
    {
      name: "Email Hosting",
      price: "₦5,375",
      period: "/user/month",
      features: [
        "Custom Email Domain",
        "25 GB Storage",
        "Webmail Access",
        "Mobile Sync",
        "Spam Protection",
        "99.9% Uptime"
      ]
    }
  ];

  const renderPlanCard = (plan: any) => (
    <Card key={plan.name} className={`glass border-border/50 hover-lift relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
        {plan.speed && (
          <CardDescription className="text-lg font-semibold text-primary">
            {plan.speed}
          </CardDescription>
        )}
        <div className="mt-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature: string) => (
            <li key={feature} className="flex items-start space-x-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Link to="/contact">
          <Button 
            variant={plan.popular ? "default" : "outline"} 
            className="w-full"
          >
            {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Plans & Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flexible pricing options for internet connectivity, cloud services, and hosting solutions
          </p>
        </div>

        {/* Pricing Tabs */}
        <Tabs defaultValue="internet" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12">
            <TabsTrigger value="internet">Internet Plans</TabsTrigger>
            <TabsTrigger value="cloud">Cloud Solutions</TabsTrigger>
            <TabsTrigger value="hosting">Hosting & Email</TabsTrigger>
          </TabsList>

          <TabsContent value="internet">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {internetPlans.map(renderPlanCard)}
            </div>
            <p className="text-center text-muted-foreground mt-8 text-sm">
              * Internet services primarily available in Abuja and Lagos
            </p>
          </TabsContent>

          <TabsContent value="cloud">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
              {cloudPlans.map(renderPlanCard)}
            </div>
          </TabsContent>

          <TabsContent value="hosting">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
              {hostingPlans.map(renderPlanCard)}
            </div>
          </TabsContent>
        </Tabs>

        {/* Custom Solutions CTA */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Card className="glass border-border/50 text-center">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We offer tailored packages for enterprises, government agencies, and organizations 
                with specific requirements. Contact our sales team to discuss your needs.
              </p>
              <Link to="/contact">
                <Button size="lg" className="text-lg px-8">
                  Request Custom Quote
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Plans;
