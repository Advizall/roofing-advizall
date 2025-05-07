import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const SMSTermsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-gold hover:underline">Read more</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            THE DIRTY ROOFER
            <br />
            SMS Terms of Service
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-sm">
          <div className="text-center text-gray-400">
            <p>Address: 85 Willow Court, Boston, MA 02196</p>
            <p>Phone: 1-617-233-8489</p>
            <p>Email: roofereamon@gmail.com</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">1. SMS Consent Communication</h3>
            <p>Phone numbers collected through our SMS consent process will not be shared with third parties for marketing purposes. Your information is used exclusively for communication between you and The Dirty Roofer.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Types of SMS Communications</h3>
            <p>If you have consented to receive SMS messages from The Dirty Roofer, you may receive messages related to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Appointment reminders</li>
              <li>Project updates or follow-ups</li>
              <li>Billing and payment notifications</li>
              <li>Service promotions or limited-time offers (if applicable)</li>
              <li>Event or meeting coordination</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Message Frequency</h3>
            <p>Message frequency may vary depending on the nature of your relationship with us. For example, you may receive up to 5 messages per week related to your appointments, billing, or service status.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. Potential Fees for SMS Messaging</h3>
            <p>Standard message and data rates may apply according to your wireless carrier's pricing plan. These charges may vary based on your location and carrier plan.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">5. Opt-In Method</h3>
            <p>You may opt in to receive SMS messages by:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Verbally providing consent during a call or in person</li>
              <li>Checking the SMS consent box on our online or paper forms</li>
              <li>Submitting a web form or quote request on our website</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">6. Opt-Out Method</h3>
            <p>You can opt out of receiving SMS messages at any time by replying "STOP" to any message. You may also contact us directly at 1-617-233-8489 or roofereamon@gmail.com to be removed from our SMS list.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">7. Help</h3>
            <p>If you need assistance, reply with the keyword "HELP" to any message or contact us directly at roofereamon@gmail.com.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">8. Standard Messaging Disclosures</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Message and data rates may apply.</li>
              <li>Message frequency may vary.</li>
              <li>Reply "STOP" to unsubscribe.</li>
              <li>Reply "HELP" for assistance.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
