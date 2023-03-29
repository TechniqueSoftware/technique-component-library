import * as React from 'react';
import { createCUICStoriesOf } from '../utils/utils';
import { MODULE_NAME } from '../constants';

import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PhoneIcon from '@material-ui/icons/Phone';

import Breadcrumbs from './Breadcrumbs';

function render() {
  return (
    <div>
      <h1>Breadcrumbs - Text only</h1>
      <Breadcrumbs
        links={[
          { label: 'Home', href: '#', onClick: () => console.log('Home clicked') },
          { label: 'Entities', href: '#', onClick: () => console.log('Entities clicked') },
          { label: 'Users', href: '#', onClick: () => console.log('Users clicked') },
          { label: 'Edit', href: '#', onClick: () => console.log('Edit clicked') },
          { label: 'Contact details', href: '#', onClick: () => console.log('Contact details clicked') },
          { label: 'Phone numbers', current: true, href: '#', onClick: () => console.log('Phone numbers clicked') },
        ]}
      />
      <h1>Breadcrumbs - With icons</h1>
      <Breadcrumbs
        links={[
          { label: 'Home', icon: <HomeIcon/>, href: '#', onClick: () => console.log('Home clicked') },
          { label: 'Entities', icon: <ContactsIcon/>, href: '#', onClick: () => console.log('Entities clicked') },
          { label: 'Users', icon: <PersonIcon/>, href: '#', onClick: () => console.log('Users clicked') },
          { label: 'Edit', icon: <EditIcon/>, href: '#', onClick: () => console.log('Edit clicked') },
          { label: 'Contact details', icon: <ContactMailIcon/>, href: '#', onClick: () => console.log('Contact details clicked') },
          { label: 'Phone numbers', icon: <PhoneIcon/>, current: true, href: '#', onClick: () => console.log('Phone numbers clicked') },
        ]}
      />
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.BREADCRUMBS, module)
  .addCUICStory({
    render,
    name: 'Breadcrumbs',
    notes: require('./notes.md').default
  });
