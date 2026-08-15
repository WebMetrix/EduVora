import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { autoBatchEnhancer } from '@reduxjs/toolkit';


// Raw SVGs for social icons to avoid lucide-react missing export issues
const SocialIcons = {
  Facebook: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
  Twitter: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>,
  Linkedin: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  Instagram: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
  Youtube: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
};

const AccordionItem = ({ title, items, isOpen, onToggle }) => {
  return (
    <div className="border-b border-slate-200/40 last:border-0 sm:hidden">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
      >
        <h4 className="text-[14px] font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-3 pb-4 pl-2 border-l-2 border-indigo-100 ml-1">
              {items.map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-[13px] text-slate-500 font-medium hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Footer() {
  const { t } = useTranslation();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const sections = [
    {
      id: 'platform',
      title: t('dashboard.footer.platform.title'),
      items: ['courses', 'network', 'earnings', 'wallet', 'reports'].map(k => ({
        label: t(`dashboard.footer.platform.${k}`)
      }))
    },
    {
      id: 'company',
      title: t('dashboard.footer.company.title'),
      items: ['about', 'contact', 'privacy', 'terms', 'refund'].map(k => ({
        label: t(`dashboard.footer.company.${k}`)
      }))
    },
    {
      id: 'support',
      title: t('dashboard.footer.support.title'),
      items: ['help', 'live', 'faq', 'feedback'].map(k => ({
        label: t(`dashboard.footer.support.${k}`)
      }))
    },
    {
      id: 'resources',
      title: t('dashboard.footer.resources.title'),
      items: ['blog', 'guides', 'community', 'news'].map(k => ({
        label: t(`dashboard.footer.resources.${k}`)
      }))
    }
  ];

  return (
    <footer
      className="hidden lg:flex mt-6 lg:mt-8 flex-col group relative"
    >

      <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 mb-4 lg:mb-5">

        {/* Brand & Social Section */}
        <div className="flex flex-col max-w-55">
          <div className="flex items-center gap-2 mb-3 group/brand cursor-pointer">
            <div className="w-6 h-6 rounded-md bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md group-hover/brand:shadow-indigo-500/30 transition-all duration-300">
              {/* <span className="text-white font-black text-[12px]">E</span> */}
              <span className="text-white font-black text-[12px]"><img src="../public/Eduvora.png" alt="EduVora" className="w-full h-full object-contain" height="100%"/></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-black text-indigo-950 leading-none tracking-tight group-hover/brand:text-indigo-700 transition-colors">{t('login.logoTitle')}</span>
              <span className="text-[6.5px] font-extrabold text-slate-500 tracking-widest mt-0.5">
                {t('login.logoSubtitle').toUpperCase()}
              </span>
            </div>
          </div>
          <p className="text-[10.5px] lg:text-[11px] text-slate-500/90 font-medium leading-relaxed mb-4">
            {t('dashboard.footer.description')}
          </p>
          <div className="flex items-center gap-2">
            {Object.values(SocialIcons).map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-6 h-6 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-slate-500 hover:bg-linear-to-tr hover:from-indigo-600 hover:to-indigo-500 hover:text-white hover:border-transparent hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
              >
                <div className="scale-[0.7] flex items-center justify-center">
                  <Icon />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid (Desktop/Tablet) */}
        <div className="hidden sm:grid flex-1 grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 lg:ml-12">
          {sections.map(section => (
            <div key={section.id} className="flex flex-col gap-2.5">
              <h4 className="text-[12px] font-extrabold text-slate-800 tracking-wide">{section.title}</h4>
              <ul className="flex flex-col gap-1.5">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-[11px] lg:text-[11.5px] text-slate-500 font-medium hover:text-indigo-600 hover:translate-x-1 inline-block transition-all duration-300">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Links Accordion (Mobile Only) */}
        <div className="flex flex-col sm:hidden border-t border-slate-200/40 mt-1">
          {sections.map(section => (
            <AccordionItem
              key={section.id}
              title={section.title}
              items={section.items}
              isOpen={openAccordion === section.id}
              onToggle={() => toggleAccordion(section.id)}
            />
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 pt-3 lg:pt-4 border-t border-slate-200/40 flex items-center justify-center text-center">
        <p className="text-[10px] lg:text-[10.5px] font-semibold text-slate-400">
          {t('dashboard.footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
