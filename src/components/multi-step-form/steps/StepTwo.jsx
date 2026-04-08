import React from 'react';
import { Briefcase, Link as LinkIcon, Globe, AlertCircle } from 'lucide-react';
import { useFormikContext } from 'formik';

const StepTwo = () => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext();

  const updateFormData = (newData) => {
    Object.entries(newData).forEach(([key, value]) => {
      setFieldValue(key, value);
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Professional Details</h2>
        <p className="text-gray-500">Tell us about your work and presence</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="occupation"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none ${
                errors.occupation && touched.occupation ? 'border-red-500' : 'border-gray-200'
              }`}
              value={values.occupation}
              onChange={(e) => updateFormData({ occupation: e.target.value })}
              onBlur={() => setFieldTouched('occupation', true)}
            >
              <option value="">Select Occupation</option>
              <option value="developer">Web Developer</option>
              <option value="designer">UI/UX Designer</option>
              <option value="manager">Product Manager</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors.occupation && touched.occupation && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.occupation}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="portfolio"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                errors.portfolio && touched.portfolio ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="https://portfolio.com"
              value={values.portfolio}
              onChange={(e) => updateFormData({ portfolio: e.target.value })}
              onBlur={() => setFieldTouched('portfolio', true)}
            />
          </div>
          {errors.portfolio && touched.portfolio && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.portfolio}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="linkedin"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                errors.linkedin && touched.linkedin ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="https://linkedin.com/in/johndoe"
              value={values.linkedin}
              onChange={(e) => updateFormData({ linkedin: e.target.value })}
              onBlur={() => setFieldTouched('linkedin', true)}
            />
          </div>
          {errors.linkedin && touched.linkedin && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.linkedin}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
