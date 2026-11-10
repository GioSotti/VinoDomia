<script setup lang="ts">
import type {OrderStatus} from '~/utils/status'
import type {IconName, Profil} from '~/utils/navigation'

definePageMeta({
  middleware: 'auth',
})

const {profil} = useProfil()

const HEAD: Record<Profil, { eyebrow: string, title: string, cta: string, to?: string }> = {
  admin: {eyebrow: 'Pilotage', title: 'Tableau de bord', cta: 'Nouvelle action', to: '/commercial_actions'},
  vendeur: {eyebrow: 'Comptoir', title: 'Bonne journée au comptoir', cta: 'Nouvelle vente', to: '/entrees_sorties_caisse'},
  vigneron: {eyebrow: 'Espace vigneron', title: 'SCEA Château Montfin', cta: 'Ajouter une cuvée'},
}
const head = computed(() => HEAD[profil.value])

type Order = { who: string, meta: string, status: OrderStatus, total: string }

const stats = {unpaidBills: 153, pricesToReview: 31, ordersThisMonth: 20}

const purchaseOrders: Order[] = [
  {who: 'Fournisseur A', meta: '1 juin 2024 · 5 articles', status: 'En cours', total: '300,00 €'},
  {who: 'Fournisseur B', meta: '5 juin 2024 · 7 articles', status: 'Livré', total: '750,00 €'},
  {who: 'Fournisseur C', meta: '10 juin 2024 · 6 articles', status: 'Annulé', total: '500,00 €'},
]

const stockMoves = [
  {ref: 'PR001', reason: 'Régularisation annuelle', date: '12/10/2026', qty: '0 u.'},
  {ref: 'PR002', reason: 'Offert à un client', date: '12/10/2026', qty: '3 L'},
  {ref: 'PR003', reason: 'Transvasement', date: '12/10/2026', qty: '1,5 L'},
]

const quickActions: { title: string, sub: string, icon: IconName, to: string, primary?: boolean }[] = [
  {title: 'Encaisser une vente', sub: 'Ouvrir la caisse', icon: 'card', to: '/entrees_sorties_caisse', primary: true},
  {title: 'Trouver un vin', sub: 'Scanner ou rechercher', icon: 'scan', to: '/products'},
  {title: 'Nouveau client', sub: 'Créer une fiche', icon: 'users', to: '/clients'},
]

const recentClients = [
  {ini: 'JD', name: 'Jean Dupont', city: 'Paris', tel: '06 12 34 56 78'},
  {ini: 'MC', name: 'Marie Curie', city: 'Lyon', tel: '06 98 76 54 32'},
  {ini: 'IN', name: 'Isaac Newton', city: 'Toulouse', tel: '06 76 54 32 10'},
]

const receivedOrders: Order[] = [
  {who: 'BC-0001', meta: '1 juin 2024 · 5 articles', status: 'En cours', total: '300,00 €'},
  {who: 'BC-0002', meta: '5 juin 2024 · 7 articles', status: 'Livré', total: '750,00 €'},
  {who: 'BC-0003', meta: '10 juin 2024 · 6 articles', status: 'Annulé', total: '500,00 €'},
]
</script>

