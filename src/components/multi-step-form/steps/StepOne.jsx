import React from 'react';
import { User, Mail, Phone, AlertCircle } from 'lucide-react';
import { useFormikContext } from 'formik';

const StepOne = () => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext();

  const updateFormData = (newData) => {
    Object.entries(newData).forEach(([key, value]) => {
      setFieldValue(key, value);
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        <p className="text-gray-500">Please provide your basic contact details</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="John Doe"
              value={values.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              onBlur={() => setFieldTouched('fullName', true)}
            />
          </div>
          {errors.fullName && touched.fullName && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                errors.email && touched.email ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="john@example.com"
              value={values.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              onBlur={() => setFieldTouched('email', true)}
            />
          </div>
          {errors.email && touched.email && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                errors.phone && touched.phone ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="+1 (555) 000-0000"
              value={values.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              onBlur={() => setFieldTouched('phone', true)}
            />
          </div>
          {errors.phone && touched.phone && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
