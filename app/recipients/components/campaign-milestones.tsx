"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Clock,
  Upload,
  DollarSign,
  Calendar,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  dueDate: string;
  status: "completed" | "pending" | "in_review";
  evidence?: {
    description: string;
    files: string[];
    submittedAt: string;
  };
}

interface Campaign {
  id: string;
  title: string;
  raised: number;
  goal: number;
  donors: number;
  status: "active" | "pending" | "completed";
  milestones: Milestone[];
}

interface CampaignMilestonesProps {
  campaign: Campaign;
}

export function CampaignMilestones({ campaign }: CampaignMilestonesProps) {
  const [evidenceText, setEvidenceText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleSubmitEvidence = (milestoneId: string) => {
    // Mock evidence submission
    console.log(
      "[v0] Submitting evidence for milestone:",
      milestoneId,
      evidenceText,
      selectedFiles
    );
    setEvidenceText("");
    setSelectedFiles(null);
  };

  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in_review":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="default"
            className="bg-success text-success-foreground"
          >
            Completado
          </Badge>
        );
      case "in_review":
        return (
          <Badge
            variant="secondary"
            className="bg-warning text-warning-foreground"
          >
            En Revisión
          </Badge>
        );
      default:
        return <Badge variant="outline">Pendiente</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {campaign.title}
              <Badge
                variant={campaign.status === "active" ? "default" : "secondary"}
              >
                {campaign.status === "active"
                  ? "Activa"
                  : campaign.status === "pending"
                  ? "Pendiente"
                  : "Completada"}
              </Badge>
            </CardTitle>
            <CardDescription>
              ${campaign.raised.toLocaleString()} de $
              {campaign.goal.toLocaleString()} • {campaign.donors} donantes
            </CardDescription>
          </div>
        </div>
        <Progress
          value={(campaign.raised / campaign.goal) * 100}
          className="h-2"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground mb-3">
            MILESTONES
          </h4>

          {campaign.milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {/* Timeline connector */}
              {index < campaign.milestones.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-16 bg-border" />
              )}

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(milestone.status)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{milestone.title}</h5>
                      {getStatusBadge(milestone.status)}
                    </div>

                    {milestone.status === "pending" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3 mr-1" />
                            Subir Evidencia
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Subir Evidencia</DialogTitle>
                            <DialogDescription>
                              Proporciona evidencia del progreso para:{" "}
                              {milestone.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="evidence-description">
                                Descripción de la evidencia
                              </Label>
                              <Textarea
                                id="evidence-description"
                                placeholder="Describe el progreso realizado y cómo cumple este milestone..."
                                value={evidenceText}
                                onChange={(e) =>
                                  setEvidenceText(e.target.value)
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="evidence-files">
                                Archivos de evidencia
                              </Label>
                              <Input
                                id="evidence-files"
                                type="file"
                                multiple
                                accept="image/*,application/pdf,.doc,.docx"
                                onChange={(e) =>
                                  setSelectedFiles(e.target.files)
                                }
                                className="mt-1"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Sube fotos, documentos o reportes que demuestren
                                el progreso
                              </p>
                            </div>
                            <Button
                              onClick={() => handleSubmitEvidence(milestone.id)}
                              className="w-full"
                              disabled={!evidenceText.trim()}
                            >
                              Enviar Evidencia
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {milestone.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />$
                      {milestone.targetAmount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {milestone.dueDate}
                    </span>
                  </div>

                  {milestone.evidence && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Evidencia enviada
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {milestone.evidence.submittedAt}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {milestone.evidence.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
