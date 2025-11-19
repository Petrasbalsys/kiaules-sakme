import { defaultLinks } from '../contexts/mediaContext';

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links = defaultLinks, className = '' }) => {
  return (
    <div className={`flex justify-center items-center gap-6 md:gap-8 py-8 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-transform duration-300 hover:scale-110"
          aria-label={link.name}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="fill-white/60 group-hover:fill-white transition-colors duration-300"
          >
            <path 
              d={link.icon} 
              //transform={link.name === 'Website' ? 'translate(3.001465 2.148132) matrix(0.38456788 0 0 -0.41311294 -0.98762451 22.202471)' : undefined} 
            />
          </svg>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;