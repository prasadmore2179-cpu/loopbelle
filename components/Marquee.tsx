export default function Marquee() {
  return (
    <div className="bg-[#C4714B] overflow-hidden py-3">
      <div className="flex gap-12 whitespace-nowrap animate-marquee text-[#F0D5C8] italic text-lg">
        <span>Handcrafted ✦ Premium Yarn</span>
        <span>Made with Love ✦ Sustainable Craft</span>
        <span>Custom Orders Welcome ✦ Ready to Ship</span>
        <span>Bespoke Crochet ✦ One of a Kind</span>

        {/* repeat for smooth loop */}
        <span>Handcrafted ✦ Premium Yarn</span>
        <span>Made with Love ✦ Sustainable Craft</span>
        <span>Custom Orders Welcome ✦ Ready to Ship</span>
        <span>Bespoke Crochet ✦ One of a Kind</span>
      </div>
    </div>
  );
}