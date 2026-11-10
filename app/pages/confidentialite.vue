<template>
  <LegalPage title="Politique de confidentialité">
    <p>
      Cette politique explique quelles données personnelles VinoDomia traite, pourquoi, combien de temps,
      et comment exercer vos droits, conformément au Règlement général sur la protection des données (RGPD)
      et à la loi « Informatique et Libertés ».
    </p>

    <h2 id="responsable">1. Responsable du traitement</h2>
    <p>
      Les données liées à votre compte sont traitées par <LegalTodo>raison sociale, forme juridique, adresse du siège</LegalTodo>,
      éditeur de VinoDomia (voir les <NuxtLink to="/mentions-legales">mentions légales</NuxtLink>).
    </p>
    <p>
      Contact pour toute question relative à vos données : <LegalTodo>adresse email dédiée ou contact du délégué à la protection des données</LegalTodo>.
    </p>

    <h3>Données saisies par les cavistes</h3>
    <p>
      Les fiches clients, fournisseurs, ventes et factures enregistrées dans l'application par une cave restent
      sous la responsabilité de cette cave, qui en est le responsable de traitement. VinoDomia agit alors en tant que
      sous-traitant au sens de l'article 28 du RGPD : nous traitons ces données uniquement sur instruction de la cave et
      pour lui fournir le service.
    </p>

    <h2 id="donnees">2. Données collectées</h2>
    <table>
      <thead>
        <tr><th>Catégorie</th><th>Données</th><th>Origine</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Compte utilisateur</td>
          <td>Nom, adresse email, mot de passe (stocké uniquement sous forme chiffrée), rôle, date et version des conditions acceptées</td>
          <td>Vous, à l'inscription</td>
        </tr>
        <tr>
          <td>Données de la cave</td>
          <td>Clients (civilité, nom, téléphones, email, adresse), fournisseurs, produits, stock, commandes, factures, mouvements de caisse</td>
          <td>Saisies par la cave et son équipe</td>
        </tr>
        <tr>
          <td>Données techniques</td>
          <td>Jeton de connexion, préférence d'affichage, adresse IP lors des échanges avec nos serveurs</td>
          <td>Votre navigateur</td>
        </tr>
      </tbody>
    </table>

    <h2 id="finalites">3. Finalités et bases légales</h2>
    <ul>
      <li><strong>Créer et gérer votre compte, vous permettre de vous connecter</strong> : exécution du contrat (article 6.1.b du RGPD).</li>
      <li><strong>Fournir les fonctions de gestion de cave</strong> (clients, stock, caisse, commandes) : exécution du contrat.</li>
      <li><strong>Sécuriser le service</strong> (authentification, prévention des accès frauduleux) : intérêt légitime (article 6.1.f).</li>
      <li><strong>Conserver les pièces comptables</strong> (factures) : obligation légale (article 6.1.c).</li>
    </ul>
    <p>Vos données ne sont ni vendues, ni utilisées à des fins publicitaires.</p>

    <h2 id="conservation">4. Durées de conservation</h2>
    <ul>
      <li>Données du compte : pendant toute la durée d'utilisation du compte, puis supprimées dans un délai de <LegalTodo>délai, ex. 3 mois</LegalTodo> après sa clôture.</li>
      <li>Factures et pièces comptables : 10 ans, conformément à l'article L123-22 du Code de commerce.</li>
      <li>Jeton de connexion : jusqu'à son expiration ou votre déconnexion.</li>
      <li>Journaux techniques : <LegalTodo>durée, ex. 12 mois</LegalTodo>.</li>
    </ul>

    <h2 id="destinataires">5. Destinataires et sous-traitants</h2>
    <p>Vos données sont accessibles uniquement :</p>
    <ul>
      <li>aux membres habilités de votre cave, selon leur rôle (gérant, vendeur…) ;</li>
      <li>à l'équipe VinoDomia, pour assurer le support et la maintenance ;</li>
      <li>à notre hébergeur : <LegalTodo>nom, adresse et localisation des serveurs</LegalTodo>.</li>
    </ul>
    <p>
      L'application charge ses polices de caractères depuis Google Fonts (Google Ireland Ltd.). Votre adresse IP est
      donc transmise à Google lors de l'affichage des pages, et peut faire l'objet d'un transfert hors de l'Union
      européenne, encadré par le cadre de protection des données UE–États-Unis.
    </p>

    <h2 id="securite">6. Sécurité</h2>
    <ul>
      <li>Les mots de passe sont hachés (bcrypt) : personne, y compris VinoDomia, ne peut les lire.</li>
      <li>Un mot de passe robuste est exigé (12 caractères minimum, majuscule, minuscule, chiffre et caractère spécial), conformément aux recommandations de la CNIL.</li>
      <li>La connexion repose sur un jeton signé, valable 24 heures.</li>
      <li>Les échanges avec le service sont chiffrés (HTTPS) <LegalTodo>à confirmer selon l'hébergement</LegalTodo>.</li>
    </ul>

    <h2 id="droits">7. Vos droits</h2>
    <p>Vous disposez des droits suivants sur vos données :</p>
    <ul>
      <li><strong>Accès</strong> : obtenir une copie de vos données ;</li>
      <li><strong>Rectification</strong> : corriger des données inexactes ;</li>
      <li><strong>Effacement</strong> : demander la suppression de votre compte et de vos données ;</li>
      <li><strong>Limitation</strong> et <strong>opposition</strong> au traitement, dans les cas prévus par le RGPD ;</li>
      <li><strong>Portabilité</strong> : récupérer vos données dans un format structuré ;</li>
      <li><strong>Directives post-mortem</strong> : définir le sort de vos données après votre décès.</li>
    </ul>
    <p>
      Pour exercer ces droits, écrivez à <LegalTodo>adresse email de contact</LegalTodo>. Nous répondons dans un délai d'un mois.
      Si vous êtes client d'une cave, adressez-vous en priorité à cette cave, responsable de vos données.
    </p>
    <p>
      Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL
      (<a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener">cnil.fr/fr/plaintes</a>).
    </p>

    <h2 id="cookies">8. Cookies et stockage local</h2>
    <p>
      VinoDomia n'utilise ni cookie publicitaire, ni outil de mesure d'audience, ni traceur tiers. Seuls des éléments
      strictement nécessaires au fonctionnement du service sont déposés ; ils sont exemptés de consentement
      (article 82 de la loi « Informatique et Libertés »), c'est pourquoi aucun bandeau ne vous est présenté.
    </p>
    <table>
      <thead>
        <tr><th>Nom</th><th>Type</th><th>Rôle</th><th>Durée</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>authToken</td>
          <td>Stockage local</td>
          <td>Garder votre session ouverte après la connexion</td>
          <td>24 heures au plus (expiration du jeton) ou jusqu'à la déconnexion</td>
        </tr>
        <tr>
          <td>vd-role</td>
          <td>Cookie</td>
          <td>Afficher l'espace correspondant à votre rôle (gérant, vendeur, vigneron)</td>
          <td>Session du navigateur</td>
        </tr>
      </tbody>
    </table>

    <h2 id="modifications">9. Modifications</h2>
    <p>
      Nous pouvons faire évoluer cette politique, notamment pour suivre les évolutions du service ou de la
      réglementation. La date de dernière mise à jour figure en haut de cette page.
    </p>
  </LegalPage>
</template>
