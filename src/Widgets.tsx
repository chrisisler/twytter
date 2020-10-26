import { FC } from 'react';
import styled from 'styled-components';

const WidgetsContainer = styled.div`
  flex: 0.2;
`;

export const Widgets: FC = () => {
  return (
    <WidgetsContainer>
      <h1>Widgets</h1>
    </WidgetsContainer>
  );
};
