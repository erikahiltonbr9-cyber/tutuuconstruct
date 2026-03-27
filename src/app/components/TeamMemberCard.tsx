export interface TeamMemberProps {
  name: string;
  role: string;
  photo?: string;
  experience?: string;
}

export const TeamMemberCard = ({
  name,
  role,
  photo,
  experience,
}: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-32 h-32 rounded-full bg-[#eaeeee] overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#737a82]">
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-semibold text-[#161b21]">{name}</h4>
        <p className="text-base text-[#737a82]">{role}</p>
        {experience && (
          <p className="text-sm text-[#ff563f] font-medium">{experience}</p>
        )}
      </div>
    </div>
  );
};
