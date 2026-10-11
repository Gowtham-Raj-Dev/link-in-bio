"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MiniProfile, SAMPLE_PROFILES } from "@/components/marketing/mini-profile";
import { THEMES } from "@/lib/themes";

const PROFILES = Object.values(SAMPLE_PROFILES);

/** Automatic drift, in pixels per second. */
const SPEED = 40;
/** How long the drift waits after the visitor drags or uses the arrows. */
const RESUME_DELAY_MS = 2000;

const ARROW_CLASS =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Endless carousel of every built-in theme. It drifts on its own, pauses on
 *  hover, and can be dragged, swiped or stepped with the arrow buttons.
 *
 *  The list is repeated so that when one full set has scrolled past, the
 *  position jumps back by exactly one set width. Both frames look identical,
 *  which is what makes the loop seamless. */
export function ThemeCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  // The server sends one set; the repeats are added once the width is known.
  const [copies, setCopies] = useState(1);

  const motion = useRef({
    offset: 0,
    /** Position an arrow press is easing towards, or null when idle. */
    target: null as number | null,
    step: 0,
    setWidth: 0,
    hovered: false,
    dragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    resumeAt: 0,
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const state = motion.current;

    const measure = () => {
      const [first, second] = Array.from(track.children) as HTMLElement[];
      if (!first || !second) return;
      const step = second.offsetLeft - first.offsetLeft;
      if (step <= 0) return;
      state.step = step;
      state.setWidth = step * THEMES.length;
      // Enough repeats that the viewport never runs out of cards mid-loop.
      setCopies(Math.ceil(viewport.clientWidth / state.setWidth) + 1);
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (state.setWidth > 0) {
        if (state.target !== null) {
          const remaining = state.target - state.offset;
          if (Math.abs(remaining) < 0.5) {
            state.offset = state.target;
            state.target = null;
          } else {
            state.offset += remaining * Math.min(1, dt * 9);
          }
        } else if (
          !state.dragging &&
          !state.hovered &&
          !reducedMotion.matches &&
          now > state.resumeAt
        ) {
          state.offset += SPEED * dt;
        }

        // Keep the offset inside one set, moving any pending target with it.
        const wrapped =
          ((state.offset % state.setWidth) + state.setWidth) % state.setWidth;
        if (state.target !== null) state.target += wrapped - state.offset;
        state.offset = wrapped;
        track.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    // Only animate while the carousel is on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    visibility.observe(viewport);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, []);

  const pauseBriefly = () => {
    motion.current.resumeAt = performance.now() + RESUME_DELAY_MS;
  };

  const nudge = (direction: 1 | -1) => {
    const state = motion.current;
    if (!state.step) return;
    const from = state.target ?? state.offset;
    // Land on a card boundary so repeated presses stay aligned.
    state.target = Math.round(from / state.step + direction) * state.step;
    pauseBriefly();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const state = motion.current;
    state.dragging = true;
    state.target = null;
    state.dragStartX = e.clientX;
    state.dragStartOffset = state.offset;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = motion.current;
    // Re-arm the hover pause: pointer capture can swallow the enter event.
    if (e.pointerType === "mouse") state.hovered = true;
    if (!state.dragging) return;
    state.offset = state.dragStartOffset - (e.clientX - state.dragStartX);
  };

  const endDrag = () => {
    if (!motion.current.dragging) return;
    motion.current.dragging = false;
    pauseBriefly();
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Built-in themes"
      className="mt-10"
    >
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") motion.current.hovered = true;
        }}
        onPointerLeave={() => {
          motion.current.hovered = false;
        }}
        // Vertical padding leaves room for the phone shadows inside the clip.
        className="cursor-grab touch-pan-y select-none overflow-hidden pb-10 pt-4 [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] active:cursor-grabbing"
      >
        <ul ref={trackRef} className="flex w-max gap-5 will-change-transform">
          {Array.from({ length: copies }, (_, copy) =>
            THEMES.map((theme, i) => (
              <li
                key={`${copy}-${theme.id}`}
                aria-hidden={copy > 0}
                className="w-40 shrink-0 sm:w-44"
              >
                <MiniProfile
                  profile={PROFILES[i % PROFILES.length]}
                  themeId={theme.id}
                  label={`${theme.name} theme preview`}
                  compact
                  className="h-[19rem] w-full sm:h-[20.5rem]"
                />
                <p className="mt-4 text-center text-sm font-semibold">
                  {theme.name}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous theme"
          className={ARROW_CLASS}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next theme"
          className={ARROW_CLASS}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
