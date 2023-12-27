import Link from 'next/link';

type TFooterColumn = {
  title: string;
  links: { title: string; href: string }[];
};

export const FooterColumn = ({ title, links }: TFooterColumn) => {
  return (
    <div className="flex grow flex-col gap-4 text-mineral-green-600">
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
