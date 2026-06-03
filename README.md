# GE-Prototype Template

Template réutilisable pour générer rapidement des **prototypes interactifs React** fidèles au Design System GE-DESIGN.

## Démarrage rapide

### 1. Cloner et installer

```bash
git clone https://github.com/ge-yannroy/GE-Design-prototype.git mon-prototype-gedesign
cd mon-prototype-gedesign
npm install
```

### 2. Lancer Claude Code

```bash
claude
```

Claude Code chargera automatiquement la Claude skill `ge-prototype` (stockée en local dans `.claude/skills/`). La skill fourni tous les tokens, les composants React, et les patterns à utiliser.

## Clients IA compatibles

- La skill fonctionne depuis n'importe quel client web d'IA (par ex. ChatGPT, Gemini, Claude, Lovable). Tout le monde peut l'utiliser.
- Remarque : les résultats sont généralement meilleurs lorsqu'on utilise **Claude Code** associé au connecteur Figma (MCP). Les autres clients restent compatibles, mais peuvent produire des sorties moins précises ou nécessiter des instructions complémentaires.

- La skill accepte aussi des captures d'écran (`.jpg`, `.png`). Vous pouvez fournir un lien public vers l'image ou la coller dans le client web. Les captures d'écran permettent d'obtenir un prototype quand la frame Figma n'est pas partageable, mais la précision structurelle peut être inférieure à une source Figma native.

## Accessibilité et partage

- Ce template et la skill sont conçues pour être accessibles et réutilisables par toute équipes : la skill est locale (`.claude/skills/ge-prototype.md`), versionnable et modifiable.
- Objectif : permettre à n'importe quel contributeur de cloner le template, lancer l'IA et obtenir un prototype fonctionnel sans configuration complexe.

### 3. Demander une implémentation Figma

Dans Claude Code, envoyer un prompt comme :

```
Lis la skill dans .claude/skills/ge-prototype.md, puis implémente cette frame Figma :
https://www.figma.com/design/.../node-id=115-6757
type = back-office
```

Remplacer :
- `node-id=115-6757` par votre frame spécifique
- `type = portail` par `type = back-office` si nécessaire

Claude générera :
- ✅ Composants React réutilisables (ThemeContext, Buttons, Cards, etc.)
- ✅ Structure `src/` complète avec pages et layout
- ✅ CSS utilisant les tokens GE-DESIGN
- ✅ Support du mode sombre intégré
- ✅ Validation des formulaires (si applicable)

## Structure du projet

```
src/
  components/      # Composants React réutilisables
  context/         # ThemeContext, AppContext pour state
  pages/           # Pages du prototype
  App.tsx
  main.tsx
  index.css
  
index.html         # Template avec CSS/webcomponents GE-THEME
package.json
tsconfig.json
.claude/
  skills/
    ge-prototype.md # ← Claude skill (lue auto par Claude Code)
```

## Dépendances incluses

- **React 18** + TypeScript
- **Material Design Icons** (`@mdi/react`)
- **React Hook Form** + Zod (validation)
- **CSS** : variables GE-DESIGN (pas de Tailwind)

## Tests locaux

```bash
npm run build        # Compiler TypeScript
npm run dev          # Dev server local
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
```

## Workflow

1. **Ouvrir** le fichier Figma ciblé
2. **Envoyer** le prompt à Claude (voir section 3 ci-dessus)
3. **Tester** localement : `npm run dev`

## Personnaliser la skill

La skill est locale et versionnable. Pour l'adapter à votre équipe :

1. Éditer `.claude/skills/ge-prototype.md`
2. Ajouter des patterns React spécifiques (ex. : composants métier), ainsi que des régles métier
3. Tester avec un prototype simple d'abord

## Besoin d'aide ?

- Skill complète : [`.claude/skills/ge-prototype.md`](.claude/skills/ge-prototype.md)
- Support design system : ...
- Issues : Créer une issue sur le repo
