import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'primary'
    | 'blue'
    | 'success'
    | 'emerald'
    | 'warning'
    | 'amber'
    | 'error'
    | 'danger'
    | 'rose'
    | 'indigo'
    | 'violet'
    | 'cyan'
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
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-blue-50 text-blue-700 border-blue-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    rose: 'bg-red-50 text-red-700 border-red-200',
    indigo: 'bg-blue-50 text-blue-700 border-blue-200',
    violet: 'bg-blue-50 text-blue-700 border-blue-200',
    cyan: 'bg-sky-50 text-sky-700 border-sky-200',
    purple: 'bg-slate-100 text-slate-800 border-slate-200',
    slate: 'bg-slate-900 text-white border-slate-800',
    outline: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300',
    gradient: 'bg-blue-50 text-blue-700 border-blue-200',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-tight',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-tight',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  }[size];

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-blue-600 ring-2 ring-blue-200 animate-pulse',
    blue: 'bg-blue-600 ring-2 ring-blue-200 animate-pulse',
    success: 'bg-emerald-500 ring-2 ring-emerald-200 animate-pulse',
    emerald: 'bg-emerald-500 ring-2 ring-emerald-200 animate-pulse',
    warning: 'bg-amber-500 ring-2 ring-amber-200 animate-pulse',
    amber: 'bg-amber-500 ring-2 ring-amber-200 animate-pulse',
    error: 'bg-red-500 ring-2 ring-red-200 animate-pulse',
    danger: 'bg-red-500 ring-2 ring-red-200 animate-pulse',
    rose: 'bg-red-500 ring-2 ring-red-200 animate-pulse',
    indigo: 'bg-blue-600 ring-2 ring-blue-200 animate-pulse',
    violet: 'bg-blue-600 ring-2 ring-blue-200 animate-pulse',
    cyan: 'bg-sky-500 ring-2 ring-sky-200 animate-pulse',
    purple: 'bg-slate-600 ring-2 ring-slate-200',
    slate: 'bg-emerald-400 animate-pulse',
    outline: 'bg-slate-400',
    gradient: 'bg-blue-600 ring-2 ring-blue-200 animate-pulse',
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
