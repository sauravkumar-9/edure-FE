import {
    IconCash,
    IconShield,
    IconUsersGroup,
    IconUserShield,
  } from '@tabler/icons-react'
  import { UserStatus } from './schema'
  
  export const callTypes = new Map<UserStatus, string>([
    ['placed', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['no show', 'bg-neutral-300/40 border-neutral-300'],
    ['pending', 'bg-amber-200/40 text-amber-900 dark:text-amber-100 border-amber-300'],
    [
      'rejected',
      'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    ],
  ])
  
  export const userTypes = [
    {
      label: 'Superadmin',
      value: 'superadmin',
      icon: IconShield,
    },
    {
      label: 'Admin',
      value: 'admin',
      icon: IconUserShield,
    },
    {
      label: 'Manager',
      value: 'manager',
      icon: IconUsersGroup,
    },
    {
      label: 'Cashier',
      value: 'cashier',
      icon: IconCash,
    },
  ] as const
  