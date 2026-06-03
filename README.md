# GE-Design-prototype — Utiliser la Claude skill `ge-prototype`

But: expliquer rapidement comment utiliser la skill Claude qui génère des prototypes React à partir d'une maquette Figma.

Prérequis
- Accès au fichier Figma (la frame ciblée doit être partageable).
- Agent Claude/Claude Code capable de lire les fichiers dans `.claude/skills` (ou accès manuel au fichier).

Commandes / usage
1. Lire la skill : ouvrez ou demandez à l'agent de lire le fichier

   .claude/skills/ge-prototype.md

2. Demander l'implémentation d'une frame Figma

   Exemple (prompt à envoyer à l'agent Claude) :

   Lis la skill dans .claude/skills/ge-prototype.md, puis implémente cette frame Figma : https://www.figma.com/design/5vz8MB9IhQoGoWqkvRPHO7/ge-builder?node-id=115-6757 type = portail

   - Remplacez `type = portail` par `type = back-office` si vous voulez la variante back-office.
   - Indiquez le `node-id` si vous ciblez une frame précise (comme dans l'exemple).

3. Résultat attendu
- Un plan d'implémentation détaillé (liste de composants à créer, tokens, structure `src/`).
- Fichiers React/TypeScript (ex. composants TSX, `index.html`, `ThemeContext`) ou instructions pour générer/assembler le prototype.
- Liste des assets à exporter depuis Figma (images, icônes) et instructions de mapping des tokens.

Conseils
- Précisez la langue (`fr`) si nécessaire.
- Donnez des exemples supplémentaires de frames ou des variantes si vous souhaitez plusieurs sorties.
- Si l'agent propose du code, validez et testez en local : `npm install` puis `npm run build` dans le projet généré.

Fichiers utiles
- Skill: [GE-Design-prototype/.claude/skills/ge-prototype.md](.claude/skills/ge-prototype.md)

Support
Pour toute question ou amélioration de la skill, modifiez le fichier de skill et testez avec des prompts localement.
