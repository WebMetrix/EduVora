import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import TreeNodeCard from './TreeNodeCard';
import UserDetailsSidebar from './UserDetailsSidebar';

// Mock data matching the screenshot exactly
const treeData = {
  id: 1,
  name: 'Priya Sharma',
  package: 'Gold Package',
  status: 'Active',
  userId: 'USR10001',
  sponsor: 'System',
  joiningDate: '20 May 2025',
  childrenCount: 2,
  avatar: 'https://i.pravatar.cc/150?u=priya',
  children: [
    {
      id: 2,
      name: 'Rohit Verma',
      package: 'Silver Package',
      status: 'Active',
      userId: 'USR10002',
      sponsor: 'Priya Sharma',
      joiningDate: '21 May 2025',
      childrenCount: 2,
      avatar: 'https://i.pravatar.cc/150?u=rohit',
      children: [
        {
          id: 4,
          name: 'Aman Kumar',
          package: 'Silver Package',
          status: 'Active',
          userId: 'USR10004',
          sponsor: 'Rohit Verma',
          joiningDate: '22 May 2025',
          childrenCount: 0,
          avatar: 'https://i.pravatar.cc/150?u=aman',
        },
        {
          id: 5,
          name: 'Neha Singh',
          package: 'Diamond Package',
          status: 'Active',
          userId: 'USR10005',
          sponsor: 'Rohit Verma',
          joiningDate: '23 May 2025',
          childrenCount: 0,
          avatar: 'https://i.pravatar.cc/150?u=neha',
        }
      ]
    },
    {
      id: 3,
      name: 'Sneha Patel',
      package: 'Gold Package',
      status: 'Active',
      userId: 'USR10003',
      sponsor: 'Priya Sharma',
      joiningDate: '22 May 2025',
      childrenCount: 2,
      avatar: 'https://i.pravatar.cc/150?u=sneha',
      children: [
        {
          id: 6,
          name: 'Vikram Sharma',
          package: 'Silver Package',
          status: 'Active',
          userId: 'USR10006',
          sponsor: 'Sneha Patel',
          joiningDate: '24 May 2025',
          childrenCount: 0,
          avatar: 'https://i.pravatar.cc/150?u=vikram',
        },
        {
          id: 7,
          name: 'Pooja Mehta',
          package: 'Gold Package',
          status: 'Pending',
          userId: 'USR10007',
          sponsor: 'Sneha Patel',
          joiningDate: '25 May 2025',
          childrenCount: 0,
          avatar: 'https://i.pravatar.cc/150?u=pooja',
        }
      ]
    }
  ]
};

const TreeNode = ({ node, onNodeClick, selectedUserId, level = 0 }) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div className="relative z-10">
        <TreeNodeCard 
          user={node} 
          onClick={onNodeClick} 
          isSelected={selectedUserId === node.id}
          level={level}
        />
      </div>
      
      {/* Children Container */}
      {hasChildren && (
        <>
          {/* Vertical line going down from parent */}
          <div className="w-px h-8 bg-indigo-200"></div>
          
          <div className="flex relative">
            {node.children.map((child, index) => {
              const isFirst = index === 0;
              const isLast = index === node.children.length - 1;
              const hasSiblings = node.children.length > 1;

              return (
              <div key={child.id} className="flex flex-col items-center relative px-2 sm:px-6 xl:px-12">
                {/* Horizontal line segment for this child */}
                {hasSiblings && (
                  <div className={`absolute top-0 h-[2px] bg-indigo-200
                    ${isFirst ? 'left-1/2 right-0' : isLast ? 'left-0 right-1/2' : 'left-0 right-0'}
                  `}></div>
                )}
                {/* Vertical line going down to child */}
                <div className="w-px h-8 bg-indigo-200"></div>
                <TreeNode 
                  node={child} 
                  onNodeClick={onNodeClick} 
                  selectedUserId={selectedUserId}
                  level={level + 1}
                />
              </div>
            )})}
          </div>
        </>
      )}
    </div>
  );
};

export default function GenealogyTree() {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(treeData);

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start h-[600px] w-full">
      <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden h-full">
      
      {/* Zoom / Pan Wrapper */}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            
            <div className="min-w-max min-h-max p-12 flex justify-center pt-24 pb-32 relative">
               
               {/* Level Indicators */}
               <div className="absolute left-0 top-[110px] flex flex-col gap-[145px]">
                 <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100/50 text-indigo-700 rounded-lg text-[10px] font-extrabold shadow-sm border border-indigo-100">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    {t('network.tree.you')}
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-blue-100/50 text-blue-700 rounded-lg text-[10px] font-extrabold shadow-sm border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {t('network.tree.level1')}
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100/50 text-emerald-700 rounded-lg text-[10px] font-extrabold shadow-sm border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    {t('network.tree.level2')}
                 </div>
               </div>

               {/* The Tree */}
               <TreeNode 
                 node={treeData} 
                 onNodeClick={(user) => setSelectedUser(user)} 
                 selectedUserId={selectedUser?.id}
                 level={0}
               />

            </div>
          </TransformComponent>
        )}
      </TransformWrapper>

      {/* Legend Footer (Fixed at bottom inside tree area) */}
      <div className="absolute bottom-4 left-6 right-6 lg:right-auto flex flex-wrap items-center gap-4 lg:gap-6 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-100 z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded-full bg-indigo-500"></div>
          <span className="text-[12px] font-bold text-slate-700">{t('network.tree.you')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded-full bg-blue-500"></div>
          <span className="text-[12px] font-bold text-slate-700">{t('network.tree.level1')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded-full bg-emerald-500"></div>
          <span className="text-[12px] font-bold text-slate-700">{t('network.tree.level2')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded-full border-b-2 border-dashed border-slate-300"></div>
          <span className="text-[12px] font-bold text-slate-700">{t('network.tree.inactive')}</span>
        </div>
      </div>
      
      </div>

      {/* Static User Details Panel on the right */}
      {selectedUser && (
        <UserDetailsSidebar 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
}
