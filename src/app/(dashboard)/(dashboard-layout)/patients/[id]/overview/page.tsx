"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { getPatientOverview } from "@/api/service/patient-records";

interface PageProps { params: { id: string } }

const PatientOverviewPage = ({ params }: PageProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatientOverview(params.id)
      .then(setOverview)
      .catch(() => setOverview(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  const profile = overview?.profile ?? { firstName: "Patient", lastName: "", age: "—", bloodGroup: "—", gender: "—" };
  const stats = overview?.stats ?? { totalConsultations: 0, upToDateVaccinations: 0, activeMedications: 0 };
  const lastConsultation = overview?.lastConsultation ?? null;

  const tabs = [
    { id: "overview", label: "Overview", href: `/patients/${params.id}/overview` },
    { id: "timeline", label: "Timeline", href: `/patients/${params.id}/timeline` },
    { id: "vaccinations", label: "Vaccinations", href: `/patients/${params.id}/vaccinations` },
  ];

  return (
    <div className="space-y-5">
      <button onClick={() => history.back()} className="flex items-center gap-2 text-text-color3 hover:text-primary-color transition text-sm">
        <Icon icon="mdi:arrow-left" width={18} /> Retour aux patients
      </button>

      {/* Patient Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
            <div className="relative">
              <Image src="/assets/svg/sehrImg2.svg" alt="patient" width={80} height={80} className="rounded-full" />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Typography variant="h4" className="font-bold text-text-color1">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Icon icon="mdi:check-circle" width={12} /> Verified
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-text-color3">
                <span className="flex items-center gap-1"><Icon icon="mdi:account-outline" width={16} />{profile.gender || "—"}</span>
                <span className="flex items-center gap-1"><Icon icon="mdi:calendar-outline" width={16} />{profile.age ? `${profile.age} ans` : "—"}</span>
                <span className="flex items-center gap-1"><Icon icon="mdi:water-outline" width={16} />Groupe {profile.bloodGroup || "—"}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/patients/${params.id}/timeline`}>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-text-color1 hover:bg-gray-50 transition">
                  <Icon icon="mdi:timeline" width={16} /> Timeline
                </button>
              </Link>
              <Link href="/chat">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded-lg text-sm hover:opacity-90 transition">
                  <Icon icon="mdi:message-outline" width={16} /> Contacter
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 w-fit">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-primary-color text-white" : "text-text-color3 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Consultations", value: stats.totalConsultations, icon: "mdi:stethoscope", color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Vaccinations à jour", value: stats.upToDateVaccinations, icon: "mdi:needle", color: "text-green-500", bg: "bg-green-50" },
          { label: "Médicaments actifs", value: stats.activeMedications, icon: "mdi:pill", color: "text-purple-500", bg: "bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <Icon icon={stat.icon} className={stat.color} width={24} />
            </div>
            <div>
              <Typography variant="h4" className={`font-bold ${stat.color}`}>{loading ? "—" : stat.value}</Typography>
              <Typography variant="p" className="text-text-color3 text-xs">{stat.label}</Typography>
            </div>
          </div>
        ))}
      </div>

      {/* Last consultation */}
      {!loading && lastConsultation && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <Typography variant="h6" className="font-semibold text-text-color1 mb-4">Dernière consultation</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Typography variant="p" className="text-xs text-text-color3">Date</Typography>
              <Typography variant="p" className="text-text-color1 font-medium">
                {new Date(lastConsultation.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </Typography>
            </div>
            <div>
              <Typography variant="p" className="text-xs text-text-color3">Assessment</Typography>
              <Typography variant="p" className="text-text-color1 font-medium">{lastConsultation.assessment}</Typography>
            </div>
            <div>
              <Typography variant="p" className="text-xs text-text-color3">Diagnostic</Typography>
              <Typography variant="p" className="text-text-color1 font-medium">{lastConsultation.diagnosis}</Typography>
            </div>
          </div>
        </div>
      )}

      {/* Quick nav */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { href: `/patients/${params.id}/timeline`, icon: "mdi:timeline", label: "Timeline médicale", desc: "Historique complet des événements", color: "text-blue-500", bg: "bg-blue-50" },
          { href: `/patients/${params.id}/vaccinations`, icon: "mdi:needle", label: "Carnet vaccinal", desc: "Statut et historique des vaccins", color: "text-green-500", bg: "bg-green-50" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-primary-color transition group">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center group-hover:bg-primary-color transition`}>
                <Icon icon={item.icon} className={`${item.color} group-hover:text-white transition`} width={20} />
              </div>
              <div>
                <Typography variant="h6" className="font-semibold text-text-color1">{item.label}</Typography>
                <Typography variant="p" className="text-xs text-text-color3">{item.desc}</Typography>
              </div>
              <Icon icon="mdi:chevron-right" className="text-text-color3 ml-auto" width={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PatientOverviewPage;
