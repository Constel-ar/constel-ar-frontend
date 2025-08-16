"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, Globe, Twitter, CheckCircle, AlertCircle } from "lucide-react";
import { InterestsSection } from "@/components/interests-section";

interface BeneficiaryProfile {
  organizationName: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  organizationEmail: string;
  website: string;
  twitter: string;
  walletAddress: string;
  verified: boolean;
}

export function ProfileClientPage() {
  const [profile, setProfile] = useState<BeneficiaryProfile>({
    organizationName: "Fundación Esperanza",
    address: "Av. Principal 123, Ciudad, País",
    contactName: "María García",
    contactPhone: "+1 234 567 8900",
    contactEmail: "maria@fundacionesperanza.org",
    organizationEmail: "info@fundacionesperanza.org",
    website: "https://fundacionesperanza.org",
    twitter: "@FundacionEsperanza",
    walletAddress: "",
    verified: false,
  });

  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const handleInputChange = (
    field: keyof BeneficiaryProfile,
    value: string
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleConnectWallet = async () => {
    setIsConnectingWallet(true);
    // Mock wallet connection
    setTimeout(() => {
      setProfile((prev) => ({
        ...prev,
        walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      }));
      setIsConnectingWallet(false);
    }, 2000);
  };

  const handleSave = () => {
    // Mock save functionality
    console.log("Saving profile:", profile);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Bienvenido de vuelta, Fundación Esperanza
        </p>
      </div>
      {/* Organization Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la Organización</CardTitle>
          <CardDescription>
            Datos básicos de tu ONG o causa benéfica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Nombre de la Organización</Label>
              <Input
                id="orgName"
                value={profile.organizationName}
                onChange={(e) =>
                  handleInputChange("organizationName", e.target.value)
                }
                placeholder="Nombre de tu ONG"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgEmail">Email de la Organización</Label>
              <Input
                id="orgEmail"
                type="email"
                value={profile.organizationEmail}
                onChange={(e) =>
                  handleInputChange("organizationEmail", e.target.value)
                }
                placeholder="info@tuong.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Textarea
              id="address"
              value={profile.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Dirección completa de la organización"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
          <CardDescription>
            Datos del representante legal o contacto principal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Nombre del Titular</Label>
              <Input
                id="contactName"
                value={profile.contactName}
                onChange={(e) =>
                  handleInputChange("contactName", e.target.value)
                }
                placeholder="Nombre completo del representante"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Teléfono del Titular</Label>
              <Input
                id="contactPhone"
                value={profile.contactPhone}
                onChange={(e) =>
                  handleInputChange("contactPhone", e.target.value)
                }
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email del Titular</Label>
            <Input
              id="contactEmail"
              type="email"
              value={profile.contactEmail}
              onChange={(e) =>
                handleInputChange("contactEmail", e.target.value)
              }
              placeholder="representante@tuong.org"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Redes Sociales
          </CardTitle>
          <CardDescription>
            Enlaces a tus redes sociales y sitio web oficial
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Sitio Web
            </Label>
            <Input
              id="website"
              value={profile.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://tuorganizacion.org"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter
            </Label>
            <Input
              id="twitter"
              value={profile.twitter}
              onChange={(e) => handleInputChange("twitter", e.target.value)}
              placeholder="@TuOrganizacion"
            />
          </div>
        </CardContent>
      </Card>

      <InterestsSection />

      {/* Wallet Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Billetera Digital
          </CardTitle>
          <CardDescription>
            Conecta tu billetera para recibir fondos de las donaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile.walletAddress ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
                <div>
                  <p className="font-medium text-success">
                    Billetera Conectada
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {profile.walletAddress}
                  </p>
                </div>
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <Button
                variant="outline"
                onClick={() => handleInputChange("walletAddress", "")}
              >
                Desconectar Billetera
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert>
                <Wallet className="h-4 w-4" />
                <AlertDescription>
                  Para recibir fondos de tus campañas, necesitas conectar una
                  billetera digital. Los fondos se liberarán automáticamente
                  cuando completes los milestones.
                </AlertDescription>
              </Alert>
              <Button
                onClick={handleConnectWallet}
                disabled={isConnectingWallet}
                className="w-full md:w-auto"
              >
                {isConnectingWallet ? "Conectando..." : "Conectar Billetera"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
