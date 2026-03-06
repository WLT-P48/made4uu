export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918552062200?text=Hi!%20I%20have%20a%20question%20about%20your%20products."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 w-13 h-13 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200 hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200 transition-all duration-200"
      aria-label="Chat on WhatsApp"
      style={{ width: 52, height: 52 }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    </a>
  )
}

