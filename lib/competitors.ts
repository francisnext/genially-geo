export const DIRECT_COMPETITORS = [
    "Canva",
    "Prezi",
    "Adobe Express",
    "Visme",
    "Keynote",
    "Emaze",
    "Piktochart",
    "H5P",
    "Nearpod",
    "Kahoot",
    "Mentimeter",
    "Articulate"
];

export function normalizeBrandName(name: string | undefined): string {
    if (!name) return "";
    const n = name.toLowerCase().trim();

    if (n.includes("genially")) return "Genially";
    if (n.includes("canva")) return "Canva";
    if (n.includes("prezi")) return "Prezi";
    if (n.includes("adobe express") || n.includes("creative cloud express")) return "Adobe Express";
    if (n.includes("visme")) return "Visme";
    if (n.includes("keynote") || n.includes("apple keynote")) return "Keynote";
    if (n.includes("emaze")) return "Emaze";
    if (n.includes("piktochart")) return "Piktochart";
    if (n.includes("h5p")) return "H5P";
    if (n.includes("nearpod")) return "Nearpod";
    if (n.includes("kahoot")) return "Kahoot";
    if (n.includes("mentimeter")) return "Mentimeter";
    if (n.includes("articulate")) return "Articulate";
    if (n.includes("storyline")) return "Articulate";
    if (n.includes("rise")) return "Articulate";

    // Return original capitalized if not in mapping
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export function isDirectCompetitor(name: string): boolean {
    return DIRECT_COMPETITORS.includes(name) || name === "Genially";
}
