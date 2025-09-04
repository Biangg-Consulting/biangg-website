import { isUUID } from "@/utils/is-uuid";
import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type Crumb = {
  path: string;
  name: string;
};

const BreadCrumbs: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");
  const crumbs: Crumb[] = [];

  paths.reduce((prevPath, currentPath) => {
    const path = `${prevPath}/${currentPath}`;
    const name = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

    if (!isUUID(name)) {
      crumbs.push({ path, name: name.replaceAll("-", " ") });
    }

    return path;
  }, "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={crumb.path}>{crumb.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < crumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
