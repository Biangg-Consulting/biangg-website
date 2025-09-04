import { Button } from "@/components/ui/button";
import { DonateButton } from "@/components/donate-button";
import { Link } from "react-router-dom";

interface StatItem {
    value: string;
    label: string;
}

interface StudyCardProps {
    title: string;
    content: string;
    actionText?: string;
    supportText?: string;
    imageUrl?: string;
    imageAlt?: string;
    link?: string;
    project?: string;
    reverseLayout?: boolean;
    stats?: StatItem[];
}

export const StudyCard = ({
    title,
    content,
    actionText,
    supportText,
    imageUrl,
    imageAlt = "",
    reverseLayout = false,
    project,
    stats = [],
}: StudyCardProps) => {
    return (
        <div className={`flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl ${reverseLayout ? "md:flex-row-reverse" : ""}`}>
            {imageUrl && (
                <div className="md:w-2/5 h-80 md:h-auto relative">
                    <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="p-8 md:p-10 md:w-3/5">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">{content}</p>

                {stats.length > 0 && (
                    <div className="flex flex-wrap gap-4 mb-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                            >
                                <div className="text-2xl font-bold text-primary dark:text-primary-300">{stat.value}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex flex-wrap gap-4"> 
                        {actionText && (
                            <Button className="min-w-[120px]">
                                <Link to={project!} target="_blank">
                                {actionText}
                                </Link>
                            </Button>
                        )}
                    </div>
                    {supportText && (
                        <DonateButton className="mt-4 md:mt-0">
                            {supportText}
                        </DonateButton>
                    )}
                </div>
            </div>
        </div>
    );
};