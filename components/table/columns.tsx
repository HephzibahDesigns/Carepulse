"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";

import { getUser } from "@/lib/actions/patient.actions";
import { useEffect, useState } from "react";
import PatientDetailsModal from "../PatientDetailsModal";

interface PatientNameProps {
  userId: string | undefined; // <--- Add userId here
  searchParams?: { [key: string]: string | string[] | undefined }; // Keep if relevant
}

// Helper component to fetch and display user name by userId
function PatientName({ userId }: PatientNameProps) {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return;

      const user = (await getUser(userId)) as { name?: string } | undefined;
      if (user && user.name) {
        setUserName(user.name);
      } else {
        setUserName("Unknown");
      }
    }
    fetchUser();
  }, [userId]);

  return (
    <>
      <p className="text-14-medium text-white">{userName || "Loading..."}</p>
    </>
  );
}

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium ">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      // Use the PatientName component here to fetch and display user name by userId
      return <PatientName userId={appointment.userId} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex justify-center items-center">
          <div className="flex gap-1">
            {/* Actions buttons */}
            <AppointmentModal
              patientId={appointment.patient.$id}
              userId={appointment.userId}
              appointment={appointment}
              type="schedule"
              title="Schedule Appointment"
              description="Please confirm the following details to schedule."
            />
            <AppointmentModal
              patientId={appointment.patient.$id}
              userId={appointment.userId}
              appointment={appointment}
              type="cancel"
              title="Cancel Appointment"
              description="Are you sure you want to cancel your appointment?"
            />
          </div>
          <div className="flex gap-1">
            <PatientDetailsModal userId={appointment.userId} />
          </div>
        </div>
      );
    },
  },
];
