import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { Logo } from './logo';
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
    <footer className="text-mineral-green-600 flex flex-col gap-16 p-16">
      <div className="flex justify-between">
        <div className="flex shrink-0 flex-col">
          <h4 className="font-merriweather text-lg font-bold">
            Join our newsletter
          </h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="flex flex-col gap-4">
          <NewsletterForm />
          <p className="text-mineral-green-600 text-xs">
            By subscribing you agree to with our{' '}
            <Link className="underline" href="/" target="_blank">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="grow">
          <Logo className="w-16" />
        </div>
        {links.map((column, idx) => (
          <FooterColumn
            key={column.title}
            title={column.title}
            links={column.links}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        <div className="bg-mineral-green-600 h-px" />
        <div className="flex justify-between">
          <div className="text-mineral-green-600 flex gap-6 text-sm">
            <span>© 2023 Phab Pharmacy. All rights reserved.</span>
            <Link href="/" target="_blank" className="underline">
              Privacy Policy
            </Link>
            <Link href="/" target="_blank" className="underline">
              Terms of Service
            </Link>
            <Link href="/" target="_blank" className="underline">
              Cookies Settings
            </Link>
          </div>
          <div className="text-mineral-green-600 flex gap-3">
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

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) => {
  return (
    <div className="text-mineral-green-600 flex grow flex-col gap-4">
      <h6 className="font-merriweather font-bold">{title}</h6>
      <div className="flex flex-col text-sm">
        {links.map((link) => (
          <Link key={link.title} className="shrink-0 py-2" href={link.href}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
