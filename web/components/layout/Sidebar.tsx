'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Clients", href: "/clients" },
  { name: "Payments", href: "/payments" },
  { name: "Products", href: "/products" },
  { name: "Analytics", href: "/analytics" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="
      w-64 min-w-[16rem] min-h-screen
      bg-gradient-to-b from-[#0E0F12] to-[#0A0A0B]
      border-r border-[#1F2028]
      text-[#E6E6EB]
    ">
      {/* Logo */}
      <div className="
        px-6 py-5 font-semibold tracking-wide
        border-b border-[#1F2028]
        bg-[#0E0F12]/60 backdrop-blur
      ">
        AIONE CRM
      </div>

      {/* Menu */}
      <nav className="px-3 py-4 space-y-1">
        {menu.map(item => {
          const active = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                block px-4 py-2.5 rounded-md text-sm transition-all
                ${active
                  ? "bg-[#181922] text-white shadow-inner"
                  : "text-[#9A9AA3] hover:bg-[#14151C] hover:text-white hover:translate-x-[2px]"
                }
              `}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
