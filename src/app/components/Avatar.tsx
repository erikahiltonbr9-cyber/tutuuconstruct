import { clsx } from 'clsx';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const statusColors = {
  online: 'bg-[#4caf50]',
  offline: 'bg-[#bbbebe]',
  busy: 'bg-[#ff402d]',
  away: 'bg-[#ffcd05]',
};

export const Avatar = ({ src, alt, name, size = 'md', status }: AvatarProps) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-flex">
      <div
        className={clsx(
          'rounded-full overflow-hidden flex items-center justify-center font-semibold shrink-0',
          sizeClasses[size],
          !src && 'bg-[#161b21] text-white'
        )}
      >
        {src ? (
          <img src={src} alt={alt || name || ''} className="w-full h-full object-cover" />
        ) : (
          <span>{initials || '?'}</span>
        )}
      </div>
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            statusColors[status],
            size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : 'w-3 h-3'
          )}
        />
      )}
    </div>
  );
};

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarProps['size'];
}

export const AvatarGroup = ({ avatars, max = 4, size = 'md' }: AvatarGroupProps) => {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((avatar, i) => (
        <div key={i} className="ring-2 ring-white rounded-full">
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={clsx(
            'rounded-full bg-[#eaeeee] text-[#737a82] font-semibold flex items-center justify-center ring-2 ring-white',
            sizeClasses[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
