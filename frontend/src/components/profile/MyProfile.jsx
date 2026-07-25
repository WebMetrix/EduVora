import { useState, useEffect } from 'react';
import api from '../../https/axios';
import { toast } from 'react-toastify';
import { useTranslation } from '../../hooks/useTranslation';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';
import PersonalInformationCard from './PersonalInformationCard';
import ContactInformationCard from './ContactInformationCard';
import AddressInformationCard from './AddressInformationCard';
import BankInformationCard from './BankInformationCard';
import AboutMeCard from './AboutMeCard';
import SafeInfoCard from './SafeInfoCard';
import AccountOverviewCard from './AccountOverviewCard';
import AccountSecurityCard from './AccountSecurityCard';
import ChangePasswordCard from './ChangePasswordCard';

import { User as UserIcon, MapPin, Building, CreditCard, Key } from 'lucide-react';

export default function MyProfile() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
          const response = await api.get('/profile');
          setProfileData(response.data);
        } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const tabs = [
    { id: 'personalInfo', icon: UserIcon, label: t('profile.tabs.personalInfo') },
    { id: 'contactInfo', icon: MapPin, label: t('profile.tabs.contactInfo') },
    { id: 'addressInfo', icon: Building, label: t('profile.tabs.addressInfo') },
    { id: 'bankInfo', icon: CreditCard, label: t('profile.tabs.bankInfo') },
    { id: 'changePassword', icon: Key, label: t('profile.tabs.changePassword') },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 flex flex-col gap-6 animate-fade-in pb-4">
      <ProfileHeader t={t} />

      <div className="w-full min-w-0">
        <ProfileTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {activeTab === 'changePassword' ? (
        <ChangePasswordCard setActiveTab={setActiveTab} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="xl:col-span-2 flex flex-col gap-6 min-w-0">
            {activeTab === 'personalInfo' && (
              <>
                {/* <PersonalInformationCard t={t} profileData={profileData} /> */}
                <PersonalInformationCard 
                  t={t} 
                  profileData={profileData} 
                  onPictureUpdated={fetchProfile} 
                />
                <AboutMeCard t={t} />
              </>
            )}
            {activeTab === 'contactInfo' && (
              <ContactInformationCard t={t} profileData={profileData} />
            )}
            {activeTab === 'addressInfo' && (
              <AddressInformationCard t={t} profileData={profileData} />
            )}
            {activeTab === 'bankInfo' && (
              <BankInformationCard t={t} profileData={profileData} />
            )}
            <SafeInfoCard t={t} className="hidden xl:flex" />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 min-w-0">
            <AccountOverviewCard t={t} profileData={profileData} />
            <AccountSecurityCard t={t} />
            <SafeInfoCard t={t} className="flex xl:hidden" />
          </div>
        </div>
      )}
    </div>
  );
}