// @flow

export const cubicOut = (time: number) => {
  let t = time;
  t -= 1;
  return t * t * t + 1;
};

export const easings = { cubicOut };

export const scrollToElem = (
  targetElem: HTMLElement | null = null,
  duration: number = 300,
  easingFunction: Function = (time: number) => time,
  verticalCompensation: number = 0,
  event: SyntheticEvent<*> | null = null
) => {
  if (targetElem !== null) {
    if (event !== null) {
      event.preventDefault();
    }
    const startPosition = window.pageYOffset;
    const startTime = new Date().getTime();
    // $FlowFixMe
    const documentHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const destinationOffset = targetElem.offsetTop + verticalCompensation;
    let destinationScroll;
    if (documentHeight - destinationOffset < windowHeight) {
      destinationScroll = documentHeight - windowHeight;
    } else {
      destinationScroll = destinationOffset;
    }

    // if we don't have access to requestAnimationFrame then we just scroll
    if ('requestAnimationFrame' in window === false) {
      return window.scrollTo(0, targetElem.offsetTop);
    }
    const scroll = () => {
      const now = new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      window.scroll(0, Math.ceil(easingFunction(time) * (destinationScroll - startPosition) + startPosition));

      if (window.pageYOffset === destinationScroll) {
        return;
      }

      requestAnimationFrame(scroll);
    };

    return scroll();
  }
  return null;
};

export const PaginationSlice = (items: Array<Object>, pageNumber: number, cardsPerPage: number) =>
  items.slice(pageNumber * cardsPerPage - (cardsPerPage - 1) - 1, pageNumber * cardsPerPage);
