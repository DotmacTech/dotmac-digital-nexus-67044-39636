import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Globe, Loader2, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface DomainResult {
  domain: string;
  status: "available" | "taken" | "unknown";
}

const TLDS = [
  { value: ".ng", label: ".ng" },
  { value: ".com.ng", label: ".com.ng" },
  { value: ".org.ng", label: ".org.ng" },
  { value: ".net.ng", label: ".net.ng" },
];

const DomainSearch = () => {
  const navigate = useNavigate();
  const [domainLabel, setDomainLabel] = useState("");
  const [selectedTlds, setSelectedTlds] = useState<string[]>([".ng", ".com.ng", ".org.ng", ".net.ng"]);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const toggleTld = (tld: string) => {
    setSelectedTlds((prev) =>
      prev.includes(tld) ? prev.filter((t) => t !== tld) : [...prev, tld]
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const label = domainLabel.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!label) {
      toast.error("Please enter a valid domain name");
      return;
    }
    if (selectedTlds.length === 0) {
      toast.error("Please select at least one TLD");
      return;
    }

    setIsSearching(true);
    setResults([]);

    try {
      const params = new URLSearchParams({
        domainLabel: label,
        tlds: selectedTlds.join(","),
      });
      const response = await fetch(`/api/domain-check?${params}`);
      if (!response.ok) throw new Error("Failed to check domains");
      const data: DomainResult[] = await response.json();
      setResults(data);
    } catch {
      toast.error("Domain check failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const statusIcon = (status: DomainResult["status"]) => {
    switch (status) {
      case "available":
        return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case "taken":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const statusBadge = (status: DomainResult["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Available</Badge>;
      case "taken":
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">Taken</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">.ng Domain Search</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check availability of .ng domains and register your perfect Nigerian domain name
          </p>
        </div>

        {/* Search Form */}
        <Card className="glass border-border/50 mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Domain Name</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={domainLabel}
                      onChange={(e) => setDomainLabel(e.target.value)}
                      placeholder="e.g. mybusiness"
                      className="pl-10"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isSearching} size="lg">
                    {isSearching ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Search"
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Extensions</label>
                <div className="flex flex-wrap gap-4">
                  {TLDS.map((tld) => (
                    <label
                      key={tld.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedTlds.includes(tld.value)}
                        onCheckedChange={() => toggleTld(tld.value)}
                      />
                      <span className="text-sm font-medium">{tld.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-3 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            {results.map((result) => (
              <Card key={result.domain} className="glass border-border/50">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {statusIcon(result.status)}
                    <span className="font-medium text-lg">{result.domain}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {statusBadge(result.status)}
                    {result.status === "available" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/domain-request?domain=${encodeURIComponent(result.domain)}`)
                        }
                      >
                        Request Registration
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainSearch;
