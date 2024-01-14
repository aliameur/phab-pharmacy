import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { Logo } from '@phab/ui/core';

import { FooterColumn } from './column';
import { NewsletterForm } from './newsletter-form';

const links = [
  {
    title: 'Column Title',
    links: [
      { title: 'Link One', href: '/' },
      { title: 'Link Two', href: '/' },
      { title: 'Link Three', href: '/' },
      { title: 'Link Four', href: '/' },
      { title: 'Link Five', href: '/' },
    ],
  },
  {
    title: 'Column Title',
    links: [
      { title: 'Link Six', href: '/' },
      { title: 'Link Seven', href: '/' },
      { title: 'Link Eight', href: '/' },
      { title: 'Link Nine', href: '/' },
      { title: 'Link Ten', href: '/' },
    ],
  },
  {
    title: 'Column Title',
    links: [
      { title: 'Link Eleven', href: '/' },
      { title: 'Link Twelve', href: '/' },
      { title: 'Link Thirteen', href: '/' },
      { title: 'Link Fourteen', href: '/' },
      { title: 'Link Fifteen', href: '/' },
    ],
  },
  {
    title: 'Column Title',
    links: [
      { title: 'Link Sixteen', href: '/' },
      { title: 'Link Seventeen', href: '/' },
      { title: 'Link Eighteen', href: '/' },
      { title: 'Link Nineteen', href: '/' },
      { title: 'Link Twenty', href: '/' },
    ],
  },
  {
    title: 'Column Title',
    links: [
      { title: 'Link Twenty One', href: '/' },
      { title: 'Link Twenty Two', href: '/' },
      { title: 'Link Twenty Three', href: '/' },
      { title: 'Link Twenty Four', href: '/' },
      { title: 'Link Twenty Five', href: '/' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 px-4 py-8 text-mineral-green-600 md:gap-16 md:px-16 md:py-16">
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex shrink-0 flex-col items-center text-center lg:items-start">
          <h4 className="font-merriweather text-lg font-bold">
            Join our newsletter
          </h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="flex flex-col gap-4">
          <NewsletterForm className="w-full" />
          <p className="text-xs text-mineral-green-600">
            By subscribing you agree to with our{' '}
            <Link
              className="underline"
              href="/apps/online-store/public"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-start gap-8 min-[468px]:grid-cols-2 min-[468px]:justify-items-center md:grid-cols-3 md:gap-10 lg:flex [&>:nth-child(n+4)]:hidden min-[468px]:[&>:nth-child(n+4)]:flex">
        <div className="order-last grow lg:order-none">
          <Logo className="w-16" />
        </div>
        {links.map((column) => (
          <FooterColumn
            key={column.title}
            title={column.title}
            links={column.links}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        <div className="h-px bg-mineral-green-600" />
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex gap-6 text-center text-sm text-mineral-green-600">
            <span>© 2023 Phab Pharmacy. All rights reserved.</span>
            <Link
              href="/"
              target="_blank"
              className="hidden underline lg:block"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              target="_blank"
              className="hidden underline lg:block"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              target="_blank"
              className="hidden underline lg:block"
            >
              Cookies Settings
            </Link>
          </div>
          <div className="flex gap-3 text-mineral-green-600">
            <Link href="/" target="_blank">
              <FaFacebook className="h-6 w-6" />
            </Link>
            <Link href="/" target="_blank">
              <FaInstagram className="h-6 w-6" />
            </Link>
            <Link href="/" target="_blank">
              <FaXTwitter className="h-6 w-6" />
            </Link>
            <Link href="/" target="_blank">
              <FaLinkedin className="h-6 w-6" />
            </Link>
            <Link href="/" target="_blank">
              <FaYoutube className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
