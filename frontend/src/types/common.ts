export interface Route {
  path: string;
  label: string;
  icon?: React.ComponentType;
  protected?: boolean;
}

export interface MenuItem extends Route {
  subItems?: MenuItem[];
}

export interface Breadcrumb {
  label: string;
  path: string;
}

export interface MetaData {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}
