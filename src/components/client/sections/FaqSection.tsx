
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FaqSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // This would come from your backend in a real implementation
  const faqItems = [
    {
      id: 'faq-1',
      question: 'How long does a typical roof replacement take?',
      answer: 'A standard roof replacement typically takes 1-3 days, depending on the size and complexity of your roof, weather conditions, and any additional structural repairs that might be needed. Our team works efficiently to minimize disruption to your daily routine while ensuring high-quality installation.'
    },
    {
      id: 'faq-2',
      question: 'What happens if it rains during my roof installation?',
      answer: "Our team closely monitors weather forecasts and plans accordingly. If unexpected rain occurs, we'll secure any exposed areas with waterproof tarps to protect your home. We'll resume work as soon as conditions are safe, typically when the roof surface is dry enough for proper material adhesion."
    },
    {
      id: 'faq-3',
      question: 'How will I know when my project is scheduled?',
      answer: "You'll receive notification through your client portal when your project is scheduled. We'll also send an email confirmation with the date and approximate start time. The day before your project begins, your project manager will contact you to confirm details."
    },
    {
      id: 'faq-4',
      question: 'Do I need to be home during the installation?',
      answer: "While it's not absolutely necessary for you to be home during the entire installation, we recommend being present at the start of the project to meet with the project manager and discuss any last-minute questions. If you can't be home, we can make arrangements for remote communication."
    },
    {
      id: 'faq-5',
      question: 'What if additional repairs are needed once work begins?',
      answer: "If our team discovers issues that weren't visible during the initial inspection (such as damaged decking beneath the shingles), your project manager will document the problem with photos, explain the necessary repairs, and provide a clear estimate for the additional work before proceeding."
    },
    {
      id: 'faq-6',
      question: 'How is payment structured for my project?',
      answer: 'Typically, we require a deposit to schedule your project, with the remaining balance due upon completion. For larger projects, we may establish a payment schedule with specific milestones. All payment terms are clearly outlined in your contract, and you can view your payment status in your client portal.'
    },
    {
      id: 'faq-7',
      question: 'What happens during the final inspection?',
      answer: "During the final inspection, your project manager will thoroughly examine all aspects of the installation, ensure all work meets our quality standards, and clean up the work area. You'll be invited to join this inspection to ask questions and confirm your satisfaction before the project is considered complete."
    },
    {
      id: 'faq-8',
      question: 'How do I maintain my new roof?',
      answer: 'Your new roof requires minimal maintenance, but we recommend periodic visual inspections (especially after severe weather), keeping gutters clear of debris, trimming overhanging tree branches, and scheduling professional inspections every 2-3 years. A detailed maintenance guide is available in your client portal.'
    },
  ];
  
  const filteredFaqs = searchQuery.trim() === ''
    ? faqItems
    : faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Frequently Asked Questions</h1>
        <p className="text-white/70">
          Find answers to common questions about your project
        </p>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
        <Input
          type="text"
          placeholder="Search questions..."
          className="pl-10 bg-navy-300 border-gold/20 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>Project FAQs</CardTitle>
          <CardDescription className="text-white/60">
            {filteredFaqs.length} questions and answers to help you understand your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border-white/10"
                >
                  <AccordionTrigger className="text-white hover:text-gold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-white/60 mb-2">No matching questions found</p>
              <p className="text-white/50">
                Try adjusting your search terms or browse all questions
              </p>
              <button 
                onClick={() => setSearchQuery('')} 
                className="mt-4 text-gold hover:underline"
              >
                View all questions
              </button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-navy-300 border-gold/20 text-white shadow-gold/10">
        <CardHeader>
          <CardTitle>Still Have Questions?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 mb-4">
            If you can't find the answer you're looking for in our FAQ section, our team is here to help.
          </p>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <span className="font-medium text-gold">Customer Support:</span>
              <span>(555) 123-4567</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <span className="font-medium text-gold">Support Hours:</span>
              <span>Monday - Friday, 8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <span className="font-medium text-gold">Email:</span>
              <span>support@paccsolutions.com</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqSection;
