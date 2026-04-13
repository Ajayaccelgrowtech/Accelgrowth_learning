import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Stepper from './Stepper';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import SuccessModal from './SuccessModal';

const steps = [
  { id: 1, title: 'Personal', component: StepOne },
  { id: 2, title: 'Professional', component: StepTwo },
  { id: 3, title: 'Review', component: StepThree },
];

const validationSchemas = [
  Yup.object({
    fullName: Yup.string()
      .trim()
      .required('Full name is required')
      .min(2, 'Name is too short')
      .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^[6-9]\d{9}$/, 'Phone number must be exactly 10 digits (e.g., 9876543210)'),
  }),
  Yup.object({
    occupation: Yup.string().required('Please select an occupation'),
    portfolio: Yup.string().url('Invalid URL').required('Portfolio link is required'),
    linkedin: Yup.string().url('Invalid URL').required('LinkedIn link is required'),
  }),
  Yup.object({}),
];

// Helper component to persist form values
const FormObserver = () => {
  const { values } = useFormikContext();
  React.useEffect(() => {
    localStorage.setItem('form-values', JSON.stringify(values));
  }, [values]);
  return null;
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('form-step');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const isLastStep = currentStep === steps.length;

  const initialValues = React.useMemo(() => {
    const savedValues = localStorage.getItem('form-values');
    return savedValues ? JSON.parse(savedValues) : {
      fullName: '',
      email: '',
      phone: '',
      occupation: '',
      portfolio: '',
      linkedin: '',
    };
  }, []);

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      localStorage.setItem('form-step', prevStep.toString());
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (!isLastStep) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      localStorage.setItem('form-step', nextStep.toString());
      localStorage.setItem('form-values', JSON.stringify(values));
      setSubmitting(false);
    } else {
      setSubmittedData(values);
      setShowSuccess(true);
      setSubmitting(false);
      // Clear persistence on final submission
      localStorage.removeItem('form-step');
      localStorage.removeItem('form-values');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="glass-card bg-white rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden border border-gray-100">
        <Stepper currentStep={currentStep} steps={steps} />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[currentStep - 1]}
          onSubmit={handleSubmit}
          validateOnMount={false}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched, isSubmitting }) => {
            const CurrentStepComponent = steps[currentStep - 1].component;
            
            return (
              <Form className="mt-12 relative min-h-[400px] flex flex-col">
                <FormObserver />
                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CurrentStepComponent />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1 || isSubmitting}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${
                      currentStep === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 ${
                      isLastStep 
                        ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 text-white' 
                        : 'bg-primary-600 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-200 text-white'
                    }`}
                  >
                    {isLastStep ? (isSubmitting ? 'Submitting...' : 'Submit Form') : 'Next Step'}
                    {isLastStep ? <Send className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      
      <p className="text-center text-gray-400 text-sm mt-8">
        Step {currentStep} of {steps.length} • Secure Form
      </p>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        data={submittedData} 
      />
    </div>
  );
};

export default MultiStepForm;
