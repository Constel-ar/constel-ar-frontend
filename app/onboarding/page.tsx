"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Building2,
  GraduationCap,
  Leaf,
  Users,
  AlertTriangle,
  Scale,
  PawPrint,
  Laptop,
  Palette,
  Trophy,
  User,
  Building,
  Globe,
  Twitter,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { UserRole, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import Image from "next/image";

const categoryIcons = {
  Educación: GraduationCap,
  Salud: Heart,
  "Medio Ambiente": Leaf,
  Pobreza: Users,
  Emergencias: AlertTriangle,
  "Derechos Humanos": Scale,
  Animales: PawPrint,
  Tecnología: Laptop,
  "Arte y Cultura": Palette,
  Deportes: Trophy,
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organizationName: "",
    organizationAddress: "",
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    website: "",
    twitter: "",
    walletAddress: "",
    description: "",
    location: "",
    bio: "",
  });

  const router = useRouter();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const roles = [
    {
      id: "donor" as UserRole,
      title: "Donante",
      description: "Quiero apoyar causas importantes y hacer donaciones",
      icon: Heart,
    },
    {
      id: "beneficiary" as UserRole,
      title: "Beneficiario/ONG",
      description: "Represento una organización que necesita financiamiento",
      icon: Building2,
    },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const toggleInterest = (category: Category) => {
    setSelectedInterests((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = async () => {
    if (!selectedRole) return;

    try {
      // await completeOnboarding(selectedRole, selectedInterests, formData);

      if (selectedRole === "donor") {
        router.push("/contributors");
      } else if (selectedRole === "beneficiary") {
        router.push("/recipients");
      } else {
        router.push("/admins");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const canProceedStep1 = selectedRole !== null;
  const canProceedStep2 = selectedInterests.length > 0;
  const canComplete =
    selectedRole &&
    formData.name &&
    formData.email &&
    (selectedRole === "donor" ||
      (formData.organizationName &&
        formData.organizationAddress &&
        formData.contactPersonName &&
        formData.contactPersonPhone &&
        formData.contactPersonEmail));

  return (
    <div className="min-h-screen bg-background flex justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center my-8">
          <div className="flex items-center justify-center mb-2">
            <Image src="/logo.png" alt="Logo" width={70} height={32} />
          </div>
          <p className="text-muted-foreground">
            Completa tu perfil para comenzar
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Paso {currentStep} de {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% completado
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-8">
            {/* Step 1: Role Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">¿Cuál es tu rol?</h2>
                  <p className="text-muted-foreground">
                    Selecciona cómo quieres participar en nuestra plataforma
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;

                    return (
                      <Card
                        key={role.id}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "ring-2 ring-ring" : ""
                        }`}
                        onClick={() => handleRoleSelect(role.id)}
                      >
                        <CardHeader className="text-center">
                          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">
                            {role.title}
                          </CardTitle>
                          <CardDescription>{role.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Interests Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">
                    {selectedRole === "donor"
                      ? "¿Qué causas te interesan apoyar?"
                      : "¿En qué áreas trabaja tu organización?"}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedRole === "donor"
                      ? "Selecciona las categorías que más te interesan"
                      : "Esto nos ayudará a categorizar mejor tus campañas"}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {CATEGORIES.map((category) => {
                    const Icon = categoryIcons[category];
                    const isSelected = selectedInterests.includes(category);

                    return (
                      <Card
                        key={category}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "ring-2 ring-ring bg-accent" : ""
                        }`}
                        onClick={() => toggleInterest(category)}
                      >
                        <CardContent className="p-4 flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{category}</h3>
                          </div>
                          {isSelected && <Badge>✓</Badge>}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Has seleccionado {selectedInterests.length}{" "}
                    {selectedInterests.length === 1
                      ? "categoría"
                      : "categorías"}
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Profile Completion */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Completa tu perfil</h2>
                  <p className="text-muted-foreground">
                    {selectedRole === "donor"
                      ? "Información personal para donantes"
                      : "Información de tu organización"}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Información Personal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Nombre Completo{" "}
                            <Badge variant="destructive">Obligatorio</Badge>
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email{" "}
                            <Badge variant="destructive">Obligatorio</Badge>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Teléfono <Badge variant="secondary">Opcional</Badge>
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="+1234567890"
                          />
                        </div>

                        {selectedRole === "donor" && (
                          <div className="space-y-2">
                            <Label htmlFor="location">
                              Ubicación{" "}
                              <Badge variant="secondary">Opcional</Badge>
                            </Label>
                            <Input
                              id="location"
                              value={formData.location}
                              onChange={(e) =>
                                handleInputChange("location", e.target.value)
                              }
                              placeholder="Ciudad, País"
                            />
                          </div>
                        )}
                      </div>

                      {selectedRole === "donor" && (
                        <div className="space-y-2">
                          <Label htmlFor="bio">
                            Biografía{" "}
                            <Badge variant="secondary">Opcional</Badge>
                          </Label>
                          <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) =>
                              handleInputChange("bio", e.target.value)
                            }
                            placeholder="Cuéntanos un poco sobre ti..."
                            rows={3}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Organization Information - Beneficiary Only */}
                  {selectedRole === "beneficiary" && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Building className="w-5 h-5" />
                            Información de la Organización
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="organizationName">
                              Nombre de la Organización{" "}
                              <Badge variant="destructive">Obligatorio</Badge>
                            </Label>
                            <Input
                              id="organizationName"
                              value={formData.organizationName}
                              onChange={(e) =>
                                handleInputChange(
                                  "organizationName",
                                  e.target.value
                                )
                              }
                              placeholder="Nombre de tu ONG"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="organizationAddress">
                              Dirección{" "}
                              <Badge variant="destructive">Obligatorio</Badge>
                            </Label>
                            <Input
                              id="organizationAddress"
                              value={formData.organizationAddress}
                              onChange={(e) =>
                                handleInputChange(
                                  "organizationAddress",
                                  e.target.value
                                )
                              }
                              placeholder="Dirección completa"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">
                              Descripción{" "}
                              <Badge variant="secondary">Opcional</Badge>
                            </Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) =>
                                handleInputChange("description", e.target.value)
                              }
                              placeholder="Describe la misión de tu organización..."
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Persona de Contacto
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="contactPersonName">
                                Nombre del Titular{" "}
                                <Badge variant="destructive">Obligatorio</Badge>
                              </Label>
                              <Input
                                id="contactPersonName"
                                value={formData.contactPersonName}
                                onChange={(e) =>
                                  handleInputChange(
                                    "contactPersonName",
                                    e.target.value
                                  )
                                }
                                placeholder="Nombre del responsable"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="contactPersonPhone">
                                Teléfono del Titular{" "}
                                <Badge variant="destructive">Obligatorio</Badge>
                              </Label>
                              <Input
                                id="contactPersonPhone"
                                value={formData.contactPersonPhone}
                                onChange={(e) =>
                                  handleInputChange(
                                    "contactPersonPhone",
                                    e.target.value
                                  )
                                }
                                placeholder="+1234567890"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="contactPersonEmail">
                              Email del Titular{" "}
                              <Badge variant="destructive">Obligatorio</Badge>
                            </Label>
                            <Input
                              id="contactPersonEmail"
                              type="email"
                              value={formData.contactPersonEmail}
                              onChange={(e) =>
                                handleInputChange(
                                  "contactPersonEmail",
                                  e.target.value
                                )
                              }
                              placeholder="email@organizacion.com"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            Presencia Digital
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="website">
                                Sitio Web{" "}
                                <Badge variant="secondary">Opcional</Badge>
                              </Label>
                              <Input
                                id="website"
                                value={formData.website}
                                onChange={(e) =>
                                  handleInputChange("website", e.target.value)
                                }
                                placeholder="https://tuorganizacion.com"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="twitter">
                                Twitter{" "}
                                <Badge variant="secondary">Opcional</Badge>
                              </Label>
                              <div className="flex">
                                <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                                  <Twitter className="w-4 h-4" />
                                </div>
                                <Input
                                  id="twitter"
                                  value={formData.twitter}
                                  onChange={(e) =>
                                    handleInputChange("twitter", e.target.value)
                                  }
                                  placeholder="@tuorganizacion"
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="walletAddress">
                              Dirección de Billetera{" "}
                              <Badge variant="secondary">Opcional</Badge>
                            </Label>
                            <div className="flex">
                              <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                                <Wallet className="w-4 h-4" />
                              </div>
                              <Input
                                id="walletAddress"
                                value={formData.walletAddress}
                                onChange={(e) =>
                                  handleInputChange(
                                    "walletAddress",
                                    e.target.value
                                  )
                                }
                                placeholder="0x..."
                                className="rounded-l-none"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Dirección donde recibirás los fondos de las
                              donaciones
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2)
                  }
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleComplete} disabled={!canComplete}>
                  Completar Registro
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
