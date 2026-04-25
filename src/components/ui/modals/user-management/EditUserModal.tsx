import React from "react";

import { Button } from "@/components/shared/button";
import ModalWrapper from "@/components/shared/modal";
import RadioGroup from "@/components/shared/radio-group";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  onClose,
  isOpen,
  selectedRole,
  setSelectedRole,
}) => {
  return (
    <ModalWrapper
      title={"Edit role"}
      titleStyling={"text-center"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-5 pt-5">
        <div className="w-full">
          <RadioGroup
            name="role"
            options={[
              { label: "Accountant", value: "Accountant" },
              { label: "Admin", value: "Admin" },
              { label: "Drug Inspector", value: "Drug Inspector" },
              { label: "Delivery Man", value: "Delivery Man" },
            ]}
            value={selectedRole}
            onChange={(selected) => {
              setSelectedRole(selected);
            }}
            optionsParentClassName="flex-col !items-start !gap-2"
            optionClassName="w-full py-4 px-3 rounded-xl border border-light-gray !gap-5"
            labelTextClassName="!font-medium"
          />
        </div>
        {/* Modal Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Button
            variant="outlined"
            size="medium"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="primary" size="medium" className="w-full">
            Save
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditUserModal;
