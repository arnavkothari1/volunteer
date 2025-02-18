import React, { ReactElement } from 'react';

interface AccessibleProps {
  id: string;
  label: string;
  children: ReactElement;
  description?: string;
}

export const AccessibleInput: React.FC<AccessibleProps> = ({ id, label, children, description }) => (
  <div className="accessible-field">
    <label id={`${id}-label`} htmlFor={id}>
      {label}
    </label>
    {React.cloneElement(children, {
      'data-testid': id,
      'aria-labelledby': `${id}-label`,
      'aria-describedby': description ? `${id}-description` : undefined,
    } as React.HTMLAttributes<HTMLElement>)}
    {description && (
      <div id={`${id}-description`} className="field-description">
        {description}
      </div>
    )}
  </div>
); 