import { Button } from './ui/button';

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="#ffffff" // أيقونة بيضاء رسمية
    className="w-12 h-12" // حجم الأيقونة 24px × 24px
  >
    <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.924 0-7.435 6.050-13.485 13.485-13.485s13.485 6.050 13.485 13.485c0 7.435-6.050 13.485-13.485 13.485zM22.328 19.433c-0.298-0.149-1.765-0.871-2.039-0.971s-0.472-0.149-0.671 0.149c-0.199 0.298-0.771 0.971-0.945 1.169s-0.348 0.223-0.646 0.074c-0.298-0.149-1.258-0.464-2.396-1.479-0.886-0.79-1.484-1.766-1.657-2.065s-0.018-0.458 0.13-0.606c0.134-0.133 0.298-0.348 0.447-0.522s0.199-0.298 0.298-0.497c0.099-0.199 0.05-0.372-0.025-0.522s-0.671-1.616-0.92-2.213c-0.242-0.579-0.487-0.5-0.671-0.51-0.174-0.008-0.372-0.010-0.571-0.010s-0.522 0.074-0.795 0.372c-0.273 0.298-1.043 1.019-1.043 2.486s1.068 2.884 1.217 3.083c0.149 0.199 2.096 3.2 5.077 4.487 0.709 0.306 1.263 0.489 1.694 0.626 0.712 0.226 1.36 0.194 1.872 0.118 0.571-0.085 1.765-0.721 2.013-1.417s0.248-1.294 0.174-1.417c-0.074-0.124-0.273-0.199-0.571-0.348z" />
  </svg>
);

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+4917670037963';
    const message = encodeURIComponent(
      'Hallo! Ich möchte mich nach Ihren Fliesen-Dienstleistungen erkundigen.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Pulsing glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          backgroundColor: '#25D366',
          opacity: 0.4,
          filter: 'blur(12px)',
        }}
      ></div>

      <Button
        onClick={handleWhatsAppClick}
        className="relative w-12 h-12 rounded-full flex items-center justify-center p-0 transition-all duration-300
                   shadow-lg hover:scale-110 hover:bg-[#128C7E]"
        style={{
          backgroundColor: '#25D366',
          boxShadow: '0 0 16px rgba(37, 211, 102, 0.6), 0 10px 30px rgba(0, 0, 0, 0.06)',
          borderWidth: '3px',
          borderColor: 'white',
        }}
        aria-label="Contact via WhatsApp"
      >
        <WhatsAppIcon />
      </Button>
    </div>
  );
};
