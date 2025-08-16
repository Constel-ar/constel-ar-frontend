"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { CATEGORIES, type Category } from "@/lib/types";
import {
  GraduationCap,
  Heart,
  Leaf,
  Users,
  AlertTriangle,
  Scale,
  PawPrint,
  Laptop,
  Palette,
  Trophy,
  Edit3,
} from "lucide-react";

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

export function InterestsSection() {
  const { user, updateInterests } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<Category[]>(
    user?.interests || []
  );

  const toggleInterest = (category: Category) => {
    setSelectedInterests((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = async () => {
    await updateInterests(selectedInterests);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedInterests(user?.interests || []);
    setIsEditing(false);
  };

  const roleText =
    user?.role === "donor"
      ? "Mis Intereses de Donación"
      : "Áreas de Trabajo de mi Organización";

  const roleDescription =
    user?.role === "donor"
      ? "Las categorías que más te interesan para recibir recomendaciones personalizadas"
      : "Las áreas en las que trabaja tu organización";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              {roleText}
            </CardTitle>
            <CardDescription>{roleDescription}</CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          <div className="flex flex-wrap gap-2">
            {(user?.interests || []).map((interest) => {
              const Icon = categoryIcons[interest];
              return (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <Icon className="w-3 h-3" />
                  {interest}
                </Badge>
              );
            })}
            {(!user?.interests || user.interests.length === 0) && (
              <p className="text-gray-500 text-sm">
                No has seleccionado intereses aún
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((category) => {
                const Icon = categoryIcons[category];
                const isSelected = selectedInterests.includes(category);

                return (
                  <div
                    key={category}
                    className={`cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => toggleInterest(category)}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{category}</span>
                      {isSelected && (
                        <Badge variant="default" className="text-xs ml-auto">
                          ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm">
                Guardar Cambios
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
