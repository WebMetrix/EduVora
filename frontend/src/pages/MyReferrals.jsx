import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';

import ReferralProfileCard from '../components/referrals/ReferralProfileCard';
import ReferralLinkCard from '../components/referrals/ReferralLinkCard';
import ReferralQRCodeCard from '../components/referrals/ReferralQRCodeCard';
import ReferralStats from '../components/referrals/ReferralStats';
import ReferralRewards from '../components/referrals/ReferralRewards';
import ReferralSharingTips from '../components/referrals/ReferralSharingTips';
import ReferralsDataTable from '../components/referrals/ReferralsDataTable';

export default function MyReferrals() {
  const { t } = useTranslation();
  const { data: profile } = useSelector((state) => state.profile || {});

  return (
    <>
      <div>
        <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-1">
          {t('myReferrals.title')}
        </h1>
        <div className="hidden md:flex items-center text-[13px] font-medium text-slate-500 gap-1.5">
          <span>{t('myReferrals.breadcrumb1')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900">{t('myReferrals.breadcrumb2')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="w-full min-w-0 h-full lg:col-span-6 xl:col-span-4"><ReferralProfileCard t={t} profile={profile} /></div>
        <div className="w-full min-w-0 h-full lg:col-span-6 xl:col-span-5"><ReferralLinkCard t={t} profile={profile} /></div>
        <div className="w-full min-w-0 h-full lg:col-span-12 xl:col-span-3"><ReferralQRCodeCard t={t} profile={profile} /></div>
      </div>

      <ReferralStats t={t} />

      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-6">
        <div className="w-full lg:w-[45%] xl:w-[40%]"><ReferralRewards t={t} /></div>
        <div className="w-full lg:w-[35%] xl:w-[30%]"><ReferralSharingTips t={t} profile={profile} /></div>
      </div>

      <ReferralsDataTable t={t} />
    </>
  );
}