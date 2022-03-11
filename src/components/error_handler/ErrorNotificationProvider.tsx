import * as React from 'react'

//Components:

//Redux:

//Styles:

//Interfaces:
interface IComponentProps {
    children: React.ReactNode;
}

export const ErrorNotificationProvider = ({ children }: IComponentProps): JSX.Element => {
  return (
    <div>ErrorNotificationProvider</div>
  )
}
