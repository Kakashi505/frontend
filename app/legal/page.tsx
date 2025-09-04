'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LegalPage() {
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
            Legal Notice
          </h1>
          
          <div className="space-y-8">
            {/* Seller Section */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Seller
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="font-medium">Tokuneko Co., Ltd.</p>
                <p className="font-medium">Tokuneko Corp.</p>
                <p className="font-medium">Tech Gate LTD</p>
                <p className="font-medium">Tokuneko UK Limited (for international payment processing)</p>
              </div>
            </section>

            {/* Name of Responsible Person */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Name of Responsible Person
              </h3>
              <p className="text-gray-700 font-medium">Taichi Yamada</p>
            </section>

            {/* Address Section */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Address
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>・1-6-10 Hiroo, Shibuya-ku, Tokyo, Giraffa 11F</p>
                <p>・21250 HAWTHORNE BLVD SUITE 500 TORRANCE, CA 90503</p>
                <p>・25 Vitosha Blvd. Sofia, 1000, BG</p>
                <p>・Office 6, Elmwood House Business Centre, 44–46 Elmwood Avenue, Belfast, BT9 6AZ</p>
              </div>
            </section>

            {/* Phone Number */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Phone Number
              </h3>
              <p className="text-gray-700 font-medium">+81 50350 35710</p>
              <p className="text-gray-600 text-sm mt-2">
                Note: Due to remote work, we do not provide support via phone. For urgent inquiries, please use the contact form.
              </p>
            </section>

            {/* Email Address */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Email Address
              </h3>
              <a 
                href="mailto:support@onlyu.jp" 
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                support@onlyu.jp
              </a>
            </section>

            {/* Website */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Website
              </h3>
              <a 
                href="http://onlyu.jp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                http://onlyu.jp
              </a>
            </section>

            {/* Sales Price */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Sales Price
              </h3>
              <p className="text-gray-700">
                Based on the price indicated on each product page.
              </p>
            </section>

            {/* Payment Methods */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Methods
              </h3>
              <p className="text-gray-700">
                Credit card, post-payment (Paidy)
              </p>
            </section>

            {/* Payment Deadline */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Deadline
              </h3>
              <p className="text-gray-700">
                Payment is confirmed at the time of order.
              </p>
            </section>

            {/* Delivery Timing */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Delivery Timing of Products
              </h3>
              <p className="text-gray-700">
                The service will be provided upon payment confirmation.
              </p>
            </section>

            {/* Returns and Cancellations */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Returns and Cancellations
              </h3>
              <p className="text-gray-700">
                Due to the nature of the service, cancellations and cooling-off after contract conclusion are strictly prohibited. Payments made will not be refunded under any circumstances.
              </p>
            </section>

            {/* Service Cancellation Conditions */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Service Cancellation Conditions
              </h3>
              <p className="text-gray-700">
                To cancel, you must follow the cancellation procedures described on our website.
              </p>
            </section>

            {/* Other Fees */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Other Fees
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  When transferring the fees received on behalf of the organizer to the designated bank account, a transfer fee of <span className="font-medium">JPY 330 (tax included)</span> must be paid to us.
                </p>
                <p>
                  Additionally, if an incorrect bank account was provided and a refund transfer is requested, we may, at our discretion, undertake a refund procedure. In such cases, a refund transfer fee of <span className="font-medium">JPY 880 (tax included)</span> must be paid to us.
                </p>
              </div>
            </section>

            {/* Notification of Operations */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Notification of Operations Related to Transmission of Adult-Oriented Video Content
              </h3>
              <p className="text-gray-700 font-medium">
                Chiba Prefectural Public Safety Commission No. 121
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
