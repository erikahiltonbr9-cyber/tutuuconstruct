import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Section } from '../components/Section';
import { Button } from '../components/Button';

export const NotFoundPage = () => {
  return (
    <Section variant="default" padding="xl">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <div className="flex flex-col items-center gap-8">
          <div className="w-32 h-32 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-semibold text-[#161b21]">
              Страница не найдена
            </h1>
            <p className="text-xl text-[#737a82] leading-normal max-w-2xl">
              К сожалению, запрашиваемая страница не существует. Возможно, она была удалена или вы ввели неверный адрес.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Link to="/">
              <Button variant="primary" size="lg" icon={<Home size={18} />}>
                На главную
              </Button>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#eaeeee] text-[#161b21] font-medium text-xl transition-default hover:bg-[#d5d9d9]"
            >
              <ArrowLeft size={18} />
              Назад
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};
