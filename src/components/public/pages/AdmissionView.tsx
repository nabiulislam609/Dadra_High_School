import React, { useState } from 'react';
import { useCMSStore } from '../../../lib/store';
import { Sparkles, CheckCircle2, FileText, ArrowRight, Printer, ShieldCheck, Download, AlertCircle } from 'lucide-react';

export const AdmissionView: React.FC = () => {
  const { submitAdmissionApplication, siteSettings } = useCMSStore();
  
  const [studentName, setStudentName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [classApplied, setClassApplied] = useState('Class 6');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !dateOfBirth || !fatherName || !motherName || !guardianPhone || !address) {
      alert('Please fill in all mandatory fields marked with *');
      return;
    }

    const appNo = submitAdmissionApplication({
      studentName,
      banglaName: banglaName || undefined,
      dateOfBirth,
      gender,
      classApplied,
      fatherName,
      motherName,
      guardianPhone,
      email: email || undefined,
      address,
      previousSchool: previousSchool || 'N/A'
    });

    setTrackingNumber(appNo);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Academic Session 2026-2027
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Online Admission Application
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl font-normal">
            Apply online for Classes VI to IX. Receive instant registration tracking number.
          </p>
        </div>

        {trackingNumber ? (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-emerald-200 shadow-xl space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Application Successfully Submitted!
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Tracking Number: <span className="text-emerald-700">{trackingNumber}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
                Please preserve this tracking number. You will receive an SMS notification at <strong>{guardianPhone}</strong> regarding the verification date and interview.
              </p>
            </div>

            {/* Application Summary Box */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left text-xs sm:text-sm space-y-2 max-w-lg mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-800">{studentName} {banglaName && `(${banglaName})`}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Class Applied:</span>
                <span className="font-bold text-emerald-700">{classApplied}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-semibold text-slate-800">{dateOfBirth}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Father's Name:</span>
                <span className="font-semibold text-slate-800">{fatherName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Guardian Contact:</span>
                <span className="font-semibold text-slate-800">{guardianPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Pending Review</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Confirmation Slip
              </button>
              <button
                onClick={() => {
                  setTrackingNumber(null);
                  setStudentName('');
                  setFatherName('');
                  setMotherName('');
                  setGuardianPhone('');
                  setAddress('');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
            {/* Required Checklist */}
            <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Admission Instructions & Eligibility
              </h4>
              <p className="leading-relaxed">
                Applicants must provide authentic personal details. Upon submission, our admission office will contact guardians for physical verification of original birth certificate and previous school transfer certificate (TC).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  1. Student Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Student Full Name (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mahfuzur Rahman"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Student Name (Bangla)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. মাহফুজুর রহমান"
                      value={banglaName}
                      onChange={e => setBanglaName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 font-bangla"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={e => setDateOfBirth(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Gender *
                    </label>
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Class Seeking Admission In *
                    </label>
                    <select
                      value={classApplied}
                      onChange={e => setClassApplied(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    >
                      <option value="Class 6">Class 6 (Junior Secondary)</option>
                      <option value="Class 7">Class 7 (Junior Secondary)</option>
                      <option value="Class 8">Class 8 (Junior Secondary)</option>
                      <option value="Class 9 (Science)">Class 9 - Science Group</option>
                      <option value="Class 9 (Humanities)">Class 9 - Humanities Group</option>
                      <option value="Class 9 (Business Studies)">Class 9 - Business Studies</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Previous School Attended
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dadra Govt. Primary School"
                      value={previousSchool}
                      onChange={e => setPreviousSchool(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  2. Parents & Guardian Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Father's Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Md. Mostafa Kamal"
                      value={fatherName}
                      onChange={e => setFatherName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Mother's Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Parvin Begum"
                      value={motherName}
                      onChange={e => setMotherName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Guardian Active Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +880 1711-000000"
                      value={guardianPhone}
                      onChange={e => setGuardianPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. guardian@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Permanent & Present Address *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Village, Post office, Upazila, District"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  All submissions are encrypted and routed to Dadra High School Admission Desk.
                </span>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-700/20 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  Submit Online Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
