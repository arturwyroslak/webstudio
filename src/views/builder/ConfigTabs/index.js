import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // if (!filter) return;
    const editor = window.editor;
    if (!editor) return;

    // Styles
    const styleManager = editor.StyleManager;
    const selectorMnager = editor.SelectorManager;
    console.log(editor)
    console.log(selectorMnager);
    const styleBlock = styleManager.render();
    const allSelectors = selectorMnager.getSelected()
    console.log(allSelectors)
    const selectBlock = selectorMnager.render(allSelectors);
    const designTab = document.getElementById('designTab');
    // designTab.firstElementChild?.remove();
    designTab.prepend(styleBlock);
    designTab.prepend(selectBlock);
    selectorMnager.__update();

    const traitManager = editor.TraitManager;
    const traitBlock = traitManager.render();
    const traitTab = document.getElementById('propertyTab');
    // traitTab.firstElementChild?.remove();
    traitTab.prepend(traitBlock);

}, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" fullWidth>
          <Tab label="Design 🖌️" {...a11yProps(0)} />
          <Tab label="Properties ⚙️" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} id="designTab">
      </TabPanel>
      <TabPanel value={value} index={1} id="propertyTab">
      </TabPanel>
    </Box>
  );
}