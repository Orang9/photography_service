import React from "react";
import { Check } from "lucide-react";

export default function ProjectTracker({ currentStep = 1 }) {
  const steps = [
    {
      title: "Menunggu DP",
      description: "Admin lagi nunggu lo selesaiin DP biar jadwal aman.",
    },
    {
      title: "Persiapan Tim",
      description: "Fotografer di-assign & bikin moodboard.",
    },
    {
      title: "Sesi Pemotretan",
      description: "Fotografer Aynfaal beraksi di lokasi.",
    },
    {
      title: "Proses Editing",
      description: "Penyortiran dan color grading foto.",
    },
    {
      title: "Project Selesai",
      description: "Link G-Drive diserahkan ke lo.",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 w-full max-w-md font-sans">
      <h2 className="text-lg font-bold text-slate-800 mb-6">Status Project</h2>
      
      <div className="relative space-y-6">
        {/* Vertical Line Background */}
        <div className="absolute left-[15px] top-2 bottom-6 w-0.5 bg-slate-200"></div>

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={index} className="relative flex items-start gap-4">
              {/* Dot / Icon */}
              <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-sm ring-4 ring-white">
                    <Check size={16} strokeWidth={3} />
                  </div>
                ) : isActive ? (
                  <div className="w-8 h-8 rounded-full bg-slate-900 shadow-sm ring-4 ring-white">
                    {/* Inner active dot */}
                    <div className="w-full h-full rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 ring-4 ring-white"></div>
                )}
              </div>

              {/* Text Content */}
              <div className="pt-1">
                <h3
                  className={`text-base font-bold ${
                    isPending ? "text-slate-400" : "text-slate-800"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm mt-1 leading-relaxed ${
                    isPending ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
