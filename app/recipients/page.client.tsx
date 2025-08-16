"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  Plus,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { CampaignMilestones } from "./components/campaign-milestones";
import Link from "next/link";

export function RecipientsClientPage() {
  const hasActiveCampaign = true; // This would come from your data source
  const campaignJustCreated = false; // This would be set when a campaign is created

  // Mock data for single campaign
  const campaign = {
    id: "1",
    title: "Educación para Niños Rurales",
    raised: 45000,
    goal: 60000,
    donors: 234,
    status: "active" as const,
    createdAt: "2024-01-05",
    milestones: [
      {
        id: "m1",
        title: "Compra de materiales educativos",
        description:
          "Adquisición de libros, cuadernos y útiles escolares para 100 niños",
        targetAmount: 15000,
        dueDate: "15 Ene 2024",
        status: "completed" as const,
        evidence: {
          description:
            "Se compraron todos los materiales educativos según la lista. Se adjuntan facturas y fotos de la entrega.",
          files: ["factura_materiales.pdf", "entrega_materiales.jpg"],
          submittedAt: "10 Ene 2024",
        },
      },
      {
        id: "m2",
        title: "Construcción de aulas temporales",
        description:
          "Construcción de 2 aulas temporales para albergar a los estudiantes",
        targetAmount: 25000,
        dueDate: "28 Feb 2024",
        status: "in_review" as const,
        evidence: {
          description:
            "Las aulas están 80% completadas. Se adjuntan fotos del progreso y reporte del constructor.",
          files: ["progreso_construccion.jpg", "reporte_constructor.pdf"],
          submittedAt: "25 Feb 2024",
        },
      },
      {
        id: "m3",
        title: "Contratación de maestros",
        description: "Contratación y capacitación de 3 maestros especializados",
        targetAmount: 20000,
        dueDate: "15 Mar 2024",
        status: "pending" as const,
      },
    ],
  };

  const nextMilestone = campaign?.milestones.find(
    (m) => m.status === "pending"
  );
  const completedMilestones =
    campaign?.milestones.filter((m) => m.status === "completed").length || 0;
  const totalMilestones = campaign?.milestones.length || 0;

  return (
    <div className="w-full">
      <div className="space-y-6">
        {campaignJustCreated && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              ¡Campaña creada exitosamente! Tu campaña está siendo revisada por
              nuestro equipo y será publicada pronto.
            </AlertDescription>
          </Alert>
        )}

        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido de vuelta, Fundación Esperanza
            </p>
          </div>
          {hasActiveCampaign ? (
            <Alert className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Solo puedes tener una campaña activa a la vez. Completa tu
                campaña actual antes de crear una nueva.
              </AlertDescription>
            </Alert>
          ) : (
            <Button asChild>
              <Link href="/recipients/create-campaign">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Campaña
              </Link>
            </Button>
          )}
        </div>

        {hasActiveCampaign && campaign ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Recaudado
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${campaign.raised.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  de ${campaign.goal.toLocaleString()} objetivo
                </p>
                <Progress
                  value={(campaign.raised / campaign.goal) * 100}
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Donantes
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.donors}</div>
                <p className="text-xs text-muted-foreground">
                  personas han donado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Progreso Milestones
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedMilestones}/{totalMilestones}
                </div>
                <p className="text-xs text-muted-foreground">completados</p>
                <Progress
                  value={(completedMilestones / totalMilestones) * 100}
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Próximo Milestone
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {nextMilestone ? (
                  <>
                    <div className="text-lg font-bold truncate">
                      {nextMilestone.title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Vence: {nextMilestone.dueDate}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-bold text-green-600">
                      ¡Completado!
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Todos los milestones
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Crea tu primera campaña
                </h3>
                <p className="text-muted-foreground">
                  Comienza a recaudar fondos para tu causa
                </p>
              </div>
              <Button asChild>
                <Link href="/recipients/create-campaign">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Campaña
                </Link>
              </Button>
            </div>
          </Card>
        )}

        {hasActiveCampaign && campaign && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Mi Campaña y Milestones
                </h2>
                <p className="text-sm text-muted-foreground">
                  Gestiona el progreso y sube evidencias para cada milestone
                </p>
              </div>
            </div>

            <CampaignMilestones campaign={campaign} />
          </div>
        )}
      </div>
    </div>
  );
}
