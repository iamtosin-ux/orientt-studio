import type { Metadata } from "next";
import DossierExperience from "@/components/dossier/DossierExperience";
import { DOSSIER } from "@/lib/dossier";

export const metadata: Metadata = {
  title: `${DOSSIER.title} · Travel dossier`,
  description: DOSSIER.intro,
};

export default function DossierPage() {
  return <DossierExperience dossier={DOSSIER} />;
}
