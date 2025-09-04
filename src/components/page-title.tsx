type PageTitleProps = {
  title: string;
  description?: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl">{title}</h2>

      {description && (
        <span className="text-gray-400 text-xs">{description}</span>
      )}
    </div>
  );
};
