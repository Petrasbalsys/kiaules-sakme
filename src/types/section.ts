export interface SectionProps {
  index?: number;
  headerTitle?: string;
  hideHeader?: boolean;
  bgVideo?: string | Record<string, string>;
}

export interface SectionComponent extends SectionProps {
  className?: string;
  children?: React.ReactNode;
}