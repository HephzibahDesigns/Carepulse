"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { Button } from "./ui/button";

import { getPatient } from "@/lib/actions/patient.actions";
import { formatDateTime } from "@/lib/utils";

interface PatientDetailsModalProps {
  userId?: string;
}

const PatientDetailsModal = ({ userId }: PatientDetailsModalProps) => {
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState<any>(null); // optionally type this better

  useEffect(() => {
    async function fetchPatient() {
      if (!userId) return;

      try {
        const result = await getPatient(userId);
        setPatient(result);
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch patient:", error);
      }
    }

    fetchPatient();
  }, [userId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          {/* Button content */}
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md lg:max-w-2xl max-h-[80vh] overflow-y-auto sm:rounded-xl sm:p-6 p-4">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to book an appointment.
          </DialogDescription>
        </DialogHeader>

        {/* Example of displaying patient info */}
        <div className="space-y-3">
          {patient ? (
            <div className="flex flex-col justify-center items-start space-y-3">
              <div className="flex justify-between items-center w-full">
                <p className="py-1 px-1 text-green-500 bg-green-600 rounded-md max-w-[50%]">
                  Name:
                </p>
                <p className="text-white">{patient.name}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-green-500 bg-green-600 py-1 px-1  rounded-md">
                  Email:
                </p>
                <p>{patient.email}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  BirthDate:
                </p>
                <p>{formatDateTime(patient.birthDate).dateOnly}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Address:
                </p>
                <p className="text-white text-right w-[40%]">
                  {patient.address}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  PhoneNumber:
                </p>
                <p className="text-white text-right"> {patient.phone}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Occupation:
                </p>
                <p className="text-white text-right">{patient.occupation}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Allegies:
                </p>
                <p className="text-white text-right">{patient.allergies}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Current Medication:
                </p>
                <p className="text-white text-right">
                  {patient.currentMedication}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Emergency Contact Name:
                </p>
                <p className="text-white text-right">
                  {patient.emergencyContactName}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Emergency Contact Number:
                </p>
                <p className="text-white text-right">
                  {patient.emergencyContactNumber}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Family Medical History:
                </p>
                <p className="text-white text-right w-[40%]">
                  {patient.familyMedicalHistory}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Identification Type:
                </p>
                <p className="text-white text-right">
                  {patient.identificationType}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Identification Number:
                </p>
                <p className="text-white text-right">
                  {patient.identificationNumber}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Insurance Provider:
                </p>
                <p className="text-white text-right">
                  {patient.insuranceProvider}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Insurance Policy Number:
                </p>
                <p className="text-white text-right">
                  {patient.insurancePolicyNumber}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className=" py-1 px-1 text-green-500 bg-green-600 rounded-md">
                  Past Medical History:
                </p>
                <p className="text-white text-right w-[40%]">
                  {patient.pastMedicalHistory}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-white">Loading patient info...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
