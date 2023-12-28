import { Text, clx } from '@medusajs/ui';

type CardProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const Card = ({ icon, children, className }: CardProps) => {
  return (
    <div
      className={clx(
        'gap-3 rounded-lg p-4',
        'shadow-elevation-card-rest flex items-start',
        'bg-ui-bg-subtle',
        className,
      )}
    >
      {icon}
      <Text size="base" className="text-ui-fg-subtle">
        {children}
      </Text>
    </div>
  );
};

export default Card;
