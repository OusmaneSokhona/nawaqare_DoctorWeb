"use client";

import { useState } from "react";
import { Typography } from "@/components/shared/typography";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface FollowUpObjective {
  id: string;
  title: string;
}

interface ControlVisit {
  id: string;
  date: string;
  type: "teleconsultation" | "in-person";
  reason: string;
}

interface Reminder {
  id: string;
  type: string;
  enabled: boolean;
}

interface RedFlag {
  id: string;
  warning: string;
}

const FollowUpPlanPage = ({ params }: { params: { id: string } }) => {
  const consultationId = params.id;

  const [objectives, setObjectives] = useState<FollowUpObjective[]>([
    { id: "1", title: "Blood pressure < 130/80 mmHg" },
    { id: "2", title: "Weight loss 2kg" },
    { id: "3", title: "Increase physical activity to 30 min daily" },
  ]);

  const [controlVisits, setControlVisits] = useState<ControlVisit[]>([
    {
      id: "1",
      date: "2025-05-15",
      type: "in-person",
      reason: "Blood pressure check and medication review",
    },
    {
      id: "2",
      date: "2025-06-15",
      type: "teleconsultation",
      reason: "Weight progress assessment",
    },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: "1", type: "Medication reminder", enabled: true },
    { id: "2", type: "Appointment reminder", enabled: true },
    { id: "3", type: "Test results reminder", enabled: false },
  ]);

  const [redFlags, setRedFlags] = useState<RedFlag[]>([
    { id: "1", warning: "Chest pain or shortness of breath" },
    { id: "2", warning: "Severe headaches or dizziness" },
    { id: "3", warning: "Sudden vision changes" },
    { id: "4", warning: "Signs of infection (fever > 38.5°C)" },
  ]);

  const [newObjective, setNewObjective] = useState("");
  const [newRedFlag, setNewRedFlag] = useState("");
  const [newVisitDate, setNewVisitDate] = useState("");
  const [newVisitType, setNewVisitType] = useState<"teleconsultation" | "in-person">(
    "in-person"
  );
  const [newVisitReason, setNewVisitReason] = useState("");

  const addObjective = () => {
    if (newObjective.trim()) {
      setObjectives([
        ...objectives,
        { id: String(objectives.length + 1), title: newObjective },
      ]);
      setNewObjective("");
    }
  };

  const removeObjective = (id: string) => {
    setObjectives(objectives.filter((obj) => obj.id !== id));
  };

  const addRedFlag = () => {
    if (newRedFlag.trim()) {
      setRedFlags([
        ...redFlags,
        { id: String(redFlags.length + 1), warning: newRedFlag },
      ]);
      setNewRedFlag("");
    }
  };

  const removeRedFlag = (id: string) => {
    setRedFlags(redFlags.filter((flag) => flag.id !== id));
  };

  const addControlVisit = () => {
    if (newVisitDate && newVisitReason.trim()) {
      setControlVisits([
        ...controlVisits,
        {
          id: String(controlVisits.length + 1),
          date: newVisitDate,
          type: newVisitType,
          reason: newVisitReason,
        },
      ]);
      setNewVisitDate("");
      setNewVisitReason("");
      setNewVisitType("in-person");
    }
  };

  const removeControlVisit = (id: string) => {
    setControlVisits(controlVisits.filter((visit) => visit.id !== id));
  };

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
      )
    );
  };

  const handleSave = () => {
    alert("Follow-up plan saved successfully!");
  };

  return (
    <div className="mt-5">
      <div className="mb-8">
        <Typography size="h5" as="h5" className="font-bold">
          Follow-up Plan
        </Typography>
        <Typography className="text-[#828282] text-sm">
          Post-consultation care plan and monitoring
        </Typography>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8e8e8]">
          <div className="flex items-center gap-2 mb-4">
            <Icon icon="mingcute:target-fill" width="24" height="24" className="text-[#2f80ed]" />
            <Typography size="h6" as="h6" className="font-bold">
              Treatment Objectives
            </Typography>
          </div>

          <div className="space-y-3 mb-4">
            {objectives.map((obj) => (
              <div
                key={obj.id}
                className="flex items-center justify-between bg-[#f9f9f9] p-4 rounded-[8px] border border-[#e8e8e8]"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mingcute:check-line" width="20" height="20" className="text-[#27ae60]" />
                  <Typography className="text-sm font-medium">{obj.title}</Typography>
                </div>
                <button
                  onClick={() => removeObjective(obj.id)}
                  className="text-[#eb4824] hover:text-[#c93416] transition-colors"
                >
                  <Icon icon="mingcute:close-line" width="20" height="20" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addObjective()}
              placeholder="Add new objective (e.g., 'Reduce weight by 5kg')..."
              className="flex-1 px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
            />
            <button
              onClick={addObjective}
              className="bg-[#2f80ed] text-white px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity font-medium"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8e8e8]">
          <div className="flex items-center gap-2 mb-4">
            <Icon icon="mingcute:calendar-event-fill" width="24" height="24" className="text-[#2f80ed]" />
            <Typography size="h6" as="h6" className="font-bold">
              Control Visits
            </Typography>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead className="bg-[#f9f9f9] border-b border-[#e8e8e8]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-[#333]">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#333]">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#333]">Reason</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#333]">Action</th>
                </tr>
              </thead>
              <tbody>
                {controlVisits.map((visit) => (
                  <tr key={visit.id} className="border-b border-[#e8e8e8] hover:bg-[#fafafa]">
                    <td className="px-4 py-3 text-[#333] font-medium">{visit.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          visit.type === "teleconsultation"
                            ? "bg-[#E0F3FF] text-[#2f80ed]"
                            : "bg-[#FFF3E0] text-[#f2994a]"
                        }`}
                      >
                        {visit.type === "teleconsultation" ? "Teleconsultation" : "In-Person"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#666]">{visit.reason}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeControlVisit(visit.id)}
                        className="text-[#eb4824] hover:text-[#c93416] transition-colors"
                      >
                        <Icon icon="mingcute:delete-2-line" width="18" height="18" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 mb-4 p-4 bg-[#f9f9f9] rounded-[8px] border border-[#e8e8e8]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-[#333]">Visit Date</label>
                <input
                  type="date"
                  value={newVisitDate}
                  onChange={(e) => setNewVisitDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e8e8e8] rounded-[6px] text-sm focus:outline-none focus:border-[#2f80ed]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-[#333]">Type</label>
                <select
                  value={newVisitType}
                  onChange={(e) => setNewVisitType(e.target.value as "teleconsultation" | "in-person")}
                  className="w-full px-3 py-2 border border-[#e8e8e8] rounded-[6px] text-sm focus:outline-none focus:border-[#2f80ed]"
                >
                  <option value="in-person">In-Person</option>
                  <option value="teleconsultation">Teleconsultation</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-[#333]">Reason</label>
              <input
                type="text"
                value={newVisitReason}
                onChange={(e) => setNewVisitReason(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addControlVisit()}
                placeholder="e.g., Blood pressure check, weight assessment..."
                className="w-full px-3 py-2 border border-[#e8e8e8] rounded-[6px] text-sm focus:outline-none focus:border-[#2f80ed]"
              />
            </div>
            <button
              onClick={addControlVisit}
              className="w-full bg-[#2f80ed] text-white py-2 rounded-[6px] hover:opacity-90 transition-opacity font-medium text-sm"
            >
              Add Visit
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8e8e8]">
          <div className="flex items-center gap-2 mb-4">
            <Icon icon="mingcute:bell-fill" width="24" height="24" className="text-[#2f80ed]" />
            <Typography size="h6" as="h6" className="font-bold">
              Automated Reminders
            </Typography>
          </div>

          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between bg-[#f9f9f9] p-4 rounded-[8px] border border-[#e8e8e8]"
              >
                <Typography className="text-sm font-medium">{reminder.type}</Typography>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reminder.enabled}
                    onChange={() => toggleReminder(reminder.id)}
                    className="w-5 h-5 accent-[#2f80ed]"
                  />
                  <span className="text-xs font-medium text-[#666]">
                    {reminder.enabled ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8e8e8]">
          <div className="flex items-center gap-2 mb-4">
            <Icon icon="mingcute:alert-circle-fill" width="24" height="24" className="text-[#eb4824]" />
            <Typography size="h6" as="h6" className="font-bold text-[#eb4824]">
              Red Flags & Warning Signs
            </Typography>
          </div>

          <div className="space-y-3 mb-4">
            {redFlags.map((flag) => (
              <div
                key={flag.id}
                className="flex items-center justify-between bg-[#FFEBEE] p-4 rounded-[8px] border border-[#ffcdd2]"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    icon="mingcute:warning-fill"
                    width="20"
                    height="20"
                    className="text-[#eb4824]"
                  />
                  <Typography className="text-sm font-medium text-[#eb4824]">
                    {flag.warning}
                  </Typography>
                </div>
                <button
                  onClick={() => removeRedFlag(flag.id)}
                  className="text-[#eb4824] hover:text-[#c93416] transition-colors"
                >
                  <Icon icon="mingcute:close-line" width="20" height="20" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newRedFlag}
              onChange={(e) => setNewRedFlag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addRedFlag()}
              placeholder="Add warning sign to watch for..."
              className="flex-1 px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#eb4824]"
            />
            <button
              onClick={addRedFlag}
              className="bg-[#eb4824] text-white px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity font-medium"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-[#e8e8e8]">
          <div className="flex items-center gap-2 mb-4">
            <Icon icon="mingcute:document-fill" width="24" height="24" className="text-[#2f80ed]" />
            <Typography size="h6" as="h6" className="font-bold">
              Patient Post-Consultation Summary (French)
            </Typography>
          </div>

          <div className="bg-[#f9f9f9] p-5 rounded-[8px] border border-[#e8e8e8] text-sm leading-relaxed text-[#333] space-y-4">
            <div>
              <Typography className="font-bold mb-2">Résumé de Consultation</Typography>
              <Typography className="text-xs">
                Patient : Ahmed Hassan Mohammed | Date : {new Date().toLocaleDateString("fr-FR")}
              </Typography>
            </div>

            <div>
              <Typography className="font-bold text-[#2f80ed] mb-2">Diagnostic</Typography>
              <Typography className="text-sm">
                Hypertension artérielle (tension artérielle élevée) avec surpoids associé. Besoin de
                gestion médicale et de modifications du mode de vie.
              </Typography>
            </div>

            <div>
              <Typography className="font-bold text-[#2f80ed] mb-2">Recommandations</Typography>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Prendre les médicaments prescrits régulièrement</li>
                <li>Réduire la consommation de sel et de sodium</li>
                <li>Faire 30 minutes d'activité physique quotidiennement</li>
                <li>Surveiller la tension artérielle à domicile</li>
                <li>Perte de poids progressive (2 kg par mois)</li>
              </ul>
            </div>

            <div>
              <Typography className="font-bold text-[#2f80ed] mb-2">Prochaines Étapes</Typography>
              <Typography className="text-sm">
                Visite de suivi prévue le 15 mai 2025. Apporter les relevés de tension artérielle.
                En cas de symptômes graves, consulter immédiatement.
              </Typography>
            </div>

            <div>
              <Typography className="font-bold text-[#2f80ed] mb-2">Signes d'Alerte</Typography>
              <Typography className="text-sm">
                Consultez immédiatement en cas de : douleur thoracique, essoufflement grave,
                maux de tête sévères, ou vertiges importants.
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6 mb-6">
        <button
          onClick={handleSave}
          className="bg-[#27ae60] text-white px-8 py-3 rounded-[12px] hover:opacity-90 transition-opacity font-bold flex items-center gap-2"
        >
          <Icon icon="mingcute:check-circle-fill" width="20" height="20" />
          Save Plan
        </button>
        <button className="border border-[#828282] text-[#333] px-8 py-3 rounded-[12px] hover:bg-[#f5f5f5] transition-colors font-bold">
          Preview as PDF
        </button>
      </div>
    </div>
  );
};

export default FollowUpPlanPage;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         