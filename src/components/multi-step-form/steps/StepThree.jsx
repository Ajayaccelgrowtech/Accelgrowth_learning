import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useFormikContext } from 'formik';

const StepThree = () => {
  const { values } = useFormikContext();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Review Your Details</h2>
        <p className="text-gray-500">Double check everything before submitting</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 uppercase tracking-wider font-semibold text-[10px]">Full Name</p>
            <p className="text-gray-700 font-medium">{values.fullName || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-400 uppercase tracking-wider font-semibold text-[10px]">Email</p>
            <p className="text-gray-700 font-medium">{values.email || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-400 uppercase tracking-wider font-semibold text-[10px]">Phone</p>
            <p className="text-gray-700 font-medium">{values.phone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-gray-400 uppercase tracking-wider font-semibold text-[10px]">Occupation</p>
            <p className="text-gray-700 font-medium capitalize">{values.occupation || 'Not provided'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400 uppercase tracking-wider font-semibold text-[10px]">Portfolio</p>
            <p className="text-gray-700 font-medium truncate">{values.portfolio || 'Not provided'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
        <p className="text-sm text-blue-700">
          I confirm that the information provided above is accurate and I agree to the terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default StepThree;
