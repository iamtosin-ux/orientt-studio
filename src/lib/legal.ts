export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  caseStudyTitle: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

const LEGAL_DOCS: Record<string, LegalDoc> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Legal",
    caseStudyTitle: "Privacy policy",
    updated: "Last updated June 2026",
    intro: [
      "Orientt Studio (\"Orientt\", \"we\", \"us\") respects your privacy. This policy explains what information we collect when you use orientt.studio or work with us, why we collect it, and the choices you have.",
    ],
    sections: [
      {
        heading: "About us",
        paragraphs: [
          "Orientt is a design studio. For the purposes of data protection law, Orientt is the controller of personal data collected through this site and through our client engagements.",
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          "When you contact us, book a call, or enquire about a project, we collect the details you provide: name, email, company, and the contents of your message.",
          "We also collect limited analytics data (pages visited, approximate location, device type) to understand how the site is used. This does not identify you personally.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use the information you give us to respond to enquiries, schedule calls, and deliver work you've engaged us for. We use analytics data to improve the site.",
          "We do not sell your personal data, and we do not use it for advertising.",
        ],
      },
      {
        heading: "Sharing information",
        paragraphs: [
          "We share information with service providers who help us run the studio, for example scheduling (Cal.com) and hosting providers, only to the extent needed to provide their service, and under appropriate confidentiality terms.",
        ],
      },
      {
        heading: "Data retention",
        paragraphs: [
          "We keep enquiry and project information for as long as it's needed for the purpose it was collected, or as required by law, then delete it.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Depending on where you live, you may have the right to access, correct, or delete personal data we hold about you, or to object to how it's used. To exercise any of these rights, contact us using the details below.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about this policy can be sent to samuel@orientt.com.",
        ],
      },
    ],
  },
  "terms-of-use": {
    slug: "terms-of-use",
    title: "Legal",
    caseStudyTitle: "Terms of use",
    updated: "Last updated June 2026",
    intro: [
      "These terms govern your use of orientt.studio. By browsing the site or engaging us for work, you agree to them.",
    ],
    sections: [
      {
        heading: "Use of this site",
        paragraphs: [
          "This site is provided for the purpose of showcasing Orientt's work and enabling you to get in touch with us. You may not use it in any way that damages, disables, or impairs the site, or that interferes with anyone else's use of it.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "All case studies, visuals, and copy on this site are the property of Orientt or our clients and are shown with permission. Nothing on this site may be reproduced without prior written consent.",
        ],
      },
      {
        heading: "Client engagements",
        paragraphs: [
          "Project scope, deliverables, fees, and ownership of work product for any client engagement are governed by the separate agreement signed between Orientt and the client, not by these terms.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "The site and its content are provided \"as is\" without warranties of any kind. Orientt is not liable for any indirect or consequential loss arising from your use of the site.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. The version in effect is the one published on this page.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these terms can be sent to samuel@orientt.com.",
        ],
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Legal",
    caseStudyTitle: "Cookies",
    updated: "Last updated June 2026",
    intro: [
      "This page explains how Orientt Studio uses cookies and similar technologies on orientt.studio.",
    ],
    sections: [
      {
        heading: "What cookies are",
        paragraphs: [
          "Cookies are small text files stored on your device that help a site remember information about your visit.",
        ],
      },
      {
        heading: "How we use them",
        paragraphs: [
          "We use a small number of essential and analytics cookies, to keep the site working correctly, and to understand which pages are useful so we can improve them. We don't use cookies for third-party advertising.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "Most browsers let you view, manage, and delete cookies through their settings. Blocking cookies entirely may affect how some parts of the site behave.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about our use of cookies can be sent to samuel@orientt.com.",
        ],
      },
    ],
  },
};

export function getLegalSlugs() {
  return Object.keys(LEGAL_DOCS);
}

export function getLegalDoc(slug: string): LegalDoc {
  const doc = LEGAL_DOCS[slug];
  if (!doc) throw new Error(`Unknown legal doc: ${slug}`);
  return doc;
}
