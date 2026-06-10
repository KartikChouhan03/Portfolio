import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SectionWrapperProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, className, children }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-section-id={id}
        className={cn('section-padding', className)}
      >
        <div className="container">
          {children}
        </div>
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper;
