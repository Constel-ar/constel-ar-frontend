"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, GripVertical, Target } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  order: number;
}

interface MilestoneBuilderProps {
  milestones: Milestone[];
  onMilestonesChange: (milestones: Milestone[]) => void;
  totalGoal: number;
}

export function MilestoneBuilder({
  milestones,
  onMilestonesChange,
  totalGoal,
}: MilestoneBuilderProps) {
  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title: "",
      description: "",
      targetAmount: 0,
      order: milestones.length + 1,
    };
    onMilestonesChange([...milestones, newMilestone]);
  };

  const updateMilestone = (
    id: string,
    field: keyof Milestone,
    value: string | number
  ) => {
    const updated = milestones.map((milestone) =>
      milestone.id === id ? { ...milestone, [field]: value } : milestone
    );
    onMilestonesChange(updated);
  };

  const removeMilestone = (id: string) => {
    const filtered = milestones.filter((milestone) => milestone.id !== id);
    // Reorder remaining milestones
    const reordered = filtered.map((milestone, index) => ({
      ...milestone,
      order: index + 1,
    }));
    onMilestonesChange(reordered);
  };

  const totalMilestoneAmount = milestones.reduce(
    (sum, milestone) => sum + milestone.targetAmount,
    0
  );
  const isAmountValid = totalMilestoneAmount <= totalGoal;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Milestones de la Campaña</h3>
          <p className="text-sm text-muted-foreground">
            Define los hitos que debes cumplir para recibir los fondos
            gradualmente
          </p>
        </div>
        <Button onClick={addMilestone} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Milestone
        </Button>
      </div>

      {/* Milestone Progress Visualization */}
      {milestones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Vista Previa del Progreso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Horizontal Timeline */}
              <div className="flex items-center justify-between mb-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="flex flex-col items-center relative"
                  >
                    {/* Connection Line */}
                    {index < milestones.length - 1 && (
                      <div
                        className="absolute top-4 left-8 w-full h-0.5 bg-border z-0"
                        style={{ width: "100%" }}
                      />
                    )}

                    {/* Milestone Circle */}
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium z-10 relative">
                      {index + 1}
                    </div>

                    {/* Milestone Info */}
                    <div className="mt-2 text-center max-w-24">
                      <p className="text-xs font-medium truncate">
                        {milestone.title || `Milestone ${index + 1}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${milestone.targetAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Amount Validation */}
      <div className="flex items-center justify-between p-4 rounded-lg border">
        <div>
          <p className="font-medium">
            Total de Milestones: ${totalMilestoneAmount.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Objetivo de la campaña: ${totalGoal.toLocaleString()}
          </p>
        </div>
        <Badge variant={isAmountValid ? "default" : "destructive"}>
          {isAmountValid ? "Válido" : "Excede el objetivo"}
        </Badge>
      </div>

      {/* Milestone Forms */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Card key={milestone.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">
                    Milestone {index + 1}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMilestone(milestone.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${milestone.id}`}>
                    Título del Milestone
                  </Label>
                  <Input
                    id={`title-${milestone.id}`}
                    value={milestone.title}
                    onChange={(e) =>
                      updateMilestone(milestone.id, "title", e.target.value)
                    }
                    placeholder="ej. Compra de materiales"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`amount-${milestone.id}`}>
                    Monto Objetivo ($)
                  </Label>
                  <Input
                    id={`amount-${milestone.id}`}
                    type="number"
                    value={milestone.targetAmount}
                    onChange={(e) =>
                      updateMilestone(
                        milestone.id,
                        "targetAmount",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${milestone.id}`}>
                  Descripción
                </Label>
                <Textarea
                  id={`description-${milestone.id}`}
                  value={milestone.description}
                  onChange={(e) =>
                    updateMilestone(milestone.id, "description", e.target.value)
                  }
                  placeholder="Describe qué se logrará con este milestone..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {milestones.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              No hay milestones definidos
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Los milestones te permiten recibir fondos gradualmente conforme
              cumples objetivos específicos
            </p>
            <Button onClick={addMilestone}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Milestone
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
