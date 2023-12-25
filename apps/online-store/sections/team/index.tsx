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
    <div className="flex flex-col items-center gap-16 p-16 text-mineral-green-600">
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-merriweather text-5xl">Our Team</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="flex justify-center gap-8">
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
