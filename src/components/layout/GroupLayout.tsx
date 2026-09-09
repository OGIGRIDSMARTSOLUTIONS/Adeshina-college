import { Outlet } from 'react-router-dom';
import { GatewayHeader } from '@/components/layout/GatewayHeader';
import { GatewayFooter } from '@/components/layout/GatewayFooter';
import { ChatLauncher } from '@/components/chatbot/ChatLauncher';

export function GroupLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fc] text-[#05264c]">
      <GatewayHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GatewayFooter />
      <ChatLauncher />
    </div>
  );
}
