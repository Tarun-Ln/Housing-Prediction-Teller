import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Home, TrendingUp } from "lucide-react";

interface FormData {
  HouseAge: string;
  AveRooms: string;
  AveBedrms: string;
  Population: string;
  AveOccup: string;
  Latitude: string;
  Longitude: string;
}

interface PredictionResult {
  "Predicted Median Income": string;
}

const PredictionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    HouseAge: "",
    AveRooms: "",
    AveBedrms: "",
    Population: "",
    AveOccup: "",
    Latitude: "",
    Longitude: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);

    try {
      // Convert string values to numbers for the API
      const numericData = Object.entries(formData).reduce((acc, [key, value]) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
          throw new Error(`Invalid value for ${key}: ${value}`);
        }
        acc[key] = numValue;
        return acc;
      }, {} as Record<string, number>);

      // Replace with your actual Django API endpoint
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(numericData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result: PredictionResult = await response.json();
      setPrediction(result["Predicted Median Income"]);
      
      toast({
        title: "Prediction Complete",
        description: "Your housing income prediction has been generated successfully.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get prediction. Please check your input values and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    { key: "HouseAge", label: "House Age (years)", placeholder: "e.g., 15", description: "Average age of houses in the area" },
    { key: "AveRooms", label: "Average Rooms", placeholder: "e.g., 6.5", description: "Average number of rooms per household" },
    { key: "AveBedrms", label: "Average Bedrooms", placeholder: "e.g., 1.2", description: "Average number of bedrooms per household" },
    { key: "Population", label: "Population", placeholder: "e.g., 3000", description: "Total population in the area" },
    { key: "AveOccup", label: "Average Occupancy", placeholder: "e.g., 3.5", description: "Average number of people per household" },
    { key: "Latitude", label: "Latitude", placeholder: "e.g., 34.05", description: "Geographic latitude coordinate" },
    { key: "Longitude", label: "Longitude", placeholder: "e.g., -118.25", description: "Geographic longitude coordinate" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Home className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-wood font-bold text-foreground">
              California Housing Predictor
            </h1>
          </div>
          <p className="text-lg text-muted-foreground font-readable">
            Predict median household income based on housing and demographic data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-wood border-border">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="flex items-center gap-2 font-wood text-foreground">
                <TrendingUp className="h-5 w-5" />
                Property Information
              </CardTitle>
              <CardDescription className="font-readable">
                Enter the housing and demographic details for prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {formFields.map(({ key, label, placeholder, description }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-sm font-semibold font-readable text-foreground">
                      {label}
                    </Label>
                    <Input
                      id={key}
                      type="number"
                      step="any"
                      placeholder={placeholder}
                      value={formData[key as keyof FormData]}
                      onChange={(e) => handleInputChange(key as keyof FormData, e.target.value)}
                      required
                      className="font-readable border-border focus:ring-ring"
                    />
                    <p className="text-xs text-muted-foreground font-readable">
                      {description}
                    </p>
                  </div>
                ))}
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-readable font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    'Predict Income'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-wood border-border">
            <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5">
              <CardTitle className="font-wood text-foreground">Prediction Result</CardTitle>
              <CardDescription className="font-readable">
                Your predicted median household income will appear here
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {prediction ? (
                <div className="text-center space-y-4">
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border">
                    <h3 className="text-lg font-semibold font-readable text-foreground mb-2">
                      Predicted Median Income
                    </h3>
                    <p className="text-3xl font-bold font-wood text-primary">
                      ${parseFloat(prediction).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground font-readable mt-2">
                      This prediction is based on the housing and demographic data you provided
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Home className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-readable">
                    Fill out the form and click "Predict Income" to see your result
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;