<template>
  <AppOverlay>
    <div class="box-border flex w-full flex-col gap-7 px-4 pt-9 pb-12 sm:px-8">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="flex flex-col gap-2">
          <p class="m-0 text-xs font-medium uppercase tracking-[0.16em] text-taupe">{{ head.eyebrow }}</p>
          <h1 class="m-0 font-serif text-[36px] font-normal leading-tight">{{ head.title }}</h1>
        </div>
        <NuxtLink :to="head.to ?? '#'"
                  class="flex h-11 items-center gap-2 rounded-[10px] bg-encre px-[18px] text-[15px] font-medium text-ivoire no-underline hover:bg-brun">
          <AppIcon name="plus" :stroke="2"/>
          {{ head.cta }}
        </NuxtLink>
      </div>

      <div v-if="profil === 'admin'" class="flex flex-col gap-4">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
          <DashboardStatCard label="Factures impayées" :value="stats.unpaidBills" tag="À traiter" tag-tone="alerte"
                             link-label="Voir les factures" to="/bills"/>
          <DashboardStatCard label="Tarifs à revoir" :value="stats.pricesToReview" tag="Cette semaine"
                             tag-tone="attention" link-label="Mettre à jour" to="/tarifs"/>
          <DashboardStatCard label="Commandes ce mois" :value="stats.ordersThisMonth" link-label="Voir les commandes"
                             to="/purchase_order" dark/>
        </div>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
          <DashboardPanel title="Bons de commande" link-label="Tout voir" to="/purchase_order">
            <div v-for="o in purchaseOrders" :key="o.who" class="flex items-center gap-3 py-3">
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <p class="m-0 text-[15px] font-medium">{{ o.who }}</p>
                <p class="m-0 text-[13px] text-taupe">{{ o.meta }}</p>
              </div>
              <DashboardStatusPill :status="o.status"/>
              <p class="m-0 w-[88px] text-right text-[15px] font-medium tabular-nums">{{ o.total }}</p>
            </div>
          </DashboardPanel>

          <DashboardPanel title="Sorties de stock" link-label="Tout voir" to="/stock_removal">
            <div v-for="m in stockMoves" :key="m.ref" class="flex items-center gap-3 py-3">
              <p class="m-0 w-[60px] text-[13px] font-medium text-taupe">{{ m.ref }}</p>
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <p class="m-0 text-[15px] font-medium">{{ m.reason }}</p>
                <p class="m-0 text-[13px] text-taupe">{{ m.date }}</p>
              </div>
              <p class="m-0 text-right text-[15px] font-medium tabular-nums">{{ m.qty }}</p>
            </div>
          </DashboardPanel>
        </div>
      </div>

      <div v-else-if="profil === 'vendeur'" class="flex flex-col gap-4">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
          <NuxtLink v-for="a in quickActions" :key="a.title" :to="a.to"
                    class="box-border flex min-h-[132px] flex-col justify-between gap-4 rounded-[14px] p-5 no-underline transition-colors"
                    :class="a.primary ? 'bg-encre text-ivoire hover:bg-brun' : 'border border-lin bg-papier text-encre hover:border-grege'">
            <AppIcon :name="a.icon" :size="26" :stroke="1.6"/>
            <span class="flex flex-col gap-0.5">
              <span class="font-serif text-[22px]">{{ a.title }}</span>
              <span class="text-sm" :class="a.primary ? 'text-grege' : 'text-taupe'">{{ a.sub }}</span>
            </span>
          </NuxtLink>
        </div>

        <DashboardPanel title="Clients récents" link-label="Tous les clients" to="/clients">
          <div v-for="c in recentClients" :key="c.name" class="flex flex-wrap items-center gap-3 py-3">
            <div class="flex size-10 items-center justify-center rounded-full bg-sable font-serif text-[15px]">
              {{ c.ini }}
            </div>
            <div class="flex min-w-0 flex-[1_1_180px] flex-col gap-0.5">
              <p class="m-0 text-[15px] font-medium">{{ c.name }}</p>
              <p class="m-0 text-[13px] text-taupe">{{ c.city }}</p>
            </div>
            <p class="m-0 text-sm text-brun tabular-nums">{{ c.tel }}</p>
            <NuxtLink to="/clients" class="px-1 py-2.5 text-sm font-medium text-encre hover:text-bordeaux">
              Ouvrir la fiche
            </NuxtLink>
          </div>
        </DashboardPanel>
      </div>

      <div v-else class="flex flex-col gap-4">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
          <DashboardStatCard label="Commandes en cours" :value="1" link-label="Préparer l'envoi"/>
          <DashboardStatCard label="Livrées" :value="1" link-label="Voir les livraisons"/>
          <DashboardStatCard label="Montant commandé" value="1 050 €" link-label="Mes factures" dark/>
        </div>

        <div class="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
          <DashboardPanel title="Bons de commande reçus" link-label="Tout voir">
            <div v-for="o in receivedOrders" :key="o.who" class="flex items-center gap-3 py-3">
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <p class="m-0 text-[15px] font-medium">{{ o.who }}</p>
                <p class="m-0 text-[13px] text-taupe">{{ o.meta }}</p>
              </div>
              <DashboardStatusPill :status="o.status"/>
              <p class="m-0 w-[88px] text-right text-[15px] font-medium tabular-nums">{{ o.total }}</p>
            </div>
          </DashboardPanel>

          <section class="flex flex-col items-start justify-center gap-3 rounded-[14px] border border-dashed border-grege bg-papier p-7">
            <AppIcon name="wine" :size="32" :stroke="1.5" class="text-taupe"/>
            <h2 class="m-0 font-serif text-[22px] font-normal">Présentez vos cuvées</h2>
            <p class="m-0 max-w-[380px] text-[15px] leading-[1.55] text-taupe">
              Ajoutez vos vins avec fiche, millésime et tarif pro : le caviste les retrouve directement dans son
              catalogue.
            </p>
            <button type="button"
                    class="h-11 cursor-pointer rounded-[10px] border border-encre bg-transparent px-[18px] text-[15px] font-medium text-encre hover:bg-sable">
              Ajouter une cuvée
            </button>
          </section>
        </div>
      </div>
    </div>
  </AppOverlay>
</template>
