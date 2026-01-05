import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "@/components/ServiceCard";
import { 
  Cloud, Server, Database, HardDrive, Shield, Lock,
  Building2, Phone, Video, Mail, Globe, FileText,
  Users, GraduationCap, Network, Wifi, Router, Camera,
  Code, Wrench, Laptop, MonitorSmartphone, Settings, Headphones
} from "lucide-react";
import cloudImage from "@/assets/cloud-services.jpg";
import cyberImage from "@/assets/cybersecurity.jpg";
import govImage from "@/assets/government-services.jpg";

const Services = () => {
  const cloudServices = [
    {
      icon: Cloud,
      title: "Infrastructure as a Service (IaaS)",
      description: "Scalable computing resources on-demand"
    },
    {
      icon: Server,
      title: "Platform as a Service (PaaS)",
      description: "Complete development and deployment platforms"
    },
    {
      icon: Database,
      title: "Software as a Service (SaaS)",
      description: "Cloud-based software solutions"
    },
    {
      icon: HardDrive,
      title: "Virtual Private Servers",
      description: "Dedicated virtual server environments"
    },
    {
      icon: Server,
      title: "Colocation Services",
      description: "Secure data center space for your equipment"
    },
    {
      icon: Shield,
      title: "Disaster Recovery",
      description: "GovBackup Plus and business continuity solutions"
    }
  ];

  const businessServices = [
    {
      icon: Phone,
      title: "BizConnect",
      description: "Hosted IP voice and video for businesses"
    },
    {
      icon: Network,
      title: "BIZNet Direct",
      description: "Secure intranet portal for collaboration"
    },
    {
      icon: Mail,
      title: "Bizmail",
      description: "Professional business email service"
    },
    {
      icon: Globe,
      title: "GovDNS",
      description: "gov.ng domain registration and management"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Secure document storage and management"
    },
    {
      icon: Shield,
      title: "Content Security",
      description: "Government-grade content protection"
    }
  ];

  const itNetworkServices = [
    {
      icon: Network,
      title: "Network Consulting",
      description: "Expert network design and optimization"
    },
    {
      icon: Code,
      title: "Custom ERP Systems",
      description: "Tailored enterprise resource planning solutions"
    },
    {
      icon: Settings,
      title: "Billing Solutions",
      description: "Custom billing and invoicing systems"
    },
    {
      icon: Laptop,
      title: "Hardware Procurement",
      description: "Enterprise-grade networking equipment"
    },
    {
      icon: Router,
      title: "Network Setup",
      description: "Complete network infrastructure deployment"
    },
    {
      icon: Camera,
      title: "CCTV & Surveillance",
      description: "Security camera installation and monitoring"
    },
    {
      icon: Wrench,
      title: "Site Maintenance",
      description: "Ongoing technical support and maintenance"
    },
    {
      icon: MonitorSmartphone,
      title: "Custom System Building",
      description: "Bespoke IT solutions for your needs"
    }
  ];

  const connectivityServices = [
    {
      icon: Wifi,
      title: "Fiber to the Home (FTTH)",
      description: "High-speed fiber internet up to 100 Mbps"
    },
    {
      icon: Network,
      title: "Dedicated Internet",
      description: "Guaranteed bandwidth with low latency"
    },
    {
      icon: Globe,
      title: "Unlimited Internet Plans",
      description: "30-day uncapped browsing with data rollover"
    },
    {
      icon: Router,
      title: "Managed WiFi",
      description: "Professional WiFi installation and management"
    },
    {
      icon: Server,
      title: "Load Balancing",
      description: "Multiple ISP redundancy solutions"
    },
    {
      icon: Network,
      title: "eLTE & FTTX",
      description: "Residential and office connectivity"
    }
  ];

  const consultingServices = [
    {
      icon: Users,
      title: "IT Consulting",
      description: "Strategic technology planning and implementation"
    },
    {
      icon: FileText,
      title: "Project Management",
      description: "End-to-end project delivery and oversight"
    },
    {
      icon: Lock,
      title: "Security Consulting (ISMS)",
      description: "Information security management systems"
    },
    {
      icon: GraduationCap,
      title: "Training & Certification",
      description: "Galaxy Learning Services and capacity building"
    },
    {
      icon: Users,
      title: "Technical Augmentation",
      description: "Expert staff augmentation services"
    },
    {
      icon: FileText,
      title: "ICT Advisory",
      description: "Technology strategy and planning"
    }
  ];

  const otherServices = [
    {
      icon: Mail,
      title: "Email as a Service",
      description: "Professional business email hosting"
    },
    {
      icon: Globe,
      title: "Domain Registration",
      description: "Domain name sales and management"
    },
    {
      icon: Server,
      title: "Shared Linux Hosting",
      description: "Affordable web hosting solutions"
    },
    {
      icon: Database,
      title: "Virtual Machines",
      description: "Flexible VM hosting services"
    },
    {
      icon: MonitorSmartphone,
      title: "Streaming Hardware",
      description: "Netflix TV box and satellite TV installation"
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "24/7 support and assistance"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive ICT solutions designed to meet the unique needs of businesses, 
            government agencies, and organizations across Nigeria
          </p>
        </div>

        {/* Services Tabs */}
        <Tabs defaultValue="cloud" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-12">
            <TabsTrigger value="cloud">Cloud & Data Center</TabsTrigger>
            <TabsTrigger value="business">Business Services</TabsTrigger>
            <TabsTrigger value="it">IT & Network</TabsTrigger>
            <TabsTrigger value="connectivity">Internet Services</TabsTrigger>
            <TabsTrigger value="consulting">Consulting</TabsTrigger>
            <TabsTrigger value="other">Other Services</TabsTrigger>
          </TabsList>

          <TabsContent value="cloud" className="space-y-8">
            <div 
              className="rounded-2xl overflow-hidden h-64 mb-8"
              style={{
                backgroundImage: `url(${cloudImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cloudServices.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-8">
            <div 
              className="rounded-2xl overflow-hidden h-64 mb-8"
              style={{
                backgroundImage: `url(${govImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessServices.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="it" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itNetworkServices.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connectivity" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectivityServices.map((service) => (
                <a 
                  key={service.title} 
                  href="https://fiber.dotmac.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <ServiceCard {...service} />
                </a>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="consulting" className="space-y-8">
            <div 
              className="rounded-2xl overflow-hidden h-64 mb-8"
              style={{
                backgroundImage: `url(${cyberImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultingServices.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="other" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Services;
