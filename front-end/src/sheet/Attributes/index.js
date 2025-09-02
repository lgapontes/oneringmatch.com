import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextFieldAttributes from '../TextFieldAttributes';
import { isValid } from '../Rules';
import {
  SKILLS_PER_ATTRIBUTE,
} from '../Data';
import CheckboxDiamondStack from '../CheckboxDiamondStack';
import CheckboxSquare from '../CheckboxSquare';
import SkillBox from '../SkillBox';
import ProficiencieBox from '../ProficiencieBox';
import FeaturesChip from '../FeaturesChip';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{
        display: (value === index) ? 'block' : 'none',
      }}
    >
      {children}
    </Grid>
  );
}

function HorizontalDivider(props) {
  return (
    <Box style={props.styles.horizontalDivider} align="center">
      {
        (isValid(props.label)) ? (
          <Typography
            style={props.styles.typography}
            sx={{
              display: 'inline-block',
              padding: '3px 12px 3px 12px',
              backgroundImage: `url(${"img/sheet/background.jpg"})`,
            }}
            align="center"
          >
            {props.label}
          </Typography>
        ) : <></>
      }
    </Box>
  );
}

export default function Attributes(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // borderBottom: '2px solid #CE8786'

  const styles = {
    tab: {
      fontFamily: 'Aniron',
      fontWeight: 'bold',
      fontSize: '0.7em',
      color: 'rgba(0, 0, 0, 0.6)',
      '&.Mui-selected': {
        backgroundColor: '#edd2d2',
        color: '#9a2e26',
      },
      '&.Mui-disabled': {
        color: 'rgba(0, 0, 0, 0.6)',
        opacity: '1',
      },
    },

    typography: {
      color: '#CE8786',
      fontFamily: 'Aniron',
      fontWeight: 'bold',
      verticalAlign: 'middle',
      fontSize: '1em',
    },

    verticalDivider: {
      backgroundImage: `url(${"img/sheet/sheet-vertical-divider.png"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      boxSizing: 'border-box',
      margin: '0',
    },

    horizontalDivider: {
      backgroundImage: `url(${"img/sheet/sheet-horizontal-divider.png"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      boxSizing: 'border-box',
      margin: '0',
      width: '100%',
      minHeight: '34px',
      display: 'block',
    },
  };

  const columnSkillBox = (attribute,mobile) => {
    return (
      <div style={{ marginBottom: '20px' }}>
      {SKILLS_PER_ATTRIBUTE[attribute].map((skill,index)=>(
        <SkillBox
          {...props}
          key={`${attribute}-${skill}-${index}`}
          skill={skill}
          attribute={attribute}
          mobile={mobile}
        />
      ))}
      </div>
    );
  };

  const columnProficiencieBox = (mobile) => {
    return (
      <div style={{ marginTop: '5px', marginBottom: '10px' }}>
      {props.combatProficiencies.map((proficiencie,index)=>(
        <ProficiencieBox
          {...props}
          key={`strength-${proficiencie}-${index}`}
          proficiencie={proficiencie}
          mobile={mobile}
        />
      ))}
      </div>
    );
  };

  const columnRewards = () => {
    return (
      <>
        <FeaturesChip
          label={props.i18n('sheet.character-sheet.rewards')}
          values={['AFIADO: Causa Golpe Perfurante com 9+ no Dado de Proeza']}
        />
      </>
    );
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        variant="fullWidth"
        TabIndicatorProps={{
          hidden: true,
          sx: { backgroundColor: '#9a2e26' },
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <Tab
          label={props.i18n('sheet.character-sheet.strength')}
          sx={styles.tab}
        />
        <Tab
          label={props.i18n('sheet.character-sheet.heart')}
          sx={styles.tab}
        />
        <Tab
          label={props.i18n('sheet.character-sheet.wits')}
          sx={styles.tab}
        />
      </Tabs>

      <Grid
        container
        sx={{
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        <Grid item xs={3.9} sx={{ minWidth: '290px' }}>
          <Typography
            style={styles.typography}
            sx={{ marginRight: '4px' }}
            align="center"
          >
            {props.i18n('sheet.character-sheet.strength')}
          </Typography>
          <TextFieldAttributes
            attribute={'strength'}
            {...props}
          />
          <HorizontalDivider
            styles={styles}
          />
          {columnSkillBox('strength',false)}
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.combat-proficiencies-label')}
          />
          {columnProficiencieBox(false)}
        </Grid>

        <Grid item xs={0.2} style={styles.verticalDivider}>
        </Grid>

        <Grid item xs={3.8} sx={{ minWidth: '290px' }}>
          <Typography
            style={styles.typography}
            align="center"
            sx={{ marginLeft: '4px', marginRight: '4px' }}
          >
            {props.i18n('sheet.character-sheet.heart')}
          </Typography>
          <TextFieldAttributes
            attribute={'heart'}
            {...props}
          />
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.skills-label')}
          />
          {columnSkillBox('heart',false)}
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.rewards')}
          />
          {columnRewards()}
        </Grid>

        <Grid item xs={0.2} style={styles.verticalDivider}>
        </Grid>

        <Grid item xs={3.9} sx={{ minWidth: '290px' }}>
          <Typography
            style={styles.typography}
            align="center"
            sx={{ marginLeft: '4px' }}
          >
            {props.i18n('sheet.character-sheet.wits')}
          </Typography>
          <TextFieldAttributes
            attribute={'wits'}
            {...props}
          />
          <HorizontalDivider
            styles={styles}
          />
          {columnSkillBox('wits',false)}
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.virtues')}
          />
        </Grid>
      </Grid>

      <Grid container sx={{
          display: {
            xs:'flex',
            sm:'none'
          },
        }}>
        <TabPanel value={value} index={0}>
          <TextFieldAttributes
            attribute={'strength'}
            {...props}
          />
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.skills-label')}
          />
          {columnSkillBox('strength',true)}
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.combat-proficiencies-label')}
          />
          {columnProficiencieBox(false)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextFieldAttributes
            attribute={'heart'}
            {...props}
          />
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.skills-label')}
          />
          {columnSkillBox('heart',true)}
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.rewards')}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TextFieldAttributes
            attribute={'wits'}
            {...props}
          />
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.skills-label')}
          />
          {columnSkillBox('wits',true)}
          <HorizontalDivider
            styles={styles}
            label={props.i18n('sheet.character-sheet.virtues')}
          />
        </TabPanel>
      </Grid>

    </>
  );
}
