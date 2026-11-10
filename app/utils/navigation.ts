import type {Profil} from '#shared/utils/roles'

export type {Profil}

export type NavItem = {
  label: string
  icon: IconName
  to?: string
  badge?: string
  alert?: boolean
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const ICONS = {
  dash: 'M4 3h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M15 3h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z M15 12h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z M4 16h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z',
  stats: 'M3 3v18h18 M8 17v-5 M13 17V7 M18 17v-8',
  card: 'M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z M2 10h20 M6 15h4',
  bag: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z M3 6h18 M16 10a4 4 0 0 1-8 0',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6 M16 13H8 M16 17H8',
  wine: 'M8 22h8 M7 10h10 M12 15v7 M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z',
  box: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12',
  truck: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2 M15 18H9 M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14 M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M5 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4',
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z',
  home: 'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1Z',
  scan: 'M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2 M8 8v8 M12 8v8 M16 8v8',
  search: 'M3 11a8 8 0 1 0 16 0a8 8 0 1 0-16 0 M21 21l-4.3-4.3',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.94 1.94 0 0 0 3.4 0',
  plus: 'M5 12h14 M12 5v14',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  close: 'M18 6 6 18 M6 6l12 12',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  pencil: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z M15 5l4 4',
  trash: 'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6',
  more: 'M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0 M18 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0 M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  printer: 'M6 9V2h12v7 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v8H6Z',
  check: 'M20 6 9 17l-5-5',
  eye: 'M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0 M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  eyeOff: 'M10.73 5.08A10.43 10.43 0 0 1 12 5c4.64 0 8.6 2.9 10 7a10.75 10.75 0 0 1-1.44 2.49 M14.08 14.16a3 3 0 0 1-4.24-4.24 M17.48 17.5A10.75 10.75 0 0 1 2 12a10.75 10.75 0 0 1 4.45-5.5 M2 2l20 20',
  alert: 'M12 22a10 10 0 1 0 0-20a10 10 0 1 0 0 20 M12 8v4 M12 16h.01',
  settings: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  user: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2 M8 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
  lock: 'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z M7 11V7a5 5 0 0 1 10 0v4',
} as const

export type IconName = keyof typeof ICONS

export const NAV: Record<Profil, NavSection[]> = {
  admin: [
    {
      title: 'Pilotage', items: [
        {label: 'Tableau de bord', icon: 'dash', to: '/dashboard'},
        {label: 'Statistiques', icon: 'stats'},
      ]
    },
    {
      title: 'Vente', items: [
        {label: 'Caisse', icon: 'card', to: '/entrees_sorties_caisse'},
        {label: 'Commandes clients', icon: 'bag', to: '/nouvelle_commande'},
        {label: 'Factures', icon: 'file', to: '/bills', badge: '153', alert: true},
      ]
    },
    {
      title: 'Cave', items: [
        {label: 'Produits', icon: 'wine', to: '/products'},
        {label: 'Stock', icon: 'box', to: '/stock_removal'},
        {label: 'Fournisseurs', icon: 'truck', to: '/fournisseurs', badge: '3'},
      ]
    },
    {title: 'Relation', items: [{label: 'Clients', icon: 'users', to: '/clients'}]},
    {
      title: 'Administration', items: [
        {label: 'Utilisateurs', icon: 'shield', to: '/utilisateurs'},
        {label: 'Maintenance', icon: 'wrench', to: '/maintenance'},
      ]
    },
  ],
  vendeur: [
    {
      title: 'Comptoir', items: [
        {label: 'Accueil', icon: 'dash', to: '/dashboard'},
        {label: 'Caisse', icon: 'card', to: '/entrees_sorties_caisse'},
        {label: 'Commandes clients', icon: 'bag', to: '/nouvelle_commande'},
      ]
    },
    {
      title: 'Cave', items: [
        {label: 'Produits', icon: 'wine', to: '/products'},
        {label: 'Stock', icon: 'box', to: '/stock_removal'},
      ]
    },
    {title: 'Relation', items: [{label: 'Clients', icon: 'users', to: '/clients'}]},
  ],
  vigneron: [
    {
      title: 'Mon domaine', items: [
        {label: 'Tableau de bord', icon: 'dash', to: '/dashboard'},
        {label: 'Mes cuvées', icon: 'wine'},
      ]
    },
    {
      title: 'Échanges', items: [
        {label: 'Bons de commande', icon: 'bag', badge: '3'},
        {label: 'Livraisons', icon: 'truck'},
        {label: 'Factures', icon: 'file'},
      ]
    },
    {title: 'Compte', items: [{label: 'Profil du domaine', icon: 'home'}]},
  ],
}

export const WHO: Record<Profil, { initial: string, name: string, sub: string }> = {
  admin: {initial: 'G', name: 'Gérant de la cave', sub: 'Accès complet'},
  vendeur: {initial: 'V', name: 'Vendeur', sub: 'Comptoir & clients'},
  vigneron: {initial: 'M', name: 'SCEA Château Montfin', sub: 'Espace vigneron'},
}

export const SEARCH_HINT: Record<Profil, string> = {
  admin: 'Rechercher un client, un vin, une commande…',
  vendeur: 'Rechercher un vin ou un client…',
  vigneron: 'Rechercher une commande, une facture…',
}
