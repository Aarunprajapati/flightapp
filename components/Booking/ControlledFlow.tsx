import React, { ReactElement, ReactNode } from "react";

type ControlledFlowProps = {
  children: ReactNode;
  currentIndex: number;
  onNext: (dataFormStep: Record<string, any>) => void;
};

export const ControlledFlow: React.FC<ControlledFlowProps> = ({
  children,
  currentIndex,
  onNext,
}) => {
  const gonext = (dataFormStep: Record<string, any>) => {
    console.log(dataFormStep);
    onNext(dataFormStep);
  };

  const currentChildren = React.Children.toArray(children)[currentIndex];

  if (React.isValidElement(currentChildren)) {
    return React.cloneElement(currentChildren as ReactElement, { gonext: gonext });
  }

  return <>{currentChildren}</>;
};
