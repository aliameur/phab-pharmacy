import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { ReactNode } from 'react';
import {
  FaDribbble,
  FaLinkedin,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const Team = () => {
  return (
    <div className="text-mineral-green-600 flex flex-col items-center gap-16 p-16">
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-merriweather text-5xl">Our Team</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="flex justify-center gap-8">
        {Array.from({ length: 3 }, (_, i) => (
          <TeamMember
            key={i}
            title="Title"
            name="Full Name"
            links={{ linkedin: '', twitter: '', dribbble: '' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </TeamMember>
        ))}
      </div>
    </div>
  );
};

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

const TeamMember = ({ name, title, children }: TTeamMember) => {
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
        <span className="text-norway-300 text-lg">{title}</span>
        <p className="mt-4 w-[304px] text-center">{children}</p>
      </div>
      <div className="flex gap-3.5">
        <Link aria-label="LinkedIn" href="/" target="_blank">
          <FaLinkedin className="h-6 w-6" />
        </Link>
        <Link aria-label="X" href="/" target="_blank">
          <FaXTwitter className="h-6 w-6" />
        </Link>
        <Link aria-label="Dribbble" href="/" target="_blank">
          <FaDribbble className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};
