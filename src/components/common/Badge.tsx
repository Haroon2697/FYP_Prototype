import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'success'
    | 'emerald'
    | 'warning'
    | 'amber'
    | 'indigo'
    | 'violet'
    | 'cyan'
    | 'rose'
    | 'purple'
    | 'slate'
    | 'outline'
    | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-slate-100/90 text-slate-700 border-slate-200/90',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/90 shadow-2xs',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/90 shadow-2xs',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    violet: 'bg-purple-50 text-purple-800 border-purple-200/90 shadow-2xs',
    cyan: 'bg-cyan-50 text-cyan-800 border-cyan-200/90 shadow-2xs',
    rose: 'bg-rose-50 text-rose-800 border-rose-200/90 shadow-2xs',
    purple: 'bg-purple-50 text-purple-800 border-purple-200/90 shadow-2xs',
    slate: 'bg-slate-900 text-slate-100 border-slate-800 shadow-sm',
    outline: 'bg-transparent text-slate-600 border-slate-300 hover:border-slate-400',
    gradient: 'bg-gradient-to-r from-violet-50 via-indigo-50 to-cyan-50 text-slate-900 border-indigo-200/80 shadow-2xs',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium tracking-tight',
    md: 'text-xs px-3 py-1 font-semibold tracking-tight',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  }[size];

  const dotColors = {
    default: 'bg-slate-400',
    success: 'bg-emerald-500 ring-2 ring-emerald-200 animate-pulse',
    emerald: 'bg-emerald-500 ring-2 ring-emerald-200 animate-pulse',
    warning: 'bg-amber-500 ring-2 ring-amber-200 animate-pulse',
    amber: 'bg-amber-500 ring-2 ring-amber-200 animate-pulse',
    indigo: 'bg-indigo-500 ring-2 ring-indigo-200 animate-pulse',
    violet: 'bg-purple-600 ring-2 ring-purple-200 animate-pulse',
    cyan: 'bg-cyan-500 ring-2 ring-cyan-200 animate-pulse',
    rose: 'bg-rose-500 ring-2 ring-rose-200 animate-pulse',
    purple: 'bg-purple-500 ring-2 ring-purple-200',
    slate: 'bg-emerald-400 ring-2 ring-emerald-900/60 animate-pulse',
    outline: 'bg-slate-400',
    gradient: 'bg-indigo-500 ring-2 ring-indigo-300 animate-pulse',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all duration-150 ${variantStyles} ${sizeStyles} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors}`} />}
      {children}
    </span>
  );
};
