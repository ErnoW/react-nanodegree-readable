import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import { withInfo, setDefaults as setInfoDefaults  } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { setOptions } from '@storybook/addon-options';
import chaptersAddon, { setDefaults as setChapterDefaults } from 'react-storybook-addon-chapters';

//TODO: implement specifications with JEST testing: https://github.com/mthuret/storybook-addon-specifications

// Default values for chapter addon
setChapterDefaults({
  sectionOptions: {
    showSource: false,
    allowSourceToggling: false,
    showPropTables: false,
    allowPropTablesToggling: false,
  }
});
setAddon(chaptersAddon);

// Default values for component info addon
setInfoDefaults({
  header: false,
  inline: true,
  maxPropsIntoLine: 1,
});

// Values for options addon:
setOptions({
  name: 'Readable',
  url: '#',
});

// Add the decorators
addDecorator((story, context) => {
  //Exclude info decorator from base styling
  if(context.kind === 'Base') {
    return story()
  }
  return withInfo('Common information')(story)(context)
});
addDecorator(withKnobs);
addDecorator(story => (
  <div style={{'padding': '40px'}}>
    {story()}
  </div>
));

// Load all stories
function loadStories() {
  const req = require.context('../src/stories', true, /\.js$/)
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
