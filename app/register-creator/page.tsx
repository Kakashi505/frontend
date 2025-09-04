'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle, Upload, FileText, User, Shield, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterCreatorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    address: {
      postal: '',
      prefecture: '',
      city: '',
      street: ''
    },
    dob: '',
    audience: '',
    termsConsent: false,
    
    // Identity Verification
    verificationMethod: '',
    
    // Document Upload
    doc1: null as File | null,
    doc2: null as File | null,
    
    // Review
    isSubmitted: false
  });

  const prefectures = [
    'Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima',
    'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa',
    'Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano', 'Gifu',
    'Shizuoka', 'Aichi', 'Mie', 'Shiga', 'Kyoto', 'Osaka', 'Hyogo', 'Nara',
    'Wakayama', 'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi',
    'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga', 'Nagasaki',
    'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa'
  ];

  const audiences = [
    { value: 'general-adult', label: '一般アダルト (General Adult)' },
    { value: 'gay-bl', label: 'ゲイ・BL (Gay/BL)' }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateStep1 = () => {
    return (
      formData.fullName &&
      formData.address.postal &&
      formData.address.prefecture &&
      formData.address.city &&
      formData.address.street &&
      formData.dob &&
      formData.audience &&
      formData.termsConsent
    );
  };

  const validateStep2 = () => {
    return formData.verificationMethod;
  };

  const validateStep3 = () => {
    if (formData.verificationMethod === 'manual') {
      return formData.doc1 && formData.doc2;
    }
    return true;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      default: return true;
    }
  };

  const nextStep = () => {
    if (canProceed()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitApplication = () => {
    // Here you would typically send the data to your API
    setFormData(prev => ({ ...prev, isSubmitted: true }));
    setCurrentStep(5);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 5 && (
            <div className={`w-16 h-1 mx-2 ${
              step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information & Audience Selection</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your full name as on official ID"
          />
          <p className="text-xs text-gray-500 mt-1">Must match exactly with your official ID</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Must be 18 or older</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Audience *
        </label>
        <select
          value={formData.audience}
          onChange={(e) => handleInputChange('audience', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Select target audience</option>
          {audiences.map(audience => (
            <option key={audience.value} value={audience.value}>
              {audience.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">This classification cannot be changed later</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Address *</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              value={formData.address.postal}
              onChange={(e) => handleInputChange('address.postal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prefecture
            </label>
            <select
              value={formData.address.prefecture}
              onChange={(e) => handleInputChange('address.prefecture', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select prefecture</option>
              {prefectures.map(pref => (
                <option key={pref} value={pref}>{pref}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City/Town
          </label>
          <input
            type="text"
            value={formData.address.city}
            onChange={(e) => handleInputChange('address.city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter city or town name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street/Building
          </label>
          <input
            type="text"
            value={formData.address.street}
            onChange={(e) => handleInputChange('address.street', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter street address and building details"
          />
          <p className="text-xs text-gray-500 mt-1">Must include every detail exactly as on your ID</p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="termsConsent"
          checked={formData.termsConsent}
          onChange={(e) => handleInputChange('termsConsent', e.target.checked)}
          className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <label htmlFor="termsConsent" className="text-sm text-gray-700">
          I agree to the <a href="/terms" className="text-purple-600 hover:underline">Terms of Service</a>,{' '}
          <a href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</a>, and confirm I am 18 or older *
        </label>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Identity Verification Method</h3>
      
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              name="verificationMethod"
              value="ekyc"
              checked={formData.verificationMethod === 'ekyc'}
              onChange={(e) => handleInputChange('verificationMethod', e.target.value)}
              className="mt-1 w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">eKYC with Official ID</div>
              <p className="text-sm text-gray-600 mt-1">
                I have one of the following Japanese IDs: driver's license, My Number Card, Residence Card, or Basic Resident Register Card
              </p>
              <p className="text-xs text-gray-500 mt-2">
                This will redirect you to an external eKYC service for verification
              </p>
            </div>
          </label>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              name="verificationMethod"
              value="manual"
              checked={formData.verificationMethod === 'manual'}
              onChange={(e) => handleInputChange('verificationMethod', e.target.value)}
              className="mt-1 w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">Manual Upload (2 documents)</div>
              <p className="text-sm text-gray-600 mt-1">
                I do not have those IDs (will upload two documents)
              </p>
              <p className="text-xs text-gray-500 mt-2">
                You'll need to upload one photo ID and one proof of address document
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Documents</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document 1: Photo ID *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('doc1', e.target.files?.[0] || null)}
              className="hidden"
              id="doc1"
            />
            <label htmlFor="doc1" className="cursor-pointer">
              <span className="text-purple-600 hover:text-purple-700 font-medium">
                {formData.doc1 ? 'Change file' : 'Choose file'}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Must show your face, name, and birthdate
              </p>
            </label>
            {formData.doc1 && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {formData.doc1.name}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document 2: Proof of Address *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload('doc2', e.target.files?.[0] || null)}
              className="hidden"
              id="doc2"
            />
            <label htmlFor="doc2" className="cursor-pointer">
              <span className="text-purple-600 hover:text-purple-700 font-medium">
                {formData.doc2 ? 'Change file' : 'Choose file'}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Must show current address and name (utility bill, bank statement, etc.)
              </p>
            </label>
            {formData.doc2 && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {formData.doc2.name}
              </p>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Important:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Ensure images are clear with no glare or blur</li>
                <li>Show the entire document without cropping</li>
                <li>Any unclear images will cause rejection</li>
                <li>Accepted formats: JPG, PNG, PDF</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Review & Submit</h3>
      
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h4 className="font-medium text-gray-800">Personal Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Full Name:</span>
            <p className="text-gray-900">{formData.fullName}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Date of Birth:</span>
            <p className="text-gray-900">{formData.dob}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Target Audience:</span>
            <p className="text-gray-900">
              {audiences.find(a => a.value === formData.audience)?.label}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Verification Method:</span>
            <p className="text-gray-900">
              {formData.verificationMethod === 'ekyc' ? 'eKYC with Official ID' : 'Manual Upload'}
            </p>
          </div>
        </div>

        <div>
          <span className="font-medium text-gray-700">Address:</span>
          <p className="text-gray-900">
            {formData.address.postal} {formData.address.prefecture} {formData.address.city} {formData.address.street}
          </p>
        </div>

        {formData.verificationMethod === 'manual' && (
          <div>
            <span className="font-medium text-gray-700">Documents:</span>
            <div className="mt-2 space-y-2">
              {formData.doc1 && (
                <p className="text-gray-900">✓ {formData.doc1.name}</p>
              )}
              {formData.doc2 && (
                <p className="text-gray-900">✓ {formData.doc2.name}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Ready to submit?</p>
            <p className="mt-1">Please review all information carefully. You won't be able to edit after submission.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center space-y-6">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Complete!</h3>
        <p className="text-gray-600">
          Your creator registration application has been submitted successfully.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">What happens next?</p>
            <ul className="mt-2 space-y-1 list-disc list-inside text-left">
              <li>Your application is under review</li>
              <li>Review process takes up to 3 business days</li>
              <li>You'll receive email updates on status</li>
              <li>No further edits allowed during review</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => router.push('/account')}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Return to Account
        </button>
        <button
          onClick={() => router.push('/')}
          className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  if (formData.isSubmitted && currentStep === 5) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {renderStep5()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Creator Registration
          </h1>
          
          {renderStepIndicator()}
          
          {renderCurrentStep()}
          
          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  Step {currentStep} of 4
                </span>
                {currentStep === 4 ? (
                  <button
                    onClick={submitApplication}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Submit Application
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      canProceed()
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
