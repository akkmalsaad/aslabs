import { FixedLogo } from "./FixedLogo";
import { FloatingNavigation } from "./FloatingNavigation";
import { MenuButton } from "./MenuButton";

// Persistent chrome: logo top-left, menu top-right, floating nav bottom-centre.
// DOM order (button → nav) keeps Tab moving straight from the button into the links.
export function NavigationShell() {
  return (
    <>
      <div data-nav-chrome className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between pt-(--edge-top) pr-(--edge-right) pl-(--edge-left)">
        <FixedLogo />
        <MenuButton />
      </div>
      <FloatingNavigation />
    </>
  );
}
