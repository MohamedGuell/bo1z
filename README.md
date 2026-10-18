# BO1 Zombies Web (Call of Duty: Black Ops 1 Zombies in Browser)

Reproduction et miroir web complet de **Call of Duty: Black Ops 1 Zombies** tournant dans le navigateur via **WebAssembly**, **WebGPU**, et **OPFS**.

Inclus toutes les cartes classiques : **Kino der Toten**, **Five**, **Der Riese**, **Nacht der Untoten**, **Verrückt**, **Shi No Numa**, **Ascension**, **Call of the Dead**, **Shangri-La** et **Moon**.

---

## 🎮 Jouer en ligne

- **URL GitHub Pages** : `https://mohamedguell.github.io/bo1z/`

---

## 🏢 Jouer depuis le travail ou l'école (Bypass pare-feu / proxy d'entreprise)

Dans la plupart des entreprises et universités, les filtres web (Fortinet, Palo Alto, Zscaler, Cisco Umbrella) bloquent les domaines catégorisés "Jeux / Gaming" comme `vel.gg`.
De plus, le CDN de stockage des fichiers du jeu restreint l'accès direct aux origines autorisées (CORS).

Pour débloquer l'accès complet et fluide sans blocage :

### Option 1 : Déployer le proxy gratuit Cloudflare Worker (Recommandé - 2 minutes)

1. Créez un compte gratuit sur [Cloudflare](https://dash.cloudflare.com/sign-up).
2. Rendez-vous dans **Workers & Pages** > **Create application** > **Create Worker**.
3. Donnez un nom (ex: `bo1z-proxy`) et cliquez sur **Deploy**.
4. Cliquez sur **Edit code**, copiez-collez le contenu de [`cloudflare-worker/worker.js`](./cloudflare-worker/worker.js) et cliquez sur **Save and Deploy**.
5. Vous obtenez votre URL dédiée non bloquée : `https://bo1z-proxy.<votre-nom>.workers.dev` !
6. Vous pouvez maintenant :
   - Soit jouer directement via `https://bo1z-proxy.<votre-nom>.workers.dev/bo1z`
   - Soit utiliser votre GitHub Pages avec le paramètre : `https://mohamedguell.github.io/bo1z/?proxy=https://bo1z-proxy.<votre-nom>.workers.dev`

---

## 🛠️ Fonctionnalités incluses

- **Cross-Origin-Isolation (COOP / COEP)** intégrée via `coi-serviceworker.js` pour permettre le multithreading WebAssembly (`SharedArrayBuffer`) directement sur GitHub Pages.
- Support manette (PlayStation, Xbox, manettes génériques).
- Mode Horde / Hell Mode.
- Sauvegarde locale dans l'OPFS (Origin Private File System) du navigateur : les cartes ne se téléchargent qu'une seule fois.

---

## ⚠️ Notes légales

Projet non affilié à Activision ou Treyarch. Call of Duty et Black Ops sont des marques déposées d'Activision Publishing. Ce dépôt est destiné à des fins éducatives et de recherche sur le portage WebAssembly/WebGPU de moteurs de jeu.
