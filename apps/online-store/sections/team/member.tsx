import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaDribbble, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

type TTeamMember = {
  name: string;
  title: string;
  children: ReactNode;
  links: {
    linkedin: string;
    twitter: string;
    dribbble: string;
  };
};

export const TeamMember = ({ links, name, title, children }: TTeamMember) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        src="/placeholder-team-member.png"
        alt={name}
        width={304}
        height={304}
      />
      <div className="flex flex-col items-center">
        <h5 className="font-merriweather text-xl font-bold">{name}</h5>
        <span className="text-lg text-norway-300">{title}</span>
        <p className="mt-4 w-[304px] text-center">{children}</p>
      </div>
      <div className="flex gap-3.5">
        <Link aria-label="LinkedIn" href={links.linkedin} target="_blank">
          <FaLinkedin className="h-6 w-6" />
        </Link>
        <Link aria-label="X" href={links.twitter} target="_blank">
          <FaXTwitter className="h-6 w-6" />
        </Link>
        <Link aria-label="Dribbble" href={links.dribbble} target="_blank">
          <FaDribbble className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};
