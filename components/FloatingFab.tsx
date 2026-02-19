'use client';

import Link from 'next/link';

export function FloatingFab() {
  return (
    <Link
      href="#emergency-input"
      className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emergency-red text-white font-heading text-sm tracking-wider rounded-lg shadow-lg hover:bg-emergency-red/90 transition-all animate-pulse"
    >
      ⚡ EMERGENCY HELP
    </Link>
  );
}
