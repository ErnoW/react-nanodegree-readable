// Test stories from the storybook
import initStoryshots from '@storybook/addon-storyshots'
import { shallow } from 'enzyme'

initStoryshots({
  renderer: shallow,
})
