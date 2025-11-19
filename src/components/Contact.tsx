import React from 'react';
import { motion } from 'framer-motion';
import { icons } from '../contexts/mediaContext';

export type ContactPerson = {
  name: string;
  title?: string;
  email: string;
  linkedin?: string;
};

export interface ContactEmailsProps {
  people: ContactPerson[];
  className?: string;
  cols?: number; // number of columns on md+ (default 2)
}

const cardMotion = {
  whileHover: { y: -6, boxShadow: '0 10px 30px rgba(0,0,0,0.35)' },
  whileFocus: { y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.32)' },
};

export default function Contact({ people, className = '', cols = 2 }: ContactEmailsProps) {
  const mdColsClass = cols === 1 ? 'md:grid-cols-1' : cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <section className={` ${className}`}>
      {/* center grid items so columns are spaced evenly and cards are centered in their cell */}
      <div className={`grid grid-cols-1 ${mdColsClass}`}>
        {people.map((p, i) => (
          <motion.div
            key={i}
            className="relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-4 flex flex-row md:flex-col gap-4 md:max-w-[400px] mx-auto my-5"
            tabIndex={0}
            aria-label={`Contact ${p.name}`}
            {...cardMotion}
          >
            <div className="min-w-0 w-fit">
              <div className="text-xl md:text-2xl font-semibold text-white truncate ">{p.name}{p.title && ` - ${p.title}`}</div>

              {/* single-row with linkedin icon first, then mail icon + email */}
              <div className="mt-2 flex items-center gap-3 text-sm text-gray-200">
                {p.linkedin ? (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white/6 text-white hover:bg-white/12 transition-colors"
                    aria-label={`Open ${p.name} on LinkedIn`}
                  >
                    <img src={icons.linkedin.src} className="w-8 h-8 md:w-8 md:h-8" />
                  </a>
                ) : (
                  <div></div>
                )}

                <a
                  className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-white truncate"
                  href={`mailto:${encodeURIComponent(p.email)}`}
                >
                  <img src={icons.email.src} className="w-8 h-8 shrink-0" />
                  <span className="truncate text-[#f5f505]">{p.email}</span>
                </a>
              </div>
            </div>

            {/* keep a small right-side column for symmetry on wide layouts (optional) */}
            {/* <div className="flex items-center pl-2" aria-hidden>
            </div> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
}