import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on route change, unless the URL carries a hash (#about
// etc.) in which case we let the browser's native anchor scroll handle it.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
