'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          
          <div className="space-y-8">
            {/* Article 1 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 1 (General Provisions)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. Tokuneko Co., Ltd. (hereinafter referred to as "the Company"), which operates the web service "OnlyU" (hereinafter referred to as "the Service"), respects the privacy of users (hereinafter referred to as "Users") and exercises the utmost care in managing Users' personal information and other privacy-related information (hereinafter referred to as "Privacy Information").
                </p>
                <p>
                  2. The Company appropriately handles personal information collected from Users in compliance with the Act on the Protection of Personal Information and other relevant laws and regulations. Additionally, the Company strives for continuous improvement in its handling of personal information by strengthening management systems, implementing SSL technology, and other measures.
                </p>
              </div>
            </section>

            {/* Article 2 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 2 (Consent to and Withdrawal of This Policy)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. Users who provide their Privacy Information to the Company through inquiries or membership registration are deemed to have read and agreed to the contents of this Policy.
                </p>
                <p>
                  2. Users may withdraw their consent to the use of their Privacy Information by the Company. However, in such cases, the User will not be able to continue using the Service.
                </p>
                <p>
                  3. Consent to and withdrawal from this Policy shall be carried out using methods prescribed by the Company.
                </p>
                <p>
                  4. The Company collects information about Users' behavior and activities on the Service to improve the Service and for marketing purposes, all handled according to this Policy.
                </p>
              </div>
            </section>

            {/* Article 3 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 3 (Privacy Information Collected)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. The Company collects or acquires the following information from Users in the course of providing the Service:
                </p>
                <div className="ml-6 space-y-3">
                  <p>
                    (1) Information provided by the User through forms, etc.: This includes names, inquiry-related information, email addresses, age, or date of birth.
                  </p>
                  <p>
                    (2) Information collected by the Company through web tracking technologies such as cookies, IP addresses, and access logs, as well as access analysis tools: This includes information about the User's device, OS, browser, and other connection environments, behavior and browsing history, preferences for purchased or viewed products, and cookie information. Note that this does not include personal information that can identify an individual User.
                  </p>
                </div>
                <p>
                  2. The Company acquires Privacy Information using lawful and fair methods and does not unlawfully obtain such information against the User's will.
                </p>
              </div>
            </section>

            {/* Article 4 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 4 (Purpose of Use of Privacy Information)
              </h3>
              <p className="text-gray-700 mb-4">
                The Company uses Privacy Information collected from Users for the purpose of operating the Service. The main purposes of use are as follows:
              </p>
              <div className="ml-6 space-y-2 text-gray-700">
                <p>(1) For billing, identity verification, and authentication</p>
                <p>(2) For identity verification</p>
                <p>(3) For settlement of User-submitted content</p>
                <p>(4) For transferring sales proceeds</p>
                <p>(5) For sending important notices, such as changes to terms and policies</p>
                <p>(6) For improving the content and quality of the Service</p>
                <p>(7) For conducting surveys, lotteries, and campaigns</p>
                <p>(8) For marketing research, statistics, and analysis</p>
                <p>(9) For system maintenance and troubleshooting</p>
                <p>(10) For distributing advertisements and verifying their effectiveness</p>
                <p>(11) For providing technical support and responding to User inquiries</p>
                <p>(12) For developing and providing advertisements for the Company's or third parties' products or services targeted at specific Users</p>
                <p>(13) For preventing fraudulent or potentially illegal activities</p>
                <p>(14) For handling claims, disputes, and lawsuits</p>
              </div>
            </section>

            {/* Article 5 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 5 (Provision of Privacy Information to Third Parties)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. The Company shall disclose or provide a User's personal information to third parties only after disclosing the recipient and the content of the information to be provided and obtaining the User's consent. However, the Company may disclose or provide personal information without the User's prior consent in the following cases:
                </p>
                <div className="ml-6 space-y-2">
                  <p>(1) When disclosure is required by law</p>
                  <p>(2) When requested by attorneys, prosecutors, or police for necessary investigations</p>
                  <p>(3) When sharing information among the Company's affiliates</p>
                  <p>(4) When entrusting part of the Service to third parties within the necessary scope</p>
                  <p>(5) When providing information to payment processing companies as required for the provision of the Service</p>
                </div>
                <p>
                  2. The Company supervises entrusted third parties appropriately and in compliance with the Act on the Protection of Personal Information when delegating the handling of personal information.
                </p>
                <p>
                  3. The Company may provide Users' personal information to third parties in the event of a merger, business transfer, or other transfer of business related to the Service.
                </p>
              </div>
            </section>

            {/* Article 6 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 6 (Management and Retention Period of Privacy Information)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. The Company takes necessary and appropriate safety management measures to prevent leakage, alteration, etc., of Privacy Information disclosed or provided by Users during their use of the Service, in line with current technological standards.
                </p>
                <p>
                  2. The Company will strive to delete Privacy Information promptly when it is no longer needed for use. Similarly, upon a User's request for deletion, the Company will take corresponding actions.
                </p>
              </div>
            </section>

            {/* Article 7 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 7 (User Inquiries and Requests)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. Users may request the disclosure, correction, addition, deletion, or suspension of use of their Privacy Information held by the Company.
                </p>
                <p>
                  2. Such requests shall be made by methods specified by the Company and may only be made by the User themselves, their legal representative (if the User is a minor or an adult ward), or an authorized agent.
                </p>
                <p>
                  3. Upon receiving a request, the Company will respond within a reasonable period after verifying the User's identity by methods prescribed by the Company. If the Company decides not to disclose, etc., the requested information based on legal grounds, it will notify the User accordingly.
                </p>
                <p>
                  4. Users must pay the following fees for disclosure, inquiry, addition, correction, or deletion requests:
                </p>
                <div className="ml-6 space-y-2">
                  <p>・Fee for disclosure, inquiry, addition, correction, and deletion: JPY 500 + postage</p>
                  <p>・Note: Requests will generally be sent via simplified registered mail (postage: JPY 392).</p>
                </div>
              </div>
            </section>

            {/* Article 8 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 8 (Use of Analytical Tools)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. The Company uses access analysis tools to collect information on Users' behavioral history. Some of the advertisements displayed on the Service's websites use third-party services that utilize cookies. For services provided by Google, Google's privacy policy applies. Please refer to the link below for Google's privacy policy:
                </p>
                <p className="ml-6">
                  <a 
                    href="https://policies.google.com/privacy?hl=ja" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    https://policies.google.com/privacy?hl=ja
                  </a>
                </p>
                <p>
                  2. Users may refuse the collection of Privacy Information or disable behavioral targeting advertisements by changing their browser settings to disable cookies or opting out via the respective web pages for analytical tools and behavioral targeting advertising systems.
                </p>
                <p>
                  3. Such changes are made at the User's own responsibility, and the Company is not liable for any damage resulting from changes in settings that prevent certain information from being viewed.
                </p>
              </div>
            </section>

            {/* Article 9 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 9 (Changes to This Policy)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. The Company may revise this Policy at its discretion. If the Policy is revised, the Company will notify Users by methods deemed appropriate, except in urgent cases.
                </p>
                <p>
                  2. Revisions to this Policy take effect when the revised Privacy Policy is posted on the Service's website.
                </p>
                <p>
                  3. Users who disagree with the revised Policy may request the deletion of their Privacy Information as provided in Article 7.
                </p>
              </div>
            </section>

            {/* Article 10 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 10 (Jurisdiction and Governing Law)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. This Policy is governed and interpreted under Japanese law.
                </p>
                <p>
                  2. Users agree in advance that any disputes related to this Policy will be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.
                </p>
              </div>
            </section>

            {/* Article 11 */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Article 11 (Management Responsibility)
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  1. The Company appoints the following individual as the manager responsible for personal information to ensure appropriate management and continuous improvement of measures concerning the protection of personal information. For inquiries, consultations, or requests for disclosure, please contact the following:
                </p>
                <div className="ml-6 space-y-2">
                  <p>・Operator: Tokuneko Co., Ltd.</p>
                  <p>・Department: Personal Information Inquiry Desk</p>
                  <p>・Email Address: support@onlyu.jp</p>
                  <p>・Methods for Requests for Disclosure, etc.: Email or mail</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <section className="border-t pt-8">
              <div className="space-y-4 text-gray-700">
                <p className="font-medium">Last updated: September 1, 2025</p>
                <p>
                  For questions about this policy, contact{' '}
                  <a 
                    href="mailto:support@onlyu.jp" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    support@onlyu.jp
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
