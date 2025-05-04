import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import PageTemplate from './components/templates/pageTemplate/PageTemplate';

const App = () => {
  return (
    <MantineProvider>
      <PageTemplate />
    </MantineProvider>
  );
};

export default App;
