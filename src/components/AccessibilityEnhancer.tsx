import React, { useEffect } from 'react';

interface AccessibilityEnhancerProps {
  children: React.ReactNode;
  enableAnnouncements?: boolean;
  enableKeyboardTraps?: boolean;
}

export const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({
  children,
  enableAnnouncements = true,
  enableKeyboardTraps = true
}) => {
  useEffect(() => {
    // Create screen reader announcements container
    if (enableAnnouncements && !document.getElementById('aria-live-region')) {
      const liveRegion = document.createElement('div');
      liveRegion.id = 'aria-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }

    // Enhanced keyboard navigation
    if (enableKeyboardTraps) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Skip to main content with Alt+M
        if (e.altKey && e.key === 'm') {
          e.preventDefault();
          const main = document.querySelector('main');
          if (main) {
            main.focus();
            announceToScreenReader('Skipped to main content');
          }
        }

        // Escape key handling for modals
        if (e.key === 'Escape') {
          const activeModal = document.querySelector('[role="dialog"][aria-modal="true"]');
          if (activeModal) {
            const closeButton = activeModal.querySelector('[aria-label*="close"], [aria-label*="Close"]');
            if (closeButton instanceof HTMLElement) {
              closeButton.click();
            }
          }
        }

        // Arrow key navigation for card grids
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          const activeElement = document.activeElement;
          if (activeElement?.closest('[role="grid"]') || activeElement?.closest('.grid')) {
            handleGridNavigation(e, activeElement);
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [enableAnnouncements, enableKeyboardTraps]);

  // Enhanced focus management
  useEffect(() => {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    const enhanceFocusableElements = () => {
      const elements = document.querySelectorAll(focusableElements);
      elements.forEach((element) => {
        if (!element.hasAttribute('aria-label') && !element.hasAttribute('aria-labelledby')) {
          // Add screen reader context for unlabeled interactive elements
          const text = element.textContent?.trim();
          if (text && text.length > 0 && text.length < 50) {
            element.setAttribute('aria-label', text);
          }
        }
      });
    };

    // Run enhancement on mount and after DOM updates
    enhanceFocusableElements();
    const observer = new MutationObserver(enhanceFocusableElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
};

// Utility functions
export const announceToScreenReader = (message: string) => {
  const liveRegion = document.getElementById('aria-live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};

const handleGridNavigation = (e: KeyboardEvent, activeElement: Element) => {
  const grid = activeElement.closest('[role="grid"], .grid');
  if (!grid) return;

  const focusableItems = Array.from(grid.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])'));
  const currentIndex = focusableItems.indexOf(activeElement);
  
  if (currentIndex === -1) return;

  let targetIndex = currentIndex;
  const itemsPerRow = parseInt(getComputedStyle(grid).gridTemplateColumns?.split(' ').length.toString() || '1');

  switch (e.key) {
    case 'ArrowRight':
      targetIndex = Math.min(currentIndex + 1, focusableItems.length - 1);
      break;
    case 'ArrowLeft':
      targetIndex = Math.max(currentIndex - 1, 0);
      break;
    case 'ArrowDown':
      targetIndex = Math.min(currentIndex + itemsPerRow, focusableItems.length - 1);
      break;
    case 'ArrowUp':
      targetIndex = Math.max(currentIndex - itemsPerRow, 0);
      break;
  }

  if (targetIndex !== currentIndex) {
    e.preventDefault();
    (focusableItems[targetIndex] as HTMLElement).focus();
  }
};

// Hook for accessibility features
export const useAccessibility = () => {
  const announce = (message: string) => announceToScreenReader(message);
  
  const skipToContent = () => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
      announce('Skipped to main content');
    }
  };

  return { announce, skipToContent };
};