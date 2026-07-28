import WelcomeCard from '../components/dashboard/WelcomeCard';
import WalletCard from '../components/dashboard/WalletCard';
import StatsGrid from '../components/dashboard/StatsGrid';
import CourseCard from '../components/dashboard/CourseCard';
import RecentActivities from '../components/dashboard/RecentActivities';

export default function Dashboard() {
  return (
    <>
      {/* Top Row: Welcome & Wallet */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
        <WelcomeCard />
        <WalletCard />
      </div>

      {/* Middle Row: Stats Grid */}
      <StatsGrid />

      {/* Bottom Row: Courses & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mt-2 lg:mt-3">
        <CourseCard />
        <RecentActivities />
      </div>
    </>
  );
}
