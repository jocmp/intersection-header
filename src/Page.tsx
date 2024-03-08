import { useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import classNames from "classnames";

export function Page() {
  const { setTrackedRef, entry } = useIntersectionObserver();
  const elementRef = useRef<HTMLDivElement>(null);

  const title = "My Cool Product";
  const isHeaderVisible = entry?.intersectionRatio === 0;
  console.log('[debug] intersectionRatio', entry?.intersectionRatio, "visible=", isHeaderVisible)

  const classes = classNames('sticky-header', {
    'sticky-header--visible': isHeaderVisible,
  });

  return (
    <div>
      <div className={classes} ref={elementRef}>
        <div className="sticky-header__title">{title}</div>
      </div>
      <div className="page-body">
        <div className="page-image" />
        <h1>{title}</h1>
        <div className="page-description" ref={setTrackedRef}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="page-content">
          More content here
        </div>
      </div>
    </div>
  )
}
