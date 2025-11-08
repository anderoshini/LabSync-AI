
import { Droplet, TestTube, Heart, Activity } from "lucide-react";

type TestCategory = {
  icon: React.ElementType;
  metrics: {
    [key: string]: {
      min: number;
      max: number;
      unit: string;
    };
  };
};

type TestCategories = {
  [key: string]: TestCategory;
};

interface CategorySelectorProps {
  testCategories: TestCategories;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const CategorySelector = ({
  testCategories,
  selectedCategory,
  onCategorySelect,
}: CategorySelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(testCategories).map((category) => {
        const Icon = testCategories[category].icon;
        return (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Icon className="w-4 h-4" />
            {category}
          </button>
        );
      })}
    </div>
  );
};
