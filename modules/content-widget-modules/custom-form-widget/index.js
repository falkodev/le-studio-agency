const aosSchema = require('../../../lib/aosSchema.js');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Custom Form',
    icon: 'form-icon',
    description: 'Display a an interactive form on your page',
    previewImage: 'svg'
  },
  icons: {
    'form-icon': 'FormDropdown'
  },
  fields: {
    add: {
      anchorId: {
        type: 'string',
        label: 'Anchor ID',
        help: 'This is the ID that will be used to link to this section. It should be unique and contain no spaces.'
      },
      layout: {
        type: 'select',
        def: 'background',
        choices: [
          {
            label: 'Background',
            value: 'background'
          },
          {
            label: 'Two column',
            value: 'column'
          }
        ]
      },
      backgroundStyle: {
        type: 'select',
        label: 'Background style',
        def: 'image',
        choices: [
          {
            label: 'Image',
            value: 'image'
          },
          {
            label: 'Color',
            value: 'color'
          }
        ],
        if: {
          layout: 'background'
        }
      },
      _backgroundImage: {
        type: 'relationship',
        withType: '@apostrophecms/image',
        label: 'Select an image',
        max: 1,
        if: {
          $or: [
            { backgroundStyle: 'image' },
            { layout: 'column' }
          ]

        }
      },
      backgroundColor: {
        type: 'color',
        label: 'Pick a background color',
        if: {
          backgroundStyle: 'color'
        }
      },
      fontColor: {
        type: 'select',
        label: 'Change font color',
        choices: [
          {
            label: 'Primary',
            value: 'primary'
          },
          {
            label: 'Secondary',
            value: 'secondary'
          },
          {
            label: 'Tertiary',
            value: 'tertiary'
          },
          {
            label: 'Black',
            value: 'black'
          },
          {
            label: 'White',
            value: 'white'
          }
        ]
      },
      form: {
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/form': {}
          }
        }
      },
      ...aosSchema
    }
  }
};
