"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MilestoneBuilder } from "./components/milestone-builder";
import { CATEGORIES } from "@/lib/types";
import { Upload, X, AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";

interface CampaignFormData {
  title: string;
  description: string;
  category: string;
  goalAmount: number;
  minDonation: number;
  location: string;
  images: string[];
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    targetAmount: number;
    order: number;
  }>;
}

export function CreateCampaignPageClient() {
  const router = useRouter();
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    category: "",
    goalAmount: 0,
    minDonation: 0,
    location: "",
    images: [],
    milestones: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof CampaignFormData,
    value: string | number | string[] | CampaignFormData["milestones"]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Mock image upload - in real app, upload to cloud storage
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "El título es requerido";
    if (!formData.description.trim())
      newErrors.description = "La descripción es requerida";
    if (!formData.category) newErrors.category = "La categoría es requerida";
    if (formData.goalAmount <= 0)
      newErrors.goalAmount = "El objetivo debe ser mayor a 0";
    if (formData.minDonation <= 0)
      newErrors.minDonation = "La donación mínima debe ser mayor a 0";
    if (formData.minDonation > formData.goalAmount)
      newErrors.minDonation =
        "La donación mínima no puede ser mayor al objetivo";
    if (!formData.location.trim())
      newErrors.location = "La ubicación es requerida";
    if (formData.images.length === 0)
      newErrors.images = "Debes subir al menos una imagen";
    if (formData.milestones.length === 0)
      newErrors.milestones = "Debes crear al menos un milestone";

    const totalMilestoneAmount = formData.milestones.reduce(
      (sum, milestone) => sum + milestone.targetAmount,
      0
    );
    if (totalMilestoneAmount > formData.goalAmount) {
      newErrors.milestones =
        "El total de milestones no puede exceder el objetivo de la campaña";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, send to backend
      console.log("Creating campaign:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to campaigns list
      router.push("/dashboard/campaigns");
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalMilestoneAmount = formData.milestones.reduce(
    (sum, milestone) => sum + milestone.targetAmount,
    0
  );
  const isMilestoneAmountValid = totalMilestoneAmount <= formData.goalAmount;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Crear Campaña</h1>
        <p className="text-muted-foreground">
          Bienvenido de vuelta, Fundación Esperanza
        </p>
      </div>

      {/* Basic Information */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
          <CardDescription>
            Datos principales de tu campaña de crowdfunding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la Campaña *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="ej. Educación de Calidad para Niños Rurales"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger
                  className={errors.category ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="ej. Lima, Perú"
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe tu campaña, el problema que resuelve y cómo usarás los fondos..."
              rows={4}
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Financial Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos Financieros</CardTitle>
          <CardDescription>
            Define cuánto necesitas recaudar y las condiciones de donación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goalAmount">Objetivo de Recaudación ($) *</Label>
              <Input
                id="goalAmount"
                type="number"
                value={formData.goalAmount}
                onChange={(e) =>
                  handleInputChange(
                    "goalAmount",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="50000"
                min="1"
                className={errors.goalAmount ? "border-destructive" : ""}
              />
              {errors.goalAmount && (
                <p className="text-sm text-destructive">{errors.goalAmount}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="minDonation">Donación Mínima ($) *</Label>
              <Input
                id="minDonation"
                type="number"
                value={formData.minDonation}
                onChange={(e) =>
                  handleInputChange(
                    "minDonation",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="10"
                min="1"
                className={errors.minDonation ? "border-destructive" : ""}
              />
              {errors.minDonation && (
                <p className="text-sm text-destructive">{errors.minDonation}</p>
              )}
            </div>
          </div>

          {formData.goalAmount > 0 && formData.minDonation > 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Con donaciones de ${formData.minDonation}, necesitarás
                aproximadamente{" "}
                {Math.ceil(formData.goalAmount / formData.minDonation)} donantes
                para alcanzar tu objetivo.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Imágenes de la Campaña</CardTitle>
          <CardDescription>
            Sube imágenes que muestren tu causa y generen confianza en los
            donantes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="images">Subir Imágenes *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Label htmlFor="images" className="cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Haz clic para subir imágenes o arrastra y suelta aquí
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG hasta 5MB cada una
                </p>
              </Label>
            </div>
            {errors.images && (
              <p className="text-sm text-destructive">{errors.images}</p>
            )}
          </div>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <Image
                    width={120}
                    height={120}
                    src={image || "/placeholder.svg"}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardContent className="pt-6">
          <MilestoneBuilder
            milestones={formData.milestones}
            onMilestonesChange={(milestones) =>
              handleInputChange("milestones", milestones)
            }
            totalGoal={formData.goalAmount}
          />
          {errors.milestones && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.milestones}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>

        <div className="flex items-center gap-4">
          {!isMilestoneAmountValid && (
            <Badge variant="destructive">
              Los milestones exceden el objetivo
            </Badge>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || !isMilestoneAmountValid}
          >
            {isSubmitting ? "Creando Campaña..." : "Crear Campaña"}
          </Button>
        </div>
      </div>
    </form>
  );
}
