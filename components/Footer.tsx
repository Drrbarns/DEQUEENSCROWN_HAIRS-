"use client";

import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';

export default function Footer() {
  const { getSetting } = useCMS();

  const siteName = getSetting('site_name') || 'De Queen\'s Crown Hairs';
  const footerLogo = getSetting('footer_logo') || getSetting('site_logo') || '/logo.png';
  const footerLogoHeight = getSetting('footer_logo_height') || '56';
  const contactEmail = getSetting('contact_email') || '';
  const contactPhone = getSetting('contact_phone') || '';
  const socialInstagram = getSetting('social_instagram') || '';
  const socialFacebook = getSetting('social_facebook') || '';
  const socialTiktok = getSetting('social_tiktok') || '';
  const socialSnapchat = getSetting('social_snapchat') || '';

  const links = [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  const socials = [
    { link: socialInstagram, icon: 'ri-instagram-line' },
    { link: socialFacebook, icon: 'ri-facebook-fill' },
    { link: socialTiktok, icon: 'ri-tiktok-fill' },
    { link: socialSnapchat, icon: 'ri-snapchat-fill' },
  ].filter((s) => s.link);

  return (
    <footer className="bg-peach-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={footerLogo}
              alt={siteName}
              className="w-auto object-contain"
              style={{ maxHeight: `${footerLogoHeight}px` }}
              onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block'; }}
            />
            <span className="text-lg font-semibold tracking-tight hidden">{siteName}</span>
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400">
            {links.map(({ label, href }) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {contactEmail && (
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                {contactEmail}
              </a>
            )}
            {contactPhone && (
              <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                {contactPhone}
              </a>
            )}
          </div>
          {socials.length > 0 && (
            <div className="flex gap-4">
              {socials.map(({ link, icon }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label="Social link"
                >
                  <i className={`${icon} text-lg`}></i>
                </a>
              ))}
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-gray-600">
          © {new Date().getFullYear()} {siteName}
        </p>
      </div>
    </footer>
  );
}
