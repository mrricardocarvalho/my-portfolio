import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if we are supposed to restore scroll from sessionStorage
    const shouldRestore = sessionStorage.getItem('shouldRestoreScroll');

    // Only scroll to top if the restoration flag is NOT set to 'true'
    if (shouldRestore !== 'true') {
      // console.log(`ScrollToTop: Path changed to ${pathname}. Scrolling to top.`); // Debugging
      window.scrollTo(0, 0);
    } else {
      // console.log(`ScrollToTop: Path changed to ${pathname}. Restoration flag found, skipping scroll.`); // Debugging
    }

    // IMPORTANT: Always remove the flag after checking it once.
    // This ensures subsequent navigations (that don't set the flag again) WILL scroll to top.
    sessionStorage.removeItem('shouldRestoreScroll');

  }, [pathname]); // Effect runs only when the pathname changes

  return null; // This component renders nothing itself
}

export default ScrollToTop;