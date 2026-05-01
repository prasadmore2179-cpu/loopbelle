export default function PrivacyPolicy() {
  return (
    <main className="px-6 md:px-20 py-24 bg-[#FAF8F3] text-[#2E1B0E] max-w-3xl mx-auto">
      
      <h1 className="text-4xl md:text-5xl font-light">
        Privacy <span className="italic text-[#C4714B]">Policy</span>
      </h1>

      <p className="mt-6 text-[#6B4A32] leading-relaxed">
        At Loopbelle, your privacy matters. This policy explains how we collect, use,
        and protect your information.
      </p>

      <h2 className="mt-10 text-xl font-medium">Information We Collect</h2>
      <p className="mt-3 text-[#6B4A32] leading-relaxed">
        When you place an order or submit a request, we may collect your name,
        contact number, email address, and order details.
      </p>

      <h2 className="mt-8 text-xl font-medium">How We Use Your Information</h2>
      <p className="mt-3 text-[#6B4A32] leading-relaxed">
        We use your information only to communicate with you, process orders,
        and provide a better customer experience.
      </p>

      <h2 className="mt-8 text-xl font-medium">Data Protection</h2>
      <p className="mt-3 text-[#6B4A32] leading-relaxed">
        Your information is kept secure and is never sold or shared with third
        parties.
      </p>

      <h2 className="mt-8 text-xl font-medium">Contact</h2>
      <p className="mt-3 text-[#6B4A32] leading-relaxed">
        If you have any questions, you can reach us at:
        <br />
        <span className="text-[#C4714B]">loopbelle@gmail.com</span>
      </p>

      <p className="mt-10 text-sm text-[#9B8E84]">
        Last updated: {new Date().toLocaleDateString()}
      </p>

    </main>
  );
}