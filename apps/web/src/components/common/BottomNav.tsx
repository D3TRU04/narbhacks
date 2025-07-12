"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, MapPin, Gift, Settings } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/group', label: 'Group', icon: Users },
  { href: '/location/1', label: 'Location', icon: MapPin },
  { href: '/rewards', label: 'Rewards', icon: Gift },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-lg md:hidden">
      <ul className="flex justify-between items-center px-2 py-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link href={href} className={`flex flex-col items-center justify-center py-2 transition-colors ${active ? 'text-[#0D87E1]' : 'text-gray-500 hover:text-[#0D87E1]' }`}>
                <Icon size={24} />
                <span className="text-xs mt-1 font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 