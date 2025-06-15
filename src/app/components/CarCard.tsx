'use client';

import { Car } from '../types/car';
import { ImageWithFallback } from './ImageWithFallback';
import { FaTachometerAlt, FaCalendarAlt, FaCog, FaGasPump, FaPalette, FaUser, FaCar } from 'react-icons/fa';

interface CarDetailProps {
  icon: React.ReactNode;
  value?: string | number;
}

const CarDetail = ({ icon, value }: CarDetailProps) => (
  <div className="flex items-center">
    <span className="text-gray-500 mr-2">{icon}</span>
    <span>{value || '—'}</span>
  </div>
);

export const CarCard = ({ car }: { car: Car }) => {
  const carName = `${car.mark_cyrillic_name || car.mark_id} ${car.model_cyrillic_name || car.model_name || car.folder_id}`;

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white h-full flex flex-col">
      <div className="relative h-48">
        <ImageWithFallback
          src={car.images?.image?.[0]}
          alt={carName}
          className="object-cover"
        />
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-xl mb-1">{carName}</h3>
        
        <div className="mb-3">
          <p className="text-lg font-semibold">
            {car.price.toLocaleString('ru-RU')} ₽
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
          {car.run && (
            <CarDetail 
              icon={<FaTachometerAlt />} 
              value={`${car.run.toLocaleString('ru-RU')} км`} 
            />
          )}
          
          {car.year && (
            <CarDetail icon={<FaCalendarAlt />} value={car.year} />
          )}
          
          {car.gearbox && (
            <CarDetail icon={<FaCog />} value={car.gearbox} />
          )}
          
          {car.engine_type && (
            <CarDetail icon={<FaGasPump />} value={car.engine_type} />
          )}
          
          {car.color && (
            <CarDetail icon={<FaPalette />} value={car.color} />
          )}
          
          {car.owners_number && (
            <CarDetail icon={<FaUser />} value={car.owners_number} />
          )}
        </div>

        <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors font-medium flex items-center justify-center">
          <FaCar className="mr-2" />
          КУПИТЬ
        </button>
      </div>
    </div>
  );
};