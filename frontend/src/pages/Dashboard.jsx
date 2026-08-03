import WelcomeCard from '../components/dashboard/WelcomeCard';
import WalletCard from '../components/dashboard/WalletCard';
import StatsGrid from '../components/dashboard/StatsGrid';
import PackageCards from '../components/dashboard/PackageCards';
import RecentActivities from '../components/dashboard/RecentActivities';

export default function Dashboard() {
  return (
    <>
      {/* Top Row: Welcome & Wallet */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
        <WelcomeCard />
        <WalletCard />
      </div>

      {/* Middle Row: Stats Grid - Temporarily Commented Out */}
      {/* <StatsGrid /> */}

      {/* Bottom Row: Packages & Activities */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-5 mt-2 lg:mt-3">
        <PackageCards />
        <div className="xl:col-span-5">
          <RecentActivities />
        </div>
      </div>
    </>
  );
}
