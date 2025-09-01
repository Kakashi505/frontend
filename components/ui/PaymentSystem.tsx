'use client';

import { useState } from 'react';
import { CreditCard, Wallet, Gift, Lock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  description: string;
  features: string[];
  isPopular: boolean;
  savings?: number;
}

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paidy' | 'apple_pay' | 'google_pay';
  name: string;
  icon: string;
  isDefault: boolean;
  last4?: string;
  expiryDate?: string;
}

interface PaymentSystemProps {
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  subscriptionPlans: SubscriptionPlan[];
  onSubscriptionSelect?: (plan: SubscriptionPlan) => void;
  onPaymentMethodSelect?: (method: PaymentMethod) => void;
  onTipSubmit?: (amount: number, message?: string) => void;
  onPpvPurchase?: (contentId: string, price: number) => void;
}

const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit_card',
    name: 'Visa ending in 4242',
    icon: '💳',
    isDefault: true,
    last4: '4242',
    expiryDate: '12/25'
  },
  {
    id: '2',
    type: 'paidy',
    name: 'Paidy (Pay Later)',
    icon: '📅',
    isDefault: false
  },
  {
    id: '3',
    type: 'apple_pay',
    name: 'Apple Pay',
    icon: '🍎',
    isDefault: false
  }
];

export function PaymentSystem({
  creatorId,
  creatorName,
  creatorAvatar,
  subscriptionPlans,
  onSubscriptionSelect,
  onPaymentMethodSelect,
  onTipSubmit,
  onPpvPurchase
}: PaymentSystemProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(500);
  const [tipMessage, setTipMessage] = useState('');
  const [showTipDialog, setShowTipDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscriptionSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowPaymentDialog(true);
    onSubscriptionSelect?.(plan);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    onPaymentMethodSelect?.(method);
  };

  const handleTipSubmit = async () => {
    if (!tipAmount || tipAmount < 100) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onTipSubmit?.(tipAmount, tipMessage);
    setShowTipDialog(false);
    setTipAmount(500);
    setTipMessage('');
    setIsProcessing(false);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPlan || !selectedPaymentMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Handle successful payment
    setShowPaymentDialog(false);
    setIsProcessing(false);
  };

  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString()}`;
  };

  const calculateSavings = (plan: SubscriptionPlan) => {
    if (plan.period === 'yearly') {
      const monthlyPrice = plan.price / 12;
      const savings = ((980 - monthlyPrice) / 980) * 100;
      return Math.round(savings);
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Creator Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={creatorAvatar}
              alt={creatorName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{creatorName}</h3>
              <p className="text-gray-600">Choose your subscription plan or send a tip</p>
            </div>
            <Button
              onClick={() => setShowTipDialog(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Gift className="w-4 h-4 mr-2" />
              Send Tip
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Subscription Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                plan.isPopular ? 'ring-2 ring-pink-500' : ''
              }`}
              onClick={() => handleSubscriptionSelect(plan)}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-pink-500 text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-purple-600">
                  {formatPrice(plan.price)}
                  <span className="text-sm text-gray-500 font-normal">
                    /{plan.period === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {plan.period === 'yearly' && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Save {calculateSavings(plan)}%
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 text-center">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {defaultPaymentMethods.map((method) => (
            <Card
              key={method.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedPaymentMethod?.id === method.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => handlePaymentMethodSelect(method)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{method.name}</p>
                    {method.last4 && (
                      <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                    )}
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      Default
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Payment Information</p>
              <ul className="space-y-1">
                <li>• 5% transaction fee applies to all purchases</li>
                <li>• Secure payment processing with SSL encryption</li>
                <li>• Support for credit cards and Paidy (pay later)</li>
                <li>• Automatic renewal for subscriptions</li>
                <li>• Cancel anytime from your account settings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tip Dialog */}
      <Dialog open={showTipDialog} onOpenChange={setShowTipDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Tip to {creatorName}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tip Amount (¥)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[100, 500, 1000, 2000].map((amount) => (
                  <Button
                    key={amount}
                    variant={tipAmount === amount ? 'default' : 'outline'}
                    onClick={() => setTipAmount(amount)}
                    className="w-full"
                  >
                    ¥{amount}
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(Number(e.target.value))}
                placeholder="Custom amount"
                className="mt-2"
                min="100"
                step="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <Input
                value={tipMessage}
                onChange={(e) => setTipMessage(e.target.value)}
                placeholder="Leave a message..."
                maxLength={100}
              />
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tip Amount: ¥{tipAmount}</span>
              <span>Fee: ¥{Math.ceil(tipAmount * 0.05)}</span>
            </div>
            
            <div className="flex justify-between text-sm font-medium">
              <span>Total:</span>
              <span>¥{tipAmount + Math.ceil(tipAmount * 0.05)}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowTipDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleTipSubmit}
                disabled={isProcessing || tipAmount < 100}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
              >
                {isProcessing ? 'Processing...' : 'Send Tip'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Subscription</DialogTitle>
          </DialogHeader>
          
          {selectedPlan && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>{selectedPlan.name} ({selectedPlan.period})</span>
                  <span>{formatPrice(selectedPlan.price)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Transaction Fee (5%)</span>
                  <span>{formatPrice(Math.ceil(selectedPlan.price * 0.05))}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(selectedPlan.price + Math.ceil(selectedPlan.price * 0.05))}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <Select
                  value={selectedPaymentMethod?.id}
                  onValueChange={(value) => {
                    const method = defaultPaymentMethods.find(m => m.id === value);
                    if (method) setSelectedPaymentMethod(method);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultPaymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center space-x-2">
                          <span>{method.icon}</span>
                          <span>{method.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing || !selectedPaymentMethod}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  {isProcessing ? 'Processing...' : 'Subscribe Now'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
