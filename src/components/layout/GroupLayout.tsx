import { Outlet } from 'react-router-dom';
import { GatewayHeader } from '@/components/layout/GatewayHeader';
import { GatewayFooter } from '@/components/layout/GatewayFooter';

export function GroupLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f7ff] text-navy">
      <GatewayHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GatewayFooter />
    </div>
  );
}
