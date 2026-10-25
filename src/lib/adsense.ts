/**
 * Ads & analytics settings for linkinbio.codelove.in — change the IDs here; leave one empty to turn it off.
 */

/** Google AdSense publisher ID, e.g. "ca-pub-1234567890123456". */
export const ADSENSE_CLIENT: string = "ca-pub-1282068947061740";

/**
 * Google Analytics 4 measurement ID, e.g. "G-XXXXXXXXXX". Used only when the Firebase one
 * (NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) isn't set at build time, so visits are never counted twice.
 */
export const GA_MEASUREMENT_ID: string = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ? "" : "G-65L0LB1CJT";
