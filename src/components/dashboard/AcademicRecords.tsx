"use client";

import { Download } from "lucide-react";

const mockData = [
  { test: "Verb Mastery II", date: "14 Oct, 2024", score: 98, total: 100 },
  { test: "Competitive Mock #4", date: "11 Oct, 2024", score: 92, total: 100 },
  { test: "Subject-Verb Agreement", date: "08 Oct, 2024", score: 78, total: 100 },
  { test: "Tenses Advanced", date: "05 Oct, 2024", score: 85, total: 100 },
  { test: "Articles Mastery", date: "01 Oct, 2024", score: 72, total: 100 },
];

const chartData = mockData.slice(0, 5).reverse();

export default function AcademicRecords() {
  return (
    <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h3 className="text-2xl font-black font-headline text-primary tracking-tight">
            Academic Records
          </h3>
          <p className="text-sm text-on-surface-variant font-medium">
            Your evolutionary journey through the syllabus.
          </p>
        </div>
        <div className="flex bg-surface-container-low p-1 rounded-xl">
          <button className="bg-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm text-primary">
            Overview
          </button>
          <button className="px-4 py-2 rounded-lg text-xs font-bold text-on-surface-variant">
            Detailed Analytics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Progress Chart */}
        <div className="space-y-8">
          <h4 className="text-xs uppercase font-black tracking-widest text-on-surface-variant">
            Score Trends (Last 5 Assessments)
          </h4>
          <div className="flex items-end justify-between h-48 px-4 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-b border-outline" />
              ))}
            </div>

            {/* Bars */}
            {chartData.map((item, index) => (
              <div
                key={index}
                className="relative group flex flex-col items-center gap-2 w-full"
              >
                <div
                  className="w-8 md:w-12 rounded-t-lg transition-all hover:bg-primary-container relative"
                  style={{
                    height: `${item.score}%`,
                    backgroundColor: `rgba(0, 108, 82, ${0.2 + index * 0.2})`,
                  }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-white px-2 py-1 rounded">
                    {item.score}%
                  </span>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                  {index === chartData.length - 1 ? "Latest" : `Test 0${index + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* History Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase font-black tracking-widest text-on-surface-variant">
              Recent History
            </h4>
            <button className="text-[10px] font-bold text-primary cursor-pointer hover:underline flex items-center gap-1">
              <Download size={12} />
              Download Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[10px] text-on-surface-variant/50 uppercase tracking-widest font-bold">
                  <th className="px-4 py-2">Assessment</th>
                  <th className="px-4 py-2 text-center">Score</th>
                  <th className="px-4 py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors rounded-xl overflow-hidden group"
                  >
                    <td className="px-4 py-3 rounded-l-xl">
                      <p className="font-bold">{item.test}</p>
                      <p className="text-[10px] text-on-surface-variant">
                        {item.date}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-black text-primary">
                        {item.score}/{item.total}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right rounded-r-xl">
                      <span
                        className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                          item.score >= 80
                            ? "bg-secondary-container text-on-secondary-container"
                            : item.score >= 60
                            ? "bg-tertiary-container text-on-tertiary-container"
                            : "bg-error-container text-on-error-container"
                        }`}
                      >
                        {item.score >= 80
                          ? "Excellent"
                          : item.score >= 60
                          ? "Passed"
                          : "Needs Work"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
