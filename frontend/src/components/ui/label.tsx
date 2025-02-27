import React from 'react';

// Remove empty interface and use type extension instead
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  (props, ref) => <label ref={ref} {...props} />
);
Label.displayName = "Label" 