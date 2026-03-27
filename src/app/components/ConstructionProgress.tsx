import { Card } from './Card';
import { clsx } from 'clsx';

export interface ConstructionProgressProps {
  label: string;
  percentage: number;
  color?: 'primary' | 'success' | 'warning' | 'gradient';
}

export const ConstructionProgress = ({
  label,
  percentage,
  color = 'primary',
}: ConstructionProgressProps) => {
  const colorClasses = {
    primary: 'bg-[#161b21]',
    success: 'bg-[#4caf50]',
    warning: 'bg-[#ffcd05]',
    gradient: 'gradient-primary',
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-[#161b21]">{label}</span>
        <span className="text-base font-semibold text-[#161b21]">
          {percentage}%
        </span>
      </div>
      <div className="h-3 bg-[#eaeeee] rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-500', colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export interface ProjectStatusCardProps {
  projectName: string;
  client: string;
  completionDate: string;
  stages: ConstructionProgressProps[];
}

export const ProjectStatusCard = ({
  projectName,
  client,
  completionDate,
  stages,
}: ProjectStatusCardProps) => {
  const overallProgress = Math.round(
    stages.reduce((sum, s) => sum + s.percentage, 0) / stages.length
  );

  return (
    <Card variant="default" padding="lg" className="flex flex-col gap-5 border border-[rgba(60,58,62,0.15)]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-[#161b21]">{projectName}</h3>
          <p className="text-base text-[#737a82]">{client}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-[#737a82]">Готовность</p>
          <p className="text-2xl font-bold text-[#ff563f]">{overallProgress}%</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {stages.map((stage, index) => (
          <ConstructionProgress key={index} {...stage} />
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[rgba(60,58,62,0.15)]">
        <span className="text-sm text-[#737a82]">Сдача: {completionDate}</span>
        <span
          className={clsx(
            'text-sm font-medium px-3 py-1 rounded-full',
            overallProgress === 100
              ? 'bg-[#4caf50]/10 text-[#4caf50]'
              : overallProgress > 50
                ? 'bg-[#ffcd05]/10 text-[#b8930a]'
                : 'bg-[#ff563f]/10 text-[#ff563f]'
          )}
        >
          {overallProgress === 100 ? 'Завершён' : overallProgress > 50 ? 'В процессе' : 'Начальный этап'}
        </span>
      </div>
    </Card>
  );
};
