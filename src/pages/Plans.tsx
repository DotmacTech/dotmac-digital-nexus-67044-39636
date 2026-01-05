import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Plans = () => {
  const internetPlans = [
    {
      name: "High Speed Internet Plans",
      speed: "Up to 100Mbps",
      price: "From ₦16,125.00",
      period: "/Month",
      features: [
        "Capped Data",
        "Multiple Users",
        "Data Rollover",
        "No speed throttle",
        "Available on ground fiber"
      ],
      buttonText: "View Plan",
      buttonLink: "https://fiber.dotmac.ng/plans/"
    },
    {
      name: "Unlimited Internet Plans",
      speed: "30 Days Validity",
      price: "From ₦18,812.50",
      period: "/Month",
      popular: true,
      features: [
        "Uncapped Data",
        "Multiple Users",
        "Unlimited Uploads and Downloads",
        "No speed throttle",
        "Available on ground and air fiber"
      ],
      buttonText: "View Plan",
      buttonLink: "https://fiber.dotmac.ng/plans/"
    },
    {
      name: "Dedicated Internet Plan",
      speed: "High Bandwidth",
      price: "Custom",
      period: "",
      features: [
        "Delivers higher bandwidth requirements",
        "High-performance ability",
        "Low latency and high response time",
        "Guaranteed speed",
        "Additional IP address upon request",
        "Available on ground fiber"
      ],
      buttonText: "Subscribe Now",
      buttonLink: "/contact"
    }
  ];

  const cloudPlans = [
    {
      name: "Cloud Starter",
      price: "Contact Us",
      period: "",
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
      price: "Contact Us",
      period: "",
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
      price: "Contact Us",
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
      price: "Contact Us",
      period: "",
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
      price: "Contact Us",
      period: "",
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
      price: "Contact Us",
      period: "",
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

  const renderPlanCard = (plan: any, isInternetPlan: boolean = false) => (
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
        {isInternetPlan && plan.buttonLink ? (
          plan.buttonLink.startsWith('http') ? (
            <a href={plan.buttonLink} target="_blank" rel="noopener noreferrer">
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                className="w-full"
              >
                {plan.buttonText || "View Plan"}
              </Button>
            </a>
          ) : (
            <Link to={plan.buttonLink}>
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                className="w-full"
              >
                {plan.buttonText || "Subscribe Now"}
              </Button>
            </Link>
          )
        ) : (
          <Link to="/contact">
            <Button 
              variant={plan.popular ? "default" : "outline"} 
              className="w-full"
            >
              {plan.price === "Custom" || plan.price === "Contact Us" ? "Contact Sales" : "Get Started"}
            </Button>
          </Link>
        )}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
              {internetPlans.map((plan) => renderPlanCard(plan, true))}
            </div>
            <div className="text-center mt-8">
              <a href="https://fiber.dotmac.ng/plans/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-lg hover:bg-primary hover:text-white transition-colors duration-300">
                  See More Plans
                </Button>
              </a>
            </div>
            <p className="text-center text-muted-foreground mt-4 text-sm">
              * Internet services primarily available in Abuja and Lagos
            </p>
          </TabsContent>

          <TabsContent value="cloud">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
              {cloudPlans.map((plan) => renderPlanCard(plan, false))}
            </div>
          </TabsContent>

          <TabsContent value="hosting">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
              {hostingPlans.map((plan) => renderPlanCard(plan, false))}
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
