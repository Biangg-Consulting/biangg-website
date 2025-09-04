// src/components/ui/rating.tsx
import { Star } from 'lucide-react';

type RatingProps = {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  max?: number;
};

export const Rating = ({ 
  value, 
  onChange, 
  readOnly = false, 
  max = 5 
}: RatingProps) => {
  const handleClick = (newValue: number) => {
    if (!readOnly && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => handleClick(i + 1)}
          style={{ cursor: readOnly ? 'default' : 'pointer' }}
        />
      ))}
    </div>
  );
};