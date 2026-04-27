"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ReportIssueForm {
  type: string;
  consultation: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQ_CATEGORIES = ["All", "Medical", "Prescriptions", "Payments", "Legal & Compliance", "Account & Security"];

const FAQS: FAQ[] = [
  { id: "1", category: "Medical", question: "Are certificates internationally recognized?", answer: "Yes, our certificates are recognized and accepted across multiple countries and regions. They are produced in accordance with recognized standards and can be used for professional, academic, or regulatory purposes, depending on the specific program or issuing authority." },
  { id: "2", category: "Medical", question: "How do I lose a medical document during a video consultation?", answer: "All medical documents shared during a consultation are automatically saved to your secure patient portal. You can access and download them at any time from your profile under 'Medical Documents'." },
  { id: "3", category: "Medical", question: "What happens if a video call fails during a consultation?", answer: "If a video call fails, both parties receive an automatic notification. The consultation can be resumed within 10 minutes. If the issue persists, you can switch to an audio-only call or reschedule at no extra cost." },
  { id: "4", category: "Medical", question: "What if the patient didn't give consent? Can I still add a clinical note after the call?", answer: "Clinical notes require patient consent. If consent was not obtained during the call, you must obtain it separately before adding any clinical notes. Please use the consent request feature in the patient's profile." },
  { id: "5", category: "Medical", question: "Is the consultation legally covered?", answer: "Yes, all consultations conducted through NawaQare are legally covered under the applicable digital health regulations in Senegal. Our platform complies with GDPR and local health data protection laws." },
  { id: "6", category: "Medical", question: "Can I prescribe without finishing the call?", answer: "No, prescriptions can only be issued after a consultation session has been properly completed and documented. This ensures patient safety and legal compliance." },
  { id: "7", category: "Medical", question: "What happens if a video call fails during a consultation?", answer: "You will receive an alert and the session will be marked as interrupted. You can attempt to reconnect within 5 minutes or reschedule the consultation from the bookings section." },
  { id: "8", category: "Prescriptions", question: "Can I issue prescriptions for controlled substances?", answer: "Controlled substance prescriptions require additional verification steps and are subject to local regulations. Please ensure you have the necessary certifications before prescribing such medications through the platform." },
  { id: "9", category: "Prescriptions", question: "How long are digital prescriptions valid?", answer: "Digital prescriptions are valid for 90 days from the date of issue, unless otherwise specified by the prescribing doctor. The patient receives an automatic reminder before expiry." },
  { id: "10", category: "Prescriptions", question: "Can a patient request a prescription refill?", answer: "Yes, patients can request a refill through their patient portal. You will receive a notification and can approve or decline the request. Refills are subject to your clinical judgment." },
  { id: "11", category: "Payments", question: "When do I receive my payouts?", answer: "Payouts are processed weekly, every Monday, to your registered bank account. The minimum payout amount is 10,000 FCFA. You can view your payout schedule and history in the Earnings section." },
  { id: "12", category: "Payments", question: "What is the platform fee?", answer: "NawaQare charges a 15% platform fee on each completed consultation. This covers payment processing, platform maintenance, compliance, and customer support." },
  { id: "13", category: "Payments", question: "What happens if a patient disputes a payment?", answer: "Disputed payments are placed on hold while our support team investigates. You will be notified of any dispute and asked to provide documentation. Resolution typically takes 5–7 business days." },
  { id: "14", category: "Legal & Compliance", question: "What happens if my medical license expires?", answer: "You will receive reminders 60, 30, and 7 days before expiry. Once expired, your ability to conduct consultations will be suspended until the license is renewed and verified by our compliance team." },
  { id: "15", category: "Legal & Compliance", question: "Is patient data stored securely?", answer: "Yes, all patient data is encrypted at rest and in transit using AES-256 and TLS 1.3. We comply with GDPR and local Senegalese health data regulations. Data is never shared with third parties without explicit consent." },
  { id: "16", category: "Account & Security", question: "How do I enable two-factor authentication?", answer: "Go to Profile → Privacy & Security → Two-Factor Authentication. You can enable it via SMS or an authenticator app. We strongly recommend enabling 2FA for all accounts." },
  { id: "17", category: "Account & Security", question: "What should I do if I suspect unauthorized access to my account?", answer: "Immediately change your password and contact our support team at support@nawaqare.sn. We can suspend your account temporarily and run a security audit while you regain secure access." },
];

