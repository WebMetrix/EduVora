import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import PersonalInformationCard from './PersonalInformationCard';
import AboutMeCard from './AboutMeCard';
import SafeInfoCard from './SafeInfoCard';
import AccountOverviewCard from './AccountOverviewCard';
import AccountSecurityCard from './AccountSecurityCard';

import { User as UserIcon, MapPin, Building, CreditCard, Key } from 'lucide-react';

export default function MyProfile() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('personalInfo');

  const tabs = [
    { id: 'personalInfo', icon: UserIcon, label: t('profile.tabs.personalInfo') },
    { id: 'contactInfo', icon: MapPin, label: t('profile.tabs.contactInfo') },
    { id: 'addressInfo', icon: Building, label: t('profile.tabs.addressInfo') },
    { id: 'bankInfo', icon: CreditCard, label: t('profile.tabs.bankInfo') },
    { id: 'changePassword', icon: Key, label: t('profile.tabs.changePassword') },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-4">
      <ProfileHeader t={t} />

      <ProfileTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PersonalInformationCard t={t} />
          <AboutMeCard t={t} />
          <SafeInfoCard t={t} className="hidden lg:flex" />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <AccountOverviewCard t={t} />
          <AccountSecurityCard t={t} />
          <SafeInfoCard t={t} className="flex lg:hidden" />
        </div>
      </div>
    </div>
  );
}