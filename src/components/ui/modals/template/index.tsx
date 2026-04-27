import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";

interface MedicationTemplateData {
  templateName: string;
  refillDate: string;
  medicationName: string;
  form: string;
  dosage: string;
  category: string;
  quantityToDispense: string;
  routeOfAdministration: string;
  specialInstructions: string;
}

interface AddMedicationTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MedicationTemplateData) => void;
  mode?: "add" | "edit";
  initialData?: MedicationTemplateData;
}

const AddMedicationTemplateModal: React.FC<AddMedicationTemplateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  mode = "add",
  initialData,
}) => {
  const [formData, setFormData] = useState<MedicationTemplateData>({
    templateName: "",
    refillDate: "",
    medicationName: "",
    form: "",
    dosage: "",
    category: "",
    quantityToDispense: "",
    routeOfAdministration: "",
    specialInstructions: "",
  });

  const forms = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection",
    "Cream",
    "Drops",
    "Inhaler",
  ];
  const categories = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "General",
  ];
  const routes = [
    "Oral",
    "Topical",
    "Intravenous",
    "Intramuscular",
    "Subcutaneous",
    "Inhalation",
  ];

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        templateName: "",
        refillDate: "",
        medicationName: "",
        form: "",
        dosage: "",
        category: "",
        quantityToDispense: "",
        routeOfAdministration: "",
        specialInstructions: "",
      });
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (field: keyof MedicationTemplateData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.templateName || !formData.medicationName || !formData.form) {
      alert("Please fill required fields");
      return;
    }

    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      templateName: "",
      refillDate: "",
      medicationName: "",
      form: "",
      dosage: "",
      category: "",
      quantityToDispense: "",
      routeOfAdministration: "",
      specialInstructions: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#f5f5f5] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === "add"
              ? "Add new template detail"
              : "Edit template detail"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="space-y-5">
            {/* Row 1: Template Name & Refill Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Hypertension Basic Set"
                  value={formData.templateName}
                  onChange={(e) => handleChange("templateName", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                  Refill Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.refillDate}
                    onChange={(e) => handleChange("refillDate", e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Medication Name & Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                  Medication Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Amoxillin 500mg capsule"
                  value={formData.medicationName}
                  onChange={(e) =>
                    handleChange("medicationName", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                  Form
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.form}
                    onChange={(e) => handleChange("form", e.target.value)}
                  >
                    <option value="" disabled>
                      Select Form
                    </option>
                    {forms.map((form) => (
                      <option key={form} value={form}>
                        {form}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Dosage & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                  Dosage
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="1 capsule every 8 hours"
                  value={formData.dosage}
                  onChange={(e) => handleChange("dosage", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Quantity to Dispense & Route of Administration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                  Quantity to Dispense
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="10 tablets"
                  value={formData.quantityToDispense}
                  onChange={(e) =>
                    handleChange("quantityToDispense", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                  Route of Administration
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.routeOfAdministration}
                    onChange={(e) =>
                      handleChange("routeOfAdministration", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select Route
                    </option>
                    {routes.map((route) => (
                      <option key={route} value={route}>
                        {route}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 5: Special Instructions - Full Width */}
            <div>
              <label className="block text-sm text-start font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Avoid antibiotics in same family"
                value={formData.specialInstructions}
                onChange={(e) =>
                  handleChange("specialInstructions", e.target.value)
                }
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 bg-[#EDEDED] text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-primary-color text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              {mode === "add" ? "Add & Save" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicationTemplateModal;
