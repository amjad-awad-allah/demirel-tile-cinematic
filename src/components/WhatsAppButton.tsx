import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Phone number will be customized by user later
    const phoneNumber = ''; // Add phone number in format: 491234567890
    const message = encodeURIComponent('Hello! I would like to inquire about your tile services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-[#25D366] hover:bg-[#20BD5C] text-white p-0"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={28} />
    </Button>
  );
};
