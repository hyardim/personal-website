import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "@/components/RightPanel";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0d0b18] text-white selection:bg-violet-500/25">
      {/* Ambient glow — deep violet at top, faint emerald bottom-right */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_65%_40%_at_50%_-5%,rgba(139,92,246,0.07),transparent)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_40%_30%_at_95%_105%,rgba(52,211,153,0.025),transparent)]" />

      {/* Split layout */}
      <div className="relative mx-auto max-w-6xl px-6 md:px-16 flex flex-col md:flex-row md:items-start">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
}
