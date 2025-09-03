'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const router = useRouter();

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
            Terms of Use
          </h1>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Terms of Use for OnlyU
          </h2>
          
          <p className="text-gray-700 mb-8 leading-relaxed">
            Tokuneko Co., Ltd. (hereinafter referred to as "the Company") establishes the following terms of use (hereinafter referred to as "these Terms") regarding the use of the services provided on the websites operated by the Company. These Terms apply to all users of the services provided by the Company.
          </p>

          <div className="space-y-8">
            {/* Chapter 1 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Chapter 1: General Provisions
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Article 1 (Definitions)
                  </h4>
                  <p className="text-gray-700 mb-4">
                    The following terms are defined as follows in these Terms:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"This Site"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to the websites operated by the Company under the following URL. The URL may change due to the Company's circumstances.
                      </p>
                      <p className="text-gray-700 ml-4 mt-2">
                        <strong>https://lp.OnlyU.jp/</strong>
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"Users"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to individuals who use this Site.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"This Service"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to the fan club site services provided by the Company. Details are specified in Chapter 2 of these Terms and on this Site.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"Members"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to Users who have completed the membership registration procedures specified in Article 2 of these Terms and include both Organizers and Participants.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"Organizers"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to individuals who have submitted a notification under the Act on Control and Improvement of Amusement Business, etc., and have completed the registration procedures as Organizers for operating a fan club site.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"Participants"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to Members who have completed the registration procedures to use the services provided by Organizers on the fan club site.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"Content"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to digital information such as activity updates, private videos, still images, text, and communication services provided by Organizers to Participants.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"Fan Club Site"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to a website where Organizers can distribute various Content to Participants.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"Fan Club Site Usage Agreement"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to the agreement formed between the Organizer and the Participant when the Participant applies for the use of a Fan Club Site and the Organizer accepts it.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"Fan Club Membership Fees"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to the fees that Participants pay to Organizers based on the Fan Club Site Usage Agreement.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"This System"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to the hardware and software used by the Company to operate and manage this Site and this Service.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"These Terms, etc."</h5>
                      <p className="text-gray-700 ml-4">
                        Refers collectively to these Terms, the Privacy Policy, and other conditions set by the Company for using this Service.
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">"This Agreement"</h5>
                      <p className="text-gray-700 ml-4">
                        Refers to the agreement between the Company and Users based on these Terms, etc.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Article 2 (Membership Registration)
                  </h4>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      The membership registration procedures for this Service must be conducted by the User themselves. Minors (defined as persons under 18 years of age after April 1, 2022) are not allowed to use this Service. Applicants for membership registration (hereinafter referred to as "Membership Registration Applicants") shall input and submit the required information specified by the Company on the membership registration screen of this Site. Membership is granted when the Company notifies the Applicant (via email, etc.) of its acceptance. The Company may refuse or cancel acceptance of membership registration if the Applicant or Member falls under any of the following:
                    </p>
                    
                    <ul className="list-disc ml-6 space-y-2">
                      <li>False information, errors, or omissions in the information entered on this Site.</li>
                      <li>If the Applicant or Member is found not to exist.</li>
                      <li>Duplicate registration.</li>
                      <li>Previous penalties, such as suspension or disqualification of membership, under Article 21, Paragraph 1 or 2 of these Terms.</li>
                      <li>Registration by minors.</li>
                      <li>If determined to be part of or associated with antisocial forces, including organized crime groups.</li>
                      <li>Any other cases deemed inappropriate by the Company.</li>
                    </ul>
                    
                    <p>
                      Applicants for membership registration must select whether to register as an Organizer or Participant. Those applying as Organizers must declare and warrant that they have submitted notifications under applicable laws regarding special businesses. If any of the above in Paragraph 3 is found to apply after registration, the Company may cancel the registration and suspend the use of this Service. Members must comply with these Terms, etc.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Article 3 (Changes to Member Information)
                  </h4>
                  <p className="text-gray-700">
                    Members must promptly notify the Company of any changes or corrections to their registered information, such as name, address, phone number, or email address. The Company is not liable for any damages incurred by the Member or third parties due to failure or delay in providing such notice.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Article 4 (Succession of Membership Status)
                  </h4>
                  <p className="text-gray-700">
                    Membership status under this Agreement is not inheritable. However, any payment obligations for membership fees that have already arisen are subject to inheritance.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Article 5 (Notifications to Users)
                  </h4>
                  <p className="text-gray-700">
                    Notifications to Users (including Members) may be made by posting on this Site. Notifications are deemed effective when the posted information becomes accessible on the Company's server. Individual notifications to Members about this Service may be made using the contact information provided by the Member. Such notifications are deemed effective when sent by the Company, even if delays occur due to failure to update contact details under Article 3.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Article 6 (Changes to These Terms, etc.)
                  </h4>
                  <p className="text-gray-700">
                    The Company may change these Terms, etc., without individual agreements under the following conditions: If the changes benefit Users generally. If the changes are reasonable, considering their necessity, appropriateness, and the circumstances. Changes to these Terms, etc., will be announced with an effective date, and the revised Terms will apply from that date.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Effective Date */}
            <section className="border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Effective Date
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>Enacted: June 13, 2021</p>
                <p>Revised: July 24, 2021</p>
                <p>Revised: August 26, 2021</p>
                <p>Revised: December 26, 2022</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