const QUICK_HELP_ITEMS = [
  { icon: "mdi:video-outline", label: "Video call issues", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: "mdi:prescription", label: "Prescriptions & signing", color: "text-green-500", bg: "bg-green-50" },
  { icon: "mdi:calendar-check-outline", label: "Appointments & agenda", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: "mdi:currency-usd", label: "Payments & payouts", color: "text-yellow-600", bg: "bg-yellow-50" },
  { icon: "mdi:file-document-outline", label: "Medical documents & reports", color: "text-red-500", bg: "bg-red-50" },
  { icon: "mdi:shield-lock-outline", label: "Security & access", color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: "mdi:cog-outline", label: "Account & settings", color: "text-gray-500", bg: "bg-gray-100" },
];

const ISSUE_TYPES = [
  "Select a bug",
  "Video Call Issue",
  "Prescription Problem",
  "Payment Issue",
  "Account Access",
  "Technical Bug",
  "Other",
];

// ─── Component ────────────────────────────────────────────────────────────────
const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedQuickHelp, setSelectedQuickHelp] = useState<string | null>(null);
  const [reportForm, setReportForm] = useState<ReportIssueForm>({ type: "", consultation: "", description: "" });
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const filteredFaqs = activeCategory === "All"
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const handleReportSubmit = async () => {
    setReportSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setReportSubmitting(false);
    setReportSuccess(true);
    setTimeout(() => {
      setShowReportModal(false);
      setReportSuccess(false);
      setReportForm({ type: "", consultation: "", description: "" });
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4" className="text-text-color1 font-semibold">Help Center</Typography>
          <Typography variant="p" className="text-text-color3 text-sm mt-1">Find answers and get support</Typography>
        </div>
        <Button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 bg-primary-color text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          <Icon icon="mdi:alert-circle-outline" width={16} />
          Report an Issue
        </Button>
      </div>

      {/* Contact Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <Typography variant="h6" className="text-text-color1 font-semibold mb-1">Consultation payment</Typography>
        <Typography variant="p" className="text-text-color3 text-sm mb-4">
          Appointment by Alex Martin — <span className="text-primary-color font-medium">Online · Sent</span>
        </Typography>
        <div className="flex flex-wrap gap-8 items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Icon icon="mdi:phone-outline" className="text-primary-color" width={20} />
            </div>
            <div>
              <Typography variant="p" className="text-text-color3 text-xs">Phone</Typography>
              <Typography variant="p" className="text-text-color1 font-medium text-sm">03 5012 1234</Typography>
              <Typography variant="p" className="text-text-color3 text-xs">Reply in · 24 Hours</Typography>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Icon icon="mdi:email-outline" className="text-primary-color" width={20} />
            </div>
            <div>
              <Typography variant="p" className="text-text-color3 text-xs">Email</Typography>
              <Typography variant="p" className="text-text-color1 font-medium text-sm">support@nawaqare.sn</Typography>
              <Typography variant="p" className="text-text-color3 text-xs">Reply in · 24 Hours</Typography>
            </div>
          </div>
          <button className="ml-auto bg-primary-color text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            Contact Support
          </button>
        </div>

        {/* Quick Help */}
        <div className="mt-6">
          <Typography variant="h6" className="text-text-color1 font-semibold mb-3">Quick Help</Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {QUICK_HELP_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => setSelectedQuickHelp(selectedQuickHelp === item.label ? null : item.label)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                  selectedQuickHelp === item.label
                    ? "border-primary-color bg-blue-50"
                    : "border-gray-100 bg-gray-50 hover:border-primary-color hover:bg-blue-50"
                }`}
              >
                <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                  <Icon icon={item.icon} className={item.color} width={20} />
                </div>
                <Typography variant="p" className="text-text-color1 text-xs font-medium leading-tight">{item.label}</Typography>
                <span className="text-primary-color text-xs underline">View Detail</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Help expanded detail */}
        {selectedQuickHelp && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <Typography variant="h6" className="text-text-color1 font-semibold">{selectedQuickHelp}</Typography>
              <button onClick={() => setSelectedQuickHelp(null)}>
                <Icon icon="mdi:close" className="text-text-color3" width={18} />
              </button>
            </div>
            {FAQS.slice(0, 5).map((faq) => (
              <div key={faq.id} className="border-b border-blue-100 last:border-0">
                <button
                  onClick={() => setOpenFaqId(openFaqId === `quick-${faq.id}` ? null : `quick-${faq.id}`)}
                  className="w-full text-left flex items-center justify-between py-2.5"
                >
                  <Typography variant="p" className="text-text-color1 text-sm">{faq.question}</Typography>
                  <Icon icon={openFaqId === `quick-${faq.id}` ? "mdi:chevron-up" : "mdi:chevron-down"} className="text-text-color3 flex-shrink-0 ml-2" width={18} />
                </button>
                {openFaqId === `quick-${faq.id}` && (
                  <Typography variant="p" className="text-text-color3 text-sm pb-2 px-1">{faq.answer}</Typography>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <Typography variant="h6" className="text-text-color1 font-semibold mb-4">FAQ&apos;s</Typography>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-5 border-b border-gray-100 pb-4">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary-color text-white"
                  : "bg-gray-100 text-text-color3 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2">
          {filteredFaqs.map((faq, index) => (
            <div key={faq.id} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
              >
                <Typography variant="p" className="text-text-color1 text-sm font-medium">
                  {index + 1}. {faq.question}
                </Typography>
                <Icon
                  icon={openFaqId === faq.id ? "mdi:chevron-up" : "mdi:chevron-down"}
                  className="text-text-color3 flex-shrink-0 ml-3"
                  width={20}
                />
              </button>
              {openFaqId === faq.id && (
                <div className="px-4 pb-4 bg-gray-50">
                  <Typography variant="p" className="text-text-color3 text-sm leading-relaxed">
                    {faq.answer}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-6 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:shield-check-outline" className="text-green-500" width={16} />
            <Typography variant="p" className="text-text-color3 text-xs">Support access is logged for compliance</Typography>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:lock-outline" className="text-red-400" width={16} />
            <Typography variant="p" className="text-text-color3 text-xs">Medical data is never shared via email</Typography>
          </div>
        </div>
      </div>

      {/* ─── Report an Issue Modal ─── */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <Typography variant="h6" className="text-text-color1 font-semibold">Report An Issue</Typography>
              <button
                onClick={() => { setShowReportModal(false); setReportSuccess(false); }}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              >
                <Icon icon="mdi:close" width={18} className="text-text-color3" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Icon icon="mdi:check-circle" className="text-green-500" width={36} />
                </div>
                <Typography variant="h6" className="text-text-color1 font-semibold">Issue Reported!</Typography>
                <Typography variant="p" className="text-text-color3 text-sm mt-1">
                  Our support team will get back to you within 24 hours.
                </Typography>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-color1 mb-1">Type of Issue</label>
                  <select
                    value={reportForm.type}
                    onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-text-color1 focus:outline-none focus:border-primary-color bg-white"
                  >
                    {ISSUE_TYPES.map((t) => <option key={t} value={t === "Select a bug" ? "" : t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-color1 mb-1">Consultation</label>
                  <select
                    value={reportForm.consultation}
                    onChange={(e) => setReportForm({ ...reportForm, consultation: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-text-color1 focus:outline-none focus:border-primary-color bg-white"
                  >
                    <option value="">Consultation Id — Select appointment</option>
                    <option value="CON-001">CON-001 — Sarah Johnson (Apr 25, 2026)</option>
                    <option value="CON-002">CON-002 — Alex Martin (Apr 22, 2026)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-color1 mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={reportForm.description}
                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                    placeholder="Please describe what you are experiencing..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-text-color1 focus:outline-none focus:border-primary-color resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 py-2.5 rounded-lg border border-gray-200 text-text-color3 text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportSubmit}
                    disabled={reportSubmitting || !reportForm.type || !reportForm.description}
                    className="flex-1 py-2.5 rounded-lg bg-primary-color text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reportSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
