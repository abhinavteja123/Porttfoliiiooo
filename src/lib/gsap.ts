import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register GSAP plugins exactly once. Import { gsap, ScrollTrigger } from here
 * everywhere else so registration is guaranteed before first use.
 */
let registered = false;
if (!registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
