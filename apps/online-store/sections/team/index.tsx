import { SectionHeading } from '../common';
import { TeamMember } from './member';

type TTeam = {
  members: {
    name: string;
    title: string;
    description: string;
    links: {
      linkedin: string;
      twitter: string;
      dribbble: string;
    };
  }[];
};
export const Team = ({ members }: TTeam) => {
  return (
    <div className="flex flex-col items-center gap-8 px-4 py-8 text-mineral-green-600 md:gap-16 md:px-16 md:py-16">
      <SectionHeading title="Our Team">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SectionHeading>
      <div className="flex flex-wrap justify-center gap-8">
        {members.map((member) => (
          <TeamMember
            key={member.name}
            title={member.title}
            name={member.name}
            links={member.links}
          >
            {member.description}
          </TeamMember>
        ))}
      </div>
    </div>
  );
};
