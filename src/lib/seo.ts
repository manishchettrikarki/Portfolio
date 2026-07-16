export const SITE = {
    name: "Dibya Guragain Portfolio Website",
    tagline: "",
    url: "https://www.dibyaguragain.com.np",
    "description": "",
    location: "en_US",
    ogImage: "",
    twitter: "",
    facebook: "",
    linkedIn: "",
    whatsApp: ""
}

// dynamic page titles
export function pageTitle(page?: string) {
    return page ? `${page} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
}

// ogImage path
export function ogImage(path?: string) {
    const url = path ? `${SITE.url}${path}` : SITE.ogImage;
    return [{ url, width: 1200, height: 630, alt: SITE.name }];
}