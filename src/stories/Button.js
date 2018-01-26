import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean, select } from '@storybook/addon-knobs/react'
import Button from '../components/Button'

storiesOf('Forms', module).add('Button', () => (
  <Button
    text={text('text', 'Hello Button')}
    type={select('type', {
      submit: 'submit',
      reset: 'reset',
      button: 'button',
    })}
    onClick={action('clicked')}
    disabled={boolean('disabled', false)}
  />
))
