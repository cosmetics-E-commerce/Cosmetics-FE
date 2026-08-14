interface HorizontalScrollOptions {
  behavior?: ScrollBehavior;
  edgePadding?: number;
}

/**
 * Reveals a child by changing only the container's horizontal scroll offset.
 * Unlike scrollIntoView, this cannot move the page or any vertical ancestor.
 */
export function scrollElementHorizontallyIntoView(
  scroller: HTMLElement,
  target: HTMLElement,
  options: HorizontalScrollOptions = {},
): boolean {
  const scrollerRect = scroller.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const edgePadding = Math.max(0, options.edgePadding ?? 12);
  const visibleStart = scrollerRect.left + edgePadding;
  const visibleEnd = scrollerRect.right - edgePadding;

  if (targetRect.left >= visibleStart && targetRect.right <= visibleEnd) {
    return false;
  }

  const targetCenter = targetRect.left + targetRect.width / 2;
  const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
  scroller.scrollTo({
    left: scroller.scrollLeft + targetCenter - scrollerCenter,
    behavior: options.behavior ?? "smooth",
  });
  return true;
}